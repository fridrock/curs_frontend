interface FormSelectProps {
  options: string[];
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FormSelect({
  options,
  onChangeHandler,
}: FormSelectProps) {
  return (
    <select onChange={(e) => onChangeHandler(e)}>
      {options.map((opt) => (
        <option value={opt}>{opt}</option>
      ))}
    </select>
  );
}
