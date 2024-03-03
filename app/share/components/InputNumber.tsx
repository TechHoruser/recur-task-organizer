interface InputNumberProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const InputNumber = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  className,
  error,
  onBlur
}: InputNumberProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label>{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onBlur={onBlur}
        className={`border-2 border-gray-300 bg-black rounded p-1`}
      />
      {error && <span>{error}</span>}
    </div>
  );
}
