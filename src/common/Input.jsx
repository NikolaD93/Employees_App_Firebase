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
