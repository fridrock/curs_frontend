interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name: string;
  isPrimary: boolean;
  style?: React.CSSProperties;
}

export default function Button(props: ButtonProps) {
  const buttonStyles = !props.isPrimary
    ? {
        ...props.style,
        backgroundColor: "#DFDFDF",
        color: "#555555",
      }
    : { ...props.style };
  return (
    <button style={buttonStyles} onClick={(e) => props.onClick(e)}>
      {props.name}
    </button>
  );
}
