export const Input = ({
  label,
  type,
  value,
  name,
  id,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </>
  );
};

export const Select = ({
  name,
  id,
  onChange,
  required,
  defaultValue,
  children,
}) => {
  return (
    <select
      name={name}
      id={id}
      onChange={onChange}
      required={required}
      defaultValue={defaultValue}
    >
      {children}
    </select>
  );
};
