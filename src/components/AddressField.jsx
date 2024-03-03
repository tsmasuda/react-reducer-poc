import InputField from "./InputField";

const AddressField = ({
  path: objectPath,
  value,
  defaultValue,
  onValueChange,
}) => {
  const formData = value || defaultValue;

  const onComponentValueChange = (fieldPath, fieldValue) => {
    onValueChange(objectPath, {
      [fieldPath]: {
        value: fieldValue,
      },
    });
  };

  return (
    <div>
      {formData.addressLine1.visible && (
        <InputField
          path="addressLine1"
          required={formData.addressLine1.required}
          value={formData.addressLine1.value}
          defaultValue={formData.addressLine1.defaultValue}
          onValueChange={onComponentValueChange}
        />
      )}
      {formData.addressLine2.visible && (
        <InputField
          path="addressLine2"
          required={formData.addressLine2.required}
          value={formData.addressLine2.value}
          defaultValue={formData.addressLine2.defaultValue}
          onValueChange={onComponentValueChange}
        />
      )}
    </div>
  );
};

export default AddressField;
