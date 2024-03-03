const styles = {
  required: {
    color: "red",
    fontWeight: "bold",
  },
};

const InputField = ({
  path,
  required = false,
  value,
  defaultValue,
  onValueChange,
}) => {
  const formData = value || defaultValue;

  const onChange = (event) => {
    onValueChange(path, event?.target?.value);
  };

  return (
    <div>
      <span>
        {path}
        {required && <span style={styles.required}>*</span>}:{" "}
      </span>
      <input type="text" value={formData} onChange={onChange} />
    </div>
  );
};

export default InputField;
