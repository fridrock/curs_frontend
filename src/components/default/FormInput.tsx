import React, { ChangeEvent } from "react";

interface InputProps{
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeHolder: string;
}

 
export default  function FormInput(props: InputProps) {
    const [isFocused, setIsFocused] = React.useState(false);
  
    return (
      <input
        type="text"
        style={{
          ...inputStyles,
           boxShadow: isFocused ? '0 0 0 3px #9747FF' : 'none',
           borderColor: isFocused ? "transparent": "#DFDFDF"
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={props.placeHolder}
        value={props.value}
        onChange={(e)=>props.onChange(e)}
      />
    );
  }


const inputStyles: React.CSSProperties = {
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    outline: 'none',
    backgroundImage: 'none',
    backgroundColor: 'transparent',
    marginTop: "1vw",
    position: "relative",
    width: '100%',
    padding: '0.5vw 1vw',
    borderRadius: '0.5vw',
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#DFDFDF",
    fontFamily: '"InstrumentSans" sans-serif',
    fontSize: '1vw',
    color: '#333',
    transition: 'all 0.3s ease',
  };
 
