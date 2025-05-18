import React, { useState, useEffect, useMemo } from "react";
import { SelectField } from "../subMenus/SelectField";
import { useSubjectStore } from "../stores/store";

const SaveModal: React.FC<{
  onSave: (name: string) => void;
  onClose: () => void;
  onCancel: () => void;
  fetchExistingName: () => Promise<string | null>;
}> = ({ onSave, onClose, fetchExistingName, onCancel }) => {
  const { entities: subjects, fetchEntities: fetchSubjects } =
    useSubjectStore();

  const [selectedSubject, setSelectedSubject] = useState<string>("");

  useEffect(() => {
    const fetchName = async () => {
      const existingName = await fetchExistingName();
      if (existingName) {
        setSelectedSubject(existingName);
      }
    };
    fetchSubjects();
    fetchName();
  }, [fetchExistingName, fetchSubjects]);

  const handleSave = () => {
    onSave(selectedSubject);
    setSelectedSubject("");
    onClose();
    onCancel();
  };

  const activeSubjects = useMemo(
    () => subjects.filter((sub) => sub.isActive),
    [subjects]
  );

  return (
    <div className="fixed inset-0 text-base flex rounded-md items-center justify-center bg-black bg-opacity-50 z-50 hover:border-[#2684ff] transition duration-300 ease-in-out ">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg mb-4">Subject Name</h2>

        <SelectField
          label="Subject"
          name="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          options={activeSubjects.map((sub) => ({
            value: sub.subject,
            label: sub.subject,
          }))}
          required
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
