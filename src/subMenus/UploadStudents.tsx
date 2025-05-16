// import React, { useEffect, useState } from "react";
// import Papa from "papaparse";
// import { StudentData } from "./types";
// import { FileInputField } from "./FileInputField";
// import {
//   useStudentStore,
//   useClassStore,
//   useSectionStore,
// } from "../stores/store";
// import { useNavigate } from "react-router-dom";

// type UploadStudentsProps = {
//   onCancel: () => void;
// };

// const UploadStudents: React.FC<UploadStudentsProps> = ({ onCancel }) => {
//   const { students, addStudent, fetchStudents } = useStudentStore();
//   const { classes, fetchClasses } = useClassStore();
//   const { sections, fetchSections } = useSectionStore();
//   const [file, setFile] = useState<File | null>(null);
//    const [loading, setLoading] = useState(false);
//    const navigate = useNavigate();

//   useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//     fetchSections();
//   }, [fetchStudents, fetchClasses, fetchSections]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const selectedFile = files[0];
//       setFile(selectedFile);
//     }
//   };

//   const parseCSV = (file: File) => {
//     Papa.parse(file, {
//       header: true,
//       complete: (result) => {
       

//         const classMap: { [key: string]: number } = {};
//         classes.forEach((classOption) => {
//           classMap[classOption.className] = classOption.id;
//         });

//         const sectionMap: { [key: string]: number } = {};
//         sections.forEach((sectionOption) => {
//           sectionMap[sectionOption.section] = sectionOption.id;
//         });

//         const registrationNumbersInCSV = new Set<number>();
//         const fileStudents: Omit<StudentData, "id">[] = result.data
//           .map((row: any) => {
//             const registrationNumber =
//               Number(row.registrationNumber?.trim()) || 0;

//             if (registrationNumbersInCSV.has(registrationNumber)) {
//               console.error(
//                 `Duplicate registration number in CSV: ${registrationNumber}`
//               );
//               return null;
//             }

//             registrationNumbersInCSV.add(registrationNumber);

//             const className = row.className?.trim() || "";
//             const sectionName = row.section?.trim() || "";

//             const classId = classMap[className];
//             const sectionId = sectionMap[sectionName];

//             if (!classId || !sectionId) {
//               console.error(
//                 `Invalid class or section for student ${row.name}: Class=${className}, Section=${sectionName}`
//               );
//               return null;
//             }

//             return {
//               name: row.name?.trim() || "",
//               classId,
//               sectionId,
//               registrationNumber,
//               profilePhoto: row.profilePhoto || "",
//               isActive:
//                 row.isActive !== undefined ? Number(row.isActive?.trim()) : 1,
//             };
//           })
//           .filter((student) => student !== null) as Omit<StudentData, "id">[];

//         saveToDatabase(fileStudents);
       
//       },
//     });
//   };

//   const saveToDatabase = async (fileStudents: Omit<StudentData, "id">[]) => {
//     if (fileStudents.length === 0) {
//       alert("No valid students found in the file.");
//       return;
//     }

//     const existingRegistrationNumbers = new Set(
//       students.map((s) => s.registrationNumber)
//     );

//     let successCount = 0;
//     const failedRecords: {
//       name: string;
//       registrationNumber: number;
//       error: string;
//     }[] = [];

//     fileStudents.forEach((student) => {
//       if (existingRegistrationNumbers.has(student.registrationNumber)) {
//         failedRecords.push({
//           name: student.name,
//           registrationNumber: student.registrationNumber,
//           error: `A student with the registration number ${student.registrationNumber} already exists in the database.`,
//         });
//         return;
//       }

//       try {
//         addStudent(student);
//         successCount++;
//       } catch (error: any) {
//         failedRecords.push({
//           name: student.name,
//           registrationNumber: student.registrationNumber,
//           error: error.message || "Failed to save student.",
//         });
//         console.error("Error saving student:", error);
//       }
//     });

//     let message = "";

//     if (successCount > 0) {
//       message += `${successCount} students added successfully!\n`;
//     }

