
// export const SelectField: React.FC<{
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   options: string[];
//   required?: boolean;
// }> = ({ label, name, value, onChange, options, required }) => (
//   <div>
//     <label htmlFor={name} className="block font-medium text-gray-700 text-base">
//       {label}
//     </label>
//     <select
//       name={name}
//       id={name}
//       value={value}
//       onChange={onChange}
//       className="w-full border border-gray-300 p-2 text-gray-400 rounded-md"
//       required={required}
//     >
//       <option value="" disabled>
//         Select {label.toLowerCase()}
//       </option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   </div>
// );


import React from "react";

export const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}> = ({ label, name, value, onChange, options, required }) => (
  <div className="relative font-paypalRegular">
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="peer w-full border border-[#cfd3d8] px-2 py-3 text-lg  rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#545d68] appearance-none hover:border-[#001435] transition duration-300 ease-in-out"
    >
      <option value="" disabled></option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {value === "" && (
      <label
        htmlFor={name}
        className="absolute left-3 top-3 text-[#929496] text-lg transition-all duration-200 
        peer-focus:top-[-16px] 
        
       peer-focus:text-[#545d68] peer-focus:text-base peer-focus:bg-[#fff] peer-focus:px-1"
      >
        {label}
      </label>
    )}
  </div>
);

