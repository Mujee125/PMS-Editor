import React, { useState } from "react";

export const FileInputField: React.FC<{
  label: string;
  name: string;
  value?: File | null;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Add this line
}> = ({ label, name, value,accept, onChange, className }) => {
  // Modify this line
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloatLabel = isFocused || value != null;

  return (
    <div
      className={`relative text-[#001435] text-lg flex items-center font-paypalRegular `}
    >
      {" "}
      {/* Modify this line */}
      {/* Invisible input for file upload */}
      <input
        title="Please Upload Profile Photo"
        type="file"
        name={name}
        id={name}
        accept={accept}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="peer absolute inset-0 w-11/12 ml-4 h-1/2 mt-3 opacity-0 cursor-pointer"
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
      {/* Display area for file name */}
      <div
        id="fileNameDisplay"
        className={`${className} min-w-full w-full border min-h-[46px] text-base focus:ring-[1.5px] focus:ring-[#2684ff] px-2 py-2 rounded-[4px] bg-white
          ${
            value
              ? "text-[#001435] text-lg px-[20px] border-[#2684ff]"
              : "text-[#929496] border-[#cfd3d8]"
          } hover:border-[#2684ff] transition duration-300 ease-in-out`}
      >
        {value ? value.name : ""}
      </div>
    </div>
  );
};