//     if (failedRecords.length > 0) {
//       if (successCount === 0) {
//         message += "No students were added due to errors.\n";
//       }
//       message += `\nFailed to save the following records:\n`;
//       failedRecords.forEach((record) => {
//         message += `- ${record.name} (Registration Number: ${record.registrationNumber}): ${record.error}\n`;
//       });
//     }

//     alert(message);
//     navigate("/view/student-detail");
//   };

//   const handleUpload = () => {
//     if (!file) {
//       alert("Please upload a CSV file.");
//       return;
//     }

//     if (!file.name.endsWith(".csv")) {
//       alert("Invalid file format. Please upload a CSV file.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const text = e.target?.result as string;
//       if (
//         !text.includes(
//           "name,className,section,registrationNumber,profilePhoto,isActive"
//         )
//       ) {
//         alert("Invalid CSV file. Please upload a valid students CSV file.");
//         return;
//       }
//       parseCSV(file);
//     };
//     reader.readAsText(file);
//   };

//   const downloadSampleCSV = () => {
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       "name,className,section,registrationNumber,profilePhoto,isActive\n" +
//       "John Doe,Nursery,A,12345,URL,1\n" +
//       "Jane Smith,KG,B,67890,URL,1\n";

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "sample_students.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   return (
//     <div className="entityDiv">
//       {/* Full-screen loading overlay */}
//       {loading && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001435] bg-opacity-50">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
//         </div>
//       )}
//       <div className="entitySubDiv">
//         <h2 className="text-center landingPageHeading">
//           Upload Students (CSV File)
//         </h2>

//         <FileInputField
//           name="studentsFile"
//           accept=".csv"
//           value={file}
//           onChange={handleFileChange}
//           label="Upload CSV File"
//         />

//         <div className="flex pt-4 justify-around -space-x-96">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-6 py-2 rounded-md text-base bg-white text-red-500 hover:bg-red-500 border border-red-500 hover:text-white transition duration-200 ease-in-out"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={downloadSampleCSV}
//             className="px-6 py-2 rounded-md text-base bg-white text-[#2684ff] hover:bg-[#2684ff] border border-[#2684ff] hover:text-white transition duration-200 ease-in-out"
//           >
//             Sample
//           </button>
//           <button
//             onClick={() => { setLoading(true); handleUpload(); }}
//             className="px-6 py-2 rounded-md text-base font-paypalRegular border bg-green-400 text-white hover:bg-green-500 border-[#cfd3d8] transition duration-200 ease-in-out"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadStudents;

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { StudentData } from "./types";
import { FileInputField } from "./FileInputField";
import {
  useStudentStore,
  useClassStore,
  useSectionStore,
} from "../stores/store";
import { useNavigate } from "react-router-dom";

type UploadStudentsProps = {
  onCancel: () => void;
};

