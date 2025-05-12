import { NavLink, useNavigate } from "react-router";
import useUserStore from "../../state/userStore";
import Button from "./Button";
import Link from "./Link";

export default function Header() {
  const userStore = useUserStore();
  const navigate = useNavigate();
  function logout() {
    userStore.setToken("");
    navigate("/home");
  }
  return (
    <header style={headerStyle}>
      <p style={companyName}>AntiProcrostinate</p>
      {!userStore.token && <Link to="/auth" name="Auth" />}
      {!userStore.token && <Link to="/register" name="Register" />}
      <Link to="/home" name="Home" />
      {userStore.token && <Link to="/projects" name="Projects" />}
      {userStore.token && (
        <Button
          name="Logout"
          isPrimary={true}
          onClick={() => logout()}
        ></Button>
      )}
    </header>
  );
}

const headerStyle: React.CSSProperties = {
  width: "100vw",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "0.3vw",
  borderBottom: "1px solid #DFDFDF",
};

const companyName: React.CSSProperties = {
  color: "#9747FF",
  fontWeight: 1000,
  fontSize: "1.5vw",
};
