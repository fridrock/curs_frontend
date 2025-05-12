import { useState } from "react";
import { AuthResponse, IAuthDto } from "../../interfaces/userInterfaces";
import { AxiosResponse } from "axios";
import useUserStore from "../../state/userStore";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import Header from "../default/Header";
import Label from "../default/Label";
import FormInput from "../default/FormInput";

import logo from "../../img/Illustration.svg";
import Button from "../default/Button";

const containerStyles: React.CSSProperties = {
  display: "flex",
  height: "100vh",
  justifyContent: "start",
  alignItems: "center",
  flexDirection: "column",
  width: "100vw",
};

const innerContainerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: "3px",
  padding: "2.5vw 5vw",
  borderStyle: "solid",
  borderColor: "#DFDFDF", // slate-200
  borderRadius: "0.375rem",
  marginTop: "5vw",
};

const formStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "start",
  alignContent: "center",
  flexDirection: "column",
  width: "25vw",
  padding: "2.5vw",
};

const h3Styles: React.CSSProperties = {
  fontFamily: '"InstrumentSans", sans-serif',
  fontSize: "2vw",
  color: "#555555",
};

const logoStyles: React.CSSProperties = {
  marginLeft: "5vw",
  display: "block",
};

function Auth() {
  const [authState, setRegisterState] = useState<IAuthDto>({
    username: "",
    password: "",
  });
  const userStore = useUserStore();
  const navigate = useNavigate();
  const { api } = useAxios();
  async function authorize() {
    //TODO validation
    try {
      let res: AxiosResponse<AuthResponse> = await api.post<AuthResponse>(
        "/users/auth",
        authState
      );
      if (res.status == 200) {
        userStore.setToken(res.data.token);
        navigate("/home");
      }
    } catch (error) {
      //TODO error handling
    }
  }
  return (
    <div style={containerStyles}>
      <Header></Header>
      <div style={innerContainerStyles}>
        <form style={formStyles}>
          <h3 style={h3Styles}>Authorize</h3>
          <Label name="Username"></Label>
          <FormInput
            value={authState.username}
            placeHolder="Enter your username"
            onChange={(e) =>
              setRegisterState({ ...authState, username: e.target.value })
            }
          ></FormInput>
          <Label name="Password"></Label>
          <FormInput
            value={authState.password}
            placeHolder="Enter your password"
            onChange={(e) =>
              setRegisterState({ ...authState, password: e.target.value })
            }
          ></FormInput>
          <Button
            name="Authorize"
            style={{ marginTop: "1vw" }}
            onClick={(e) => {
              e.preventDefault();
              authorize();
            }}
            isPrimary={true}
          ></Button>
        </form>
        <img style={logoStyles} src={logo}></img>
      </div>
    </div>
  );
}

export default Auth;
