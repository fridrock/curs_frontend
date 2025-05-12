interface IconButtonProps {
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
  style?: React.CSSProperties;
  logo: any;
}

const iconButtonStyle: React.CSSProperties = {
  width: "2vw",
  height: "2vw",
  display: "block",
  cursor: "pointer",
};

export default function IconButton(props: IconButtonProps) {
  return (
    <img
      style={{ ...iconButtonStyle, ...props.style }}
      src={props.logo}
      onClick={(e) => props.onClick(e)}
    ></img>
  );
}
