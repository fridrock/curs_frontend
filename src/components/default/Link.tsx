import { NavLink } from "react-router";

interface LinkProps {
  to: string;
  name: string;
  style?: React.CSSProperties;
}
export default function Link({ to, name, style }: LinkProps) {
  return (
    <NavLink style={{ ...linkStyles, ...style }} to={to}>
      {name}
    </NavLink>
  );
}

const linkStyles: React.CSSProperties = {
  border: "none",
  color: "#555555",
  fontSize: "1vw",
  textDecoration: "none",
  fontWeight: 600,
};
