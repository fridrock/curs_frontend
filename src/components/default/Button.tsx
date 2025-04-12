import { isBreakOrContinueStatement } from "typescript";

interface ButtonProps{
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    name: string;
    isPrimary: boolean;
}



const buttonDefaultStyles: React.CSSProperties = {
    padding: '0.5vw 1vw',
    fontFamily:'"InstrumentSans", sans-serif',
    backgroundColor: '#9747FF', 
    color: "white",
    fontSize: '1vw',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: "1vw",
    border: "none",
    borderRadius: "10px",
    width: "fit-content"
    
};
export default function Button(props: ButtonProps){
    const  buttonStyles = !props.isPrimary? {
        ...buttonDefaultStyles,
        backgroundColor: '#DFDFDF', 
        color: "#555555",
    }:buttonDefaultStyles;
        return(
        <button style={buttonStyles} onClick={(e)=>props.onClick(e)}>{props.name}</button>
    )
}