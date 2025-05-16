import React, { useEffect, useState } from "react";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { StudentData } from "./types";
import { FileInputField } from "./FileInputField";
import {
  useStudentStore,
  useClassStore,
  useSectionStore,
  useEditingStudentStore,
} from "../stores/store"; // Import the Zustand store
import { useNavigate } from "react-router-dom";

type StudentRegistrationFormProps = {
  onCancel: () => void;
  editingStudent?: StudentData | null;
};

const StudentRegistrationForm: React.FC<StudentRegistrationFormProps> = ({
  editingStudent,
  onCancel,
}) => {
  useEffect(() => {
    if (editingStudent) {
      console.log("Editing student:", editingStudent);
    }
  }, [editingStudent]);

  const { addStudent, updateStudent, fetchStudents } = useStudentStore();
  const { classes, fetchClasses } = useClassStore();
  const { sections, fetchSections } = useSectionStore();
  const { setEditingStudent } = useEditingStudentStore();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<StudentData, "id">>({
    name: "",
    classId: 0,
    sectionId: 0,
    registrationNumber: "",
    profilePhoto: "",
    isActive: 1,
  });

  const [file, setFile] = useState<File | null>(null);

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchSections();
  }, [fetchStudents, fetchClasses, fetchSections]);

  // Pre-fill the form if editing a student
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        classId: editingStudent.classId,
        sectionId: editingStudent.sectionId,
        registrationNumber: editingStudent.registrationNumber,
        profilePhoto: editingStudent.profilePhoto,
        isActive: editingStudent.isActive,
      });
    }
  }, [editingStudent]);

  const activeClasses = classes.filter((cls) => cls.isActive);

  const activeSections = sections.filter((sec) => sec.isActive);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setFormData((prev) => ({ ...prev, profilePhoto: base64String }));
        };
        reader.readAsDataURL(file);
        setFile(file);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic input validation
    if (
      !formData.name ||
      !formData.classId ||
      !formData.sectionId ||
      !formData.registrationNumber
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      if (editingStudent) {
        // Update the student
        await updateStudent(editingStudent.id, formData);
        setEditingStudent(null);
        // Navigate to the StudentTable route
        navigate("/view/student-detail"); // Use the navigate function from react-router-dom
      } else {
        // Register a new student
        await addStudent(formData);
      }

      // Reset the form
      setFormData({
        name: "",
        classId: 0,
        sectionId: 0,
        registrationNumber: "",
        profilePhoto: "",
        isActive: 1,
      });
      setFile(null);

      // open students table
      navigate("/view/student-detail");
    } catch (error) {
      console.error("Failed to submit student data:", error);
    }
  };

  return (
    <div className="bg-[#f1f2f3] min-h-screen py-14 px-4 flex items-center rounded-md landingPagePara z-40">
      <form
        onSubmit={handleSubmit}
        className="text-[#001435] border -mt-24 border-[#cfd3d8] bg-[#fff] rounded-lg shadow-lg space-y-6 max-w-xl w-full px-10 py-6 mx-auto hover:animate-pulse-border-once"
      >
        <h2 className="landingPageHeading mb-6 text-center">
          Student {editingStudent ? "Record Editing" : "Registration"}
        </h2>
        <InputField
          label="Student Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required={true}
        />
        <SelectField
          label="Select Class"
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          options={activeClasses.map((cls) => ({
            value: cls.id,
            label: cls.className,
          }))}
          required={true}
        />
        <SelectField
          label="Select Section"
          name="sectionId"
          value={formData.sectionId}
          onChange={handleChange}
          options={activeSections.map((sec) => ({
            value: sec.id,
            label: sec.section,
          }))}
          required={true}
        />
        <InputField
          label="Registration Number"
          name="registrationNumber"
          value={formData.registrationNumber || ""}
          onChange={handleChange}
          required={true}
          
        />
        <FileInputField
          label="Profile Photo"
          name="profilePhoto"
          value={file}
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="flex pt-6 justify-around -space-x-52">
          <button
            type="button"
            onClick={onCancel}
            className="px-7 py-2 rounded-md text-base bg-white text-red-500 hover:bg-red-500 border border-red-500 hover:text-white transition duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md text-base font-paypalRegular border bg-green-400 text-white hover:bg-green-500 border-[#cfd3d8] transition duration-200 ease-in-out"
          >
            {editingStudent ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