const UploadStudents: React.FC<UploadStudentsProps> = ({ onCancel }) => {
  const { students, addStudent, fetchStudents } = useStudentStore();
  const { classes, fetchClasses } = useClassStore();
  const { sections, fetchSections } = useSectionStore();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchSections();
  }, [fetchStudents, fetchClasses, fetchSections]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const classMap: { [key: string]: number } = {};
        classes.forEach((classOption) => {
          classMap[classOption.className] = classOption.id;
        });

        const sectionMap: { [key: string]: number } = {};
        sections.forEach((sectionOption) => {
          sectionMap[sectionOption.section] = sectionOption.id;
        });

        const registrationNumbersInCSV = new Set<number>();
        const fileStudents: Omit<StudentData, "id">[] = result.data
          .map((row: any) => {
            const registrationNumber =
              row.registrationNumber?.trim() || "";

            if (registrationNumbersInCSV.has(registrationNumber)) {
              console.error(
                `Duplicate registration number in CSV: ${registrationNumber}`
              );
              return null;
            }

            registrationNumbersInCSV.add(registrationNumber);

            const className = row.className?.trim() || "";
            const sectionName = row.section?.trim() || "";

            const classId = classMap[className];
            const sectionId = sectionMap[sectionName];

            if (!classId || !sectionId) {
              console.error(
                `Invalid class or section for student ${row.name}: Class=${className}, Section=${sectionName}`
              );
              return null;
            }

            return {
              name: row.name?.trim() || "",
              classId,
              sectionId,
              registrationNumber,
              profilePhoto: row.profilePhoto || "",
              isActive:
                row.isActive !== undefined ? Number(row.isActive?.trim()) : 1,
            };
          })
          .filter((student) => student !== null) as Omit<StudentData, "id">[];

        saveToDatabase(fileStudents);
      },
      error: () => {
        setLoading(false); // Reset loading if there's an error in parsing
      },
    });
  };

  const saveToDatabase = async (fileStudents: Omit<StudentData, "id">[]) => {
    if (fileStudents.length === 0) {
      alert("No valid students found in the file.");
      setLoading(false); // Reset loading if no valid students are found
      return;
    }

    const existingRegistrationNumbers = new Set(
      students.map((s) => s.registrationNumber)
    );

    let successCount = 0;
    const failedRecords: {
      name: string;
      registrationNumber: string;
      error: string;
    }[] = [];

    fileStudents.forEach((student) => {
      if (existingRegistrationNumbers.has(student.registrationNumber)) {
        failedRecords.push({
          name: student.name,
          registrationNumber: student.registrationNumber,
          error: `A student with the registration number ${student.registrationNumber} already exists in the database.`,
        });
        return;
      }

      try {
        addStudent(student);
        successCount++;
      } catch (error: any) {
        failedRecords.push({
          name: student.name,
          registrationNumber: student.registrationNumber,
          error: error.message || "Failed to save student.",
        });
        console.error("Error saving student:", error);
      }
    });

    let message = "";

    if (successCount > 0) {
      message += `${successCount} students added successfully!\n`;
    }

    if (failedRecords.length > 0) {
      if (successCount === 0) {
        message += "No students were added due to errors.\n";
      }
      message += `\nFailed to save the following records:\n`;
      failedRecords.forEach((record) => {
        message += `- ${record.name} (Registration Number: ${record.registrationNumber}): ${record.error}\n`;
      });
    }

    alert(message);
    setLoading(false); // Reset loading after processing is complete
    navigate("/view/student-detail");
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please upload a CSV file.");
      return;
    }

    if (!file.name.endsWith(".csv")) {
      alert("Invalid file format. Please upload a CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (
        !text.includes(
          "name,className,section,registrationNumber,profilePhoto,isActive"
        )
      ) {
        alert("Invalid CSV file. Please upload a valid students CSV file.");
        setLoading(false); // Reset loading if the file is invalid
        return;
      }
      parseCSV(file);
    };
    reader.readAsText(file);
  };

  const downloadSampleCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "name,className,section,registrationNumber,profilePhoto,isActive\n" +
      "John Doe,Nursery,A,REG-12345,E:downlaodsimageedit_10_5874862199.png,1\n" +
      "Jane Smith,KG,B,REG-67890,E:downlaodscv-pic.jpg,1\n" +
      "Ali Khan,Three,C,REG-67891,E:downlaodscv-pic-removebg-preview.png,1\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_students.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="entityDiv">
      {/* Full-screen loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001435] bg-opacity-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2  border-white"></div>
        </div>
      )}
      <div className="entitySubDiv">
        <h2 className="text-center landingPageHeading">
          Upload Students (CSV File)
        </h2>

        <FileInputField
          name="studentsFile"
          accept=".csv"
          value={file}
          onChange={handleFileChange}
          label="Upload CSV File"
        />

        <div className="flex pt-4 justify-around -space-x-96">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-md text-base bg-white text-red-500 hover:bg-red-500 border border-red-500 hover:text-white transition duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={downloadSampleCSV}
            className="px-6 py-2 rounded-md text-base bg-white text-[#2684ff] hover:bg-[#2684ff] border border-[#2684ff] hover:text-white transition duration-200 ease-in-out"
          >
            Sample
          </button>
          <button
            onClick={() => {
              setLoading(true);
              handleUpload();
            }}
            className="px-6 py-2 rounded-md text-base font-paypalRegular border bg-green-400 text-white hover:bg-green-500 border-[#cfd3d8] transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadStudents;