import { useEffect, useReducer } from "react";
import InputField from "../components/InputField";

import _ from "lodash";
import AddressField from "../components/AddressField";

const MyFirstPage = () => {
  /**
   * Manage state and
   * 1. Merge an updated field object to the an page object
   * 2. Update the visibility of all fields
   * 3. Reset values of the hidden fields
   */
  const [formData, setFormData] = useReducer(
    (final, current) => {
      const merged = _.merge(final, current);

      const visibleMerged = Object.keys(merged).reduce((final, key) => {
        let item = final[key];

        switch (key) {
          case "isLoading":
          case "firstName":
          case "lastName":
            break;
          case "address":
            item.visible = final.isAddressRequired.value;
            break;
          default:
            break;
        }

        return {
          ...final,
          [key]: {
            ...item,
          },
        };
      }, merged);

      const resetMerged = Object.keys(visibleMerged).reduce((final, key) => {
        const item = final[key];

        if (!item.visible) {
          switch (key) {
            case "isLoading":
            case "firstName":
            case "lastName":
              break;
            case "address":
              item.value = structuredClone(item.defaultValue);
              break;
            default:
              break;
          }
        }

        return {
          ...final,
          [key]: {
            ...item,
          },
        };
      }, visibleMerged);

      return resetMerged;
    },
    {
      isLoading: {
        visible: false,
      },
      firstName: {
        defaultValue: null,
        required: true,
        value: "",
        visible: true,
      },
      lastName: {
        defaultValue: null,
        required: true,
        value: "",
        visible: true,
      },
      isAddressRequired: {
        defaultValue: null,
        required: true,
        value: false,
        visible: true,
      },
      address: {
        defaultValue: {
          addressLine1: {
            defaultValue: null,
            required: true,
            value: "",
            visible: true,
          },
          addressLine2: {
            defaultValue: null,
            required: true,
            value: "",
            visible: true,
          },
        },
        required: true,
        value: {
          addressLine1: {
            defaultValue: null,
            required: true,
            value: "",
            visible: true,
          },
          addressLine2: {
            defaultValue: null,
            required: true,
            value: "",
            visible: true,
          },
        },
        visible: true,
      },
    }
  );

  const onValueChange = (path, value) => {
    const updatedObject = {
      [path]: {
        value,
      },
    };
    setFormData(updatedObject);
  };

  useEffect(() => {
    setFormData({ isLoading: { visible: true } });
  }, []);

  if (!formData.isLoading.visible) {
    return null;
  }

  console.log(JSON.stringify(formData.address, null, 2));

  return (
    <div>
      <h1>State Management PoC</h1>
      {formData.firstName.visible && (
        <InputField
          path="firstName"
          required={formData.firstName.required}
          value={formData.firstName.value}
          defaultValue={formData.firstName.defaultValue}
          onValueChange={onValueChange}
        />
      )}
      {formData.lastName.visible && (
        <InputField
          path="lastName"
          required={formData.lastName.required}
          value={formData.lastName.value}
          defaultValue={formData.lastName.defaultValue}
          onValueChange={onValueChange}
        />
      )}
      {formData.isAddressRequired.visible && (
        <input
          type="checkbox"
          required={formData.isAddressRequired.required}
          value={formData.isAddressRequired.value}
          onChange={(event) => {
            onValueChange("isAddressRequired", event.target.value === "false");
          }}
        />
      )}
      {formData.address.visible && (
        <AddressField
          path="address"
          required={formData.address.required}
          value={formData.address.value}
          defaultValue={formData.address.defaultValue}
          onValueChange={onValueChange}
        />
      )}
    </div>
  );
};

export default MyFirstPage;
