import { useState } from "react";
import selectImage from "../../img/select.svg";

interface FormSelectProps {
  options: string[];
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}

export default function FormSelect({
  options,
  onChangeHandler,
  style,
}: FormSelectProps) {
  return (
    <select
      style={{ ...selectStyles, ...style }}
      onChange={(e) => onChangeHandler(e)}
    >
      {options.map((opt) => (
        <option value={opt}>{opt}</option>
      ))}
    </select>
  );
}
const selectStyles: React.CSSProperties = {
  outline: "none",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  width: "100%",
  maxWidth: "50%",
  padding: "0.6vw 0.8vw",
  fontSize: "0.7vw",
  lineHeight: "1.5",
  color: "#333",
  backgroundColor: "transparent",
  border: "1px solid #DFDFDF",
  borderRadius: "6px",
  backgroundImage: `url(${selectImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.6vw center",
  backgroundSize: "0.6vw auto",
  cursor: "pointer",
};
