interface InputTextProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  type?: string;
  error?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const InputText = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  className,
  type,
  error,
  onBlur
}: InputTextProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label>{label}</label>
      <input
        type={type}
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
