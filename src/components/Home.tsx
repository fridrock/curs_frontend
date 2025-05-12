import { useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import Button from "./default/Button";
import Header from "./default/Header";
import logo from "../img/Illustration.svg";
import { CENTRALIZED_COLUMN } from "../styles/defaultStyles";
import useUserStore from "../state/userStore";
function Home() {
  const { api } = useAxios();
  const navigate = useNavigate();
  const userStore = useUserStore();
  async function getQuery() {
    try {
      await api.get("/users/get");
    } catch (error) {
      console.log(error);
      //TODO error handling
    }
  }
  return (
    <div style={CENTRALIZED_COLUMN}>
      <Header></Header>
      <h1
        style={{
          width: "60vw",
          fontSize: "2.8vw",
          textAlign: "center",
          color: "#555555",
          marginTop: "1vw",
        }}
      >
        Welcome to AntiProcrostinate! Sign up if you don't have account, sign in
        if you already have
      </h1>
      <div style={contentPartStyle}>
        <img
          style={{
            width: "40vw",
          }}
          src={logo}
          alt=""
        />
        <div
          style={{
            ...CENTRALIZED_COLUMN,
            marginLeft: "2vw",
          }}
        >
          {!userStore.token ? (
            <>
              <Button
                style={{
                  marginBottom: "2vw",
                }}
                isPrimary={true}
                name="Sign up"
                onClick={() => navigate("/register")}
              />
              <Button
                isPrimary={false}
                name="Sign in"
                onClick={() => navigate("/auth")}
              />
            </>
          ) : (
            <>
              <Button
                name="Go to your projects!"
                isPrimary={true}
                onClick={(e) => navigate("/projects")}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const contentPartStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default Home;
