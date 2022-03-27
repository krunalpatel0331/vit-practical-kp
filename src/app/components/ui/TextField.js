
// Handle Label and Error message when passed as a props
const TextField = ({
    name,
  label,
  type,
  classsName,
  onChange,
  value,
  error,
  ...props
}) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        className={classsName}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && (
        <div>
          <strong className="">{error.error}</strong>
          <br/>
          <strong>Hint : {error.hint}</strong>
        </div>
      )}
      <br/>
    </>
  );
};

export default TextField;
