interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name: string;
  isPrimary: boolean;
  style?: React.CSSProperties;
}

const buttonDefaultStyles: React.CSSProperties = {
  padding: "0.5vw 1vw",
  fontFamily: '"InstrumentSans", sans-serif',
  backgroundColor: "#9747FF",
  color: "white",
  fontSize: "1vw",
  fontWeight: 500,
  cursor: "pointer",
  border: "none",
  borderRadius: "10px",
  width: "fit-content",
};
export default function Button(props: ButtonProps) {
  const buttonStyles = !props.isPrimary
    ? {
        ...props.style,
        ...buttonDefaultStyles,
        backgroundColor: "#DFDFDF",
        color: "#555555",
      }
    : { ...props.style, ...buttonDefaultStyles };
  return (
    <button style={buttonStyles} onClick={(e) => props.onClick(e)}>
      {props.name}
    </button>
  );
}
