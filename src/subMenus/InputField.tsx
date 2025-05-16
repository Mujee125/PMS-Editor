

import React, { useState } from "react";

export const InputField: React.FC<{
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}> = ({ label, name, type = "text", value, onChange, onKeyDown, required, className }) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloatLabel = isFocused || value !== "";
  return (
    <div className="relative flex items-center font-paypalRegular text-lg">
      {/* Input field */}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        onKeyDown={onKeyDown}
        // Keeps space for the floating label
        className={`${className} peer w-full border px-[20px] py-2 min-h-[38px] rounded-md focus:outline-none focus:ring-[1.5px] focus:ring-[#2684ff] hover:border-[#2684ff] transition duration-300 ease-in-out ${
          value ? "border-[#2684ff]" : "border-[#cfd3d8]"
        }`}
      />

      {/* Floating label */}
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-200 text-base pointer-events-none bg-white px-1
          ${
            shouldFloatLabel
              ? "top-[-15px] text-base text-[#2684ff]"
              : "top-[50%] translate-y-[-50%] text-[#888888]" //
          }`}
      >
        {label}
      </label>
    </div>
  );
};

