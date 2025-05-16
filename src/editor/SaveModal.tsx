import React, { useState, useEffect } from "react";

const SaveModal: React.FC<{
  onSave: (name: string) => void;
  onClose: () => void;
  onCancel: () => void;
  fetchExistingName: () => Promise<string | null>;
}> = ({ onSave, onClose, fetchExistingName, onCancel }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      const existingName = await fetchExistingName();
      if (existingName) {
        setName(existingName);
      }
    };
    fetchName();
  }, [fetchExistingName]);

  const handleSave = () => {
    onSave(name);
    setName("");
    onClose();
    onCancel();
  };

  return (
    <div className="fixed inset-0 text-base flex rounded-md items-center justify-center bg-black bg-opacity-50 z-50 hover:border-[#2684ff] transition duration-300 ease-in-out">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg mb-4">Paper Name</h2>
        <input
          placeholder="Enter name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4 outline-none rounded-md focus:outline-none focus:ring-[1.5px] focus:ring-[#2684ff] hover:border-[#2684ff] transition duration-300 ease-in-out"
        />
       
        <div className="flex pt-6 justify-around    ">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2  rounded-md text-base bg-white text-red-500 hover:bg-red-500 border border-red-500 
            hover:text-white transition duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2  rounded-md text-base font-paypalRegular border bg-green-400 text-white hover:bg-green-500 
           border-[#cfd3d8]  transition duration-200 ease-in-out"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
