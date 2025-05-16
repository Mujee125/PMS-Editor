import React, { useState } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

export const ContentSelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (selectedOption: any) => void;
  options: Option[];
  required?: boolean;
  className?: string;
}> = ({ label, name, value, onChange, options, required, className }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Label should float if the field is focused or has a value
  const shouldFloatLabel = isFocused || value !== "";

  return (
    <div className="relative font-paypalRegular text-lg">
      {/* Floating label */}
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-200 text-base pointer-events-none bg-white px-1 ${
          shouldFloatLabel
            ? "top-[-15px] text-base text-[#2684ff]" // Floats above when focused or value exists
            : "top-[50%] translate-y-[-50%] text-[#888888]" // Centered when unfocused and empty
        }`}
        style={{
          zIndex: 1,
        }}
      >
        {label}
      </label>

      {/* React Select */}
      <Select
        name={name}
        value={value ? options.find((opt) => opt.value === value) : null} // Ensures resetting works
        onChange={(selectedOption) =>
          onChange({
            target: { name, value: selectedOption ? selectedOption.value : "" },
          })
        }
        className={className}
        options={options}
        classNamePrefix="react-select"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=""
        isClearable={!required}
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: "38px",
            padding: "4px",
            paddingLeft: "12px",
            borderColor: value ? "#2684ff" : "#cfd3d8",
            "&:hover": {
              borderColor: "#2684ff",
            },
            "&:focus-within": {
              borderColor: "#2684ff",
              boxShadow: "0 0 0 1.5px #2684ff",
            },
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0 8px",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 100, // Ensure menu is above other elements
          }),
        }}
      />
    </div>
  );
};

export default ContentSelectField;
