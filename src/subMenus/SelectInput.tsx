import React from "react";
import Select, { SingleValue, MultiValue } from "react-select";

interface SelectInputProps {
  options: { value: string; label: string }[];
  selectedValue: string | string[];
  setSelectedValue: React.Dispatch<React.SetStateAction<string | string[]>>;
  isMulti?: boolean;
  placeholder: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  selectedValue,
  setSelectedValue,
  isMulti = false,
  placeholder,
}) => {
  const handleChange = (
    selectedOption:
      | SingleValue<{ value: string; label: string }>
      | MultiValue<{ value: string; label: string }>
      | null
  ) => {
    if (selectedOption !== null) {
      if (isMulti) {
        // For multi-selection, we need to store an array of values
        const multiSelected = selectedOption as MultiValue<{
          value: string;
          label: string;
        }>;
        setSelectedValue(multiSelected.map((option) => option.value));
      } else {
        // For single selection, we just store the selected value
        const singleSelected = selectedOption as SingleValue<{
          value: string;
          label: string;
        }>;
        if (singleSelected) {
          setSelectedValue(singleSelected.value);
        }
      }
    } else {
      setSelectedValue(isMulti ? [] : "");
    }
  };

  const value = isMulti
    ? (selectedValue as string[]).map((value) => ({ value, label: value }))
    : selectedValue
    ? { value: selectedValue as string, label: selectedValue as string }
    : null;

  return (
    <Select
      value={value || null}
      onChange={handleChange}
      options={options}
      isMulti={isMulti}
      placeholder={placeholder}
      className="w-full text-black"
      noOptionsMessage={() => "No options available"}
    />
  );
};

export default SelectInput;

