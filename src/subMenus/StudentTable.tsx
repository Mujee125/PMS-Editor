// import React, { useMemo, useEffect } from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
// import { StudentData } from "./types";
// import DataTable from "./DataTable";
// import {
//   useStudentStore,
//   useClassStore,
//   useSectionStore,
//   useEditingStudentStore,
// } from "../stores/store";
// import { useNavigate } from "react-router-dom";

// const StudentTable: React.FC = () => {
//   const {
//     students,
//     fetchStudents,
//     updateStudent,
//     deleteStudent,
//     toggleStudentStatus,
//   } = useStudentStore();
//   const { classes, fetchClasses } = useClassStore();
//   const { sections, fetchSections } = useSectionStore();
//   const { setEditingStudent } = useEditingStudentStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//     fetchSections();
//   }, [fetchStudents, fetchClasses, fetchSections]);

//   const data = useMemo(() => students || [], [students]);

//   const getClassName = (classId: number) => {
//     if (!classes || classes.length === 0) return "Unknown Class";
//     const classData = classes.find((cls) => cls.id === classId);
//     return classData ? classData.className : "Unknown Class";
//   };

//   const getSectionName = (sectionId: number) => {
//     if (!sections || sections.length === 0) return "Unknown Section";
//     const sectionData = sections.find((sec) => sec.id === sectionId);
//     return sectionData ? sectionData.section : "Unknown Section";
//   };

//   const handleEditStudent = (student: StudentData) => {
//     setEditingStudent(student);
//     navigate("/registration/register");
//   };

//   const handleToggleEntityStatus = async (id: number) => {
//     try {
//       await toggleStudentStatus(id);
//     } catch (error) {
//       console.error(`Error toggling status:`, error);
//     }
//   };

//   const columns = useMemo<ColumnDef<StudentData>[]>(
//     () => [
//       {
//         accessorKey: "name",
//         header: "Name",
//         cell: (info) => info.getValue() || "N/A",
//       },
//       {
//         accessorKey: "classId",
//         header: "Class",
//         cell: ({ row }) => (
//           <span>{getClassName(row.original?.classId || 0)}</span>
//         ),
//       },
//       {
//         accessorKey: "sectionId",
//         header: "Section",
//         cell: ({ row }) => (
//           <span>{getSectionName(row.original?.sectionId || 0)}</span>
//         ),
//       },
//       {
//         accessorKey: "registrationNumber",
//         header: "Reg. No",
//         cell: ({ getValue }) => <span>{String(getValue() || "N/A")}</span>,
//       },
//       {
//         accessorKey: "profilePhoto",
//         header: "Photo",
//         cell: ({ getValue }) => {
//           const photoUrl = getValue() as string;
//           return photoUrl ? (
//             <img
//               src={photoUrl}
//               alt="Profile"
//               className="w-10 h-10 rounded-full mx-auto"
//             />
//           ) : (
//             <span>No Photo</span>
//           );
//         },
//       },
//       {
//         id: "actions",
//         header: "Actions",
//         cell: ({ row }) => {
//           const student = row.original;
//           if (!student) return null;
//           return (
//             <div className="flex justify-center space-x-4">
//               <button
//                 title="Edit"
//                 onClick={() => handleEditStudent(student)}
//                 className="text-blue-500 hover:text-blue-700"
//               >
//                 <FaEdit className="h-5 w-5" />
//               </button>
//               <button
//                 title="Delete"
//                 onClick={() => deleteStudent(student)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <FaTrash className="h-5 w-5" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleToggleEntityStatus(row.original.id)}
//                 className={`${
//                   row.original.isActive ? "text-green-700" : "text-gray-500"
//                 } px-2`}
//                 title={
//                   row.original.isActive ? "Active Student" : "De-active Student"
//                 }
//               >
//                 {row.original.isActive ? (
//                   <FaToggleOn className="h-5 w-5" />
//                 ) : (
//                   <FaToggleOff className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           );
//         },
//       },
//     ],
//     [classes, deleteStudent, updateStudent]
//   );

//   return (
//     <div className="entityDiv">
//       <div className="entitySubDiv max-w-4xl">
//         <h2 className="text-center landingPageHeading">
//           Student Registration Data
//         </h2>
//         <DataTable
//           columns={columns}
//           data={data}
//           showSearchBox={true}
//           className=" h-[79vh] "
//         />
//       </div>
//     </div>
//   );
// };

// export default StudentTable;
// ⁡⁣⁣⁢working  StudentTable.tsx⁡
import React, { useMemo, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { StudentData } from "./types";
import DataTable from "./DataTable";
import {
  useStudentStore,
  useClassStore,
  useSectionStore,
  useEditingStudentStore,
  useStudentPaginationStore,
} from "../stores/store";
import { useNavigate } from "react-router-dom";
const StudentTable: React.FC = () => {
  const {
    students,
    fetchStudents,
    updateStudent,
    deleteStudent,
    toggleStudentStatus,
  } = useStudentStore();
  const { classes, fetchClasses } = useClassStore();
  const { sections, fetchSections } = useSectionStore();
  const { setEditingStudent } = useEditingStudentStore();
  const navigate = useNavigate();

  // Use the pagination store
  const { pageIndex, setPageIndex } = useStudentPaginationStore();

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchSections();
  }, [fetchStudents, fetchClasses, fetchSections]);

  const data = useMemo(() => students || [], [students]);

  const getClassName = (classId: number) => {
    if (!classes || classes.length === 0) return "Unknown Class";
    const classData = classes.find((cls) => cls.id === classId);
    return classData ? classData.className : "Unknown Class";
  };

  const getSectionName = (sectionId: number) => {
    if (!sections || sections.length === 0) return "Unknown Section";
    const sectionData = sections.find((sec) => sec.id === sectionId);
    return sectionData ? sectionData.section : "Unknown Section";
  };

  const handleEditStudent = (student: StudentData) => {
    // Store the current page index before navigating
    setEditingStudent(student);
    navigate("/registration/register", {
      state: { currentPageIndex: pageIndex },
    });
  };

  const handleToggleEntityStatus = async (id: number) => {
    try {
      await toggleStudentStatus(id);
    } catch (error) {
      console.error(`Error toggling status:`, error);
    }
  };

  const columns = useMemo<ColumnDef<StudentData>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue() || "N/A",
      },
      {
        accessorKey: "classId",
        header: "Class",
        cell: ({ row }) => (
          <span>{getClassName(row.original?.classId || 0)}</span>
        ),
      },
      {
        accessorKey: "sectionId",
        header: "Section",
        cell: ({ row }) => (
          <span>{getSectionName(row.original?.sectionId || 0)}</span>
        ),
      },
      {
        accessorKey: "registrationNumber",
        header: "Reg. No",
        cell: ({ getValue }) => <span>{String(getValue() || "N/A")}</span>,
      },
      {
        accessorKey: "profilePhoto",
        header: "Photo",
        cell: ({ getValue }) => {
          const photoUrl = getValue() as string;
          return photoUrl ? (
            <img
              src={photoUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full mx-auto"
            />
          ) : (
            <span>No Photo</span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const student = row.original;
          if (!student) return null;
          return (
            <div className="flex justify-center space-x-4">
              <button
                title="Edit"
                onClick={() => handleEditStudent(student)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit className="h-5 w-5" />
              </button>
              <button
                title="Delete"
                onClick={() => deleteStudent(student)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => handleToggleEntityStatus(row.original.id)}
                className={`${
                  row.original.isActive ? "text-green-700" : "text-gray-500"
                } px-2`}
                title={
                  row.original.isActive ? "Active Student" : "De-active Student"
                }
              >
                {row.original.isActive ? (
                  <FaToggleOn className="h-5 w-5" />
                ) : (
                  <FaToggleOff className="h-5 w-5" />
                )}
              </button>
            </div>
          );
        },
      },
    ],
    [classes, deleteStudent, updateStudent]
  );

  return (
    <div className="entityDiv">
      <div className="entitySubDiv max-w-4xl">
        <h2 className="text-center landingPageHeading">
          Student Registration Data
        </h2>
        <DataTable
          columns={columns}
          data={data}
          showSearchBox={true}
          className=" h-[79vh] "
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </div>
    </div>
  );
};

export default StudentTable;

// Updated StudentTable.tsx
// import React, { useMemo, useEffect } from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
// import { StudentData } from "./types";
// import DataTable from "./DataTable";
// import {
//   useStudentStore,
//   useClassStore,
//   useSectionStore,
//   useEditingStudentStore,
//   useStudentPaginationStore,
// } from "../stores/store";
// import { useNavigate } from "react-router-dom";
// import { useStudentDataWorker } from "../hooks/useStudentDataWorker";



// const StudentTable: React.FC = () => {
//   const {
//     students,
//     fetchStudents,
//     deleteStudent,
//     toggleStudentStatus,
//   } = useStudentStore();
//   const { classes, fetchClasses } = useClassStore();
//   const { sections, fetchSections } = useSectionStore();
//   const { setEditingStudent } = useEditingStudentStore();
//   const navigate = useNavigate();
//   const { pageIndex, setPageIndex } = useStudentPaginationStore();
  
//   // Use our worker hook
//   const { processedData, processData } = useStudentDataWorker();

//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([fetchStudents(), fetchClasses(), fetchSections()]);
//     };
//     loadData();
//   }, [fetchStudents, fetchClasses, fetchSections]);

//   // Process data when students, classes, or sections change
//   useEffect(() => {
//     if (students.length > 0 && classes.length > 0 && sections.length > 0) {
//       processData(students, classes, sections);
//     }
//   }, [students, classes, sections, processData]);

//   // Use processed data from worker (fallback to regular students if no processed data)
//   const data = useMemo(() => processedData.length > 0 ? processedData : students, [processedData, students]);

//   // Simplified column definitions since we now have className and sectionName in the data
//   const columns = useMemo<ColumnDef<StudentData>[]>(
//     () => [
//       {
//         accessorKey: "name",
//         header: "Name",
//         cell: (info) => info.getValue() || "N/A",
//       },
//       {
//         accessorKey: "className", // Now using the pre-processed className
//         header: "Class",
//       },
//       {
//         accessorKey: "sectionName", // Now using the pre-processed sectionName
//         header: "Section",
//       },
//       {
//         accessorKey: "registrationNumber",
//         header: "Reg. No",
//         cell: ({ getValue }) => <span>{String(getValue() || "N/A")}</span>,
//       },
//       {
//         accessorKey: "profilePhoto",
//         header: "Photo",
//         cell: ({ getValue }) => {
//           const photoUrl = getValue() as string;
//           return photoUrl ? (
//             <img
//               src={photoUrl}
//               alt="Profile"
//               className="w-10 h-10 rounded-full mx-auto"
//             />
//           ) : (
//             <span>No Photo</span>
//           );
//         },
//       },
//       {
//         id: "actions",
//         header: "Actions",
//         cell: ({ row }) => {
//           const student = row.original;
//           if (!student) return null;
//           return (
//             <div className="flex justify-center space-x-4">
//               <button
//                 title="Edit"
//                 onClick={() => handleEditStudent(student)}
//                 className="text-blue-500 hover:text-blue-700"
//               >
//                 <FaEdit className="h-5 w-5" />
//               </button>
//               <button
//                 title="Delete"
//                 onClick={() => deleteStudent(student)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <FaTrash className="h-5 w-5" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleToggleEntityStatus(row.original.id)}
//                 className={`${
//                   row.original.isActive ? "text-green-700" : "text-gray-500"
//                 } px-2`}
//                 title={
//                   row.original.isActive ? "Active Student" : "De-active Student"
//                 }
//               >
//                 {row.original.isActive ? (
//                   <FaToggleOn className="h-5 w-5" />
//                 ) : (
//                   <FaToggleOff className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           );
//         },
//       },
//     ],
//     [deleteStudent]
//   );

//   const handleEditStudent = (student: StudentData) => {
//     setEditingStudent(student);
//     navigate("/registration/register", {
//       state: { currentPageIndex: pageIndex },
//     });
//   };

//   const handleToggleEntityStatus = async (id: number) => {
//     try {
//       await toggleStudentStatus(id);
//     } catch (error) {
//       console.error(`Error toggling status:`, error);
//     }
//   };

//   return (
//     <div className="entityDiv">
//       <div className="entitySubDiv max-w-4xl">
//         <h2 className="text-center landingPageHeading">
//           Student Registration Data
//         </h2>
//         <DataTable
//           columns={columns}
//           data={data}
//           showSearchBox={true}
//           className=" h-[79vh] "
//           pageIndex={pageIndex}
//           setPageIndex={setPageIndex}
//         />
//       </div>
//     </div>
//   );
// };

// export default StudentTable;

// import React, { useMemo, useEffect, useCallback } from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
// import { StudentData } from "./types";
// import DataTable from "./DataTable";
// import {
//   useStudentStore,
//   useClassStore,
//   useSectionStore,
//   useEditingStudentStore,
//   useStudentPaginationStore,
// } from "../stores/store";
// import { useNavigate } from "react-router-dom";

// const PAGE_SIZE = 50; // Number of records per fetch

// const StudentTable: React.FC = () => {
//   const {
//     students,
//     fetchStudents,
//     updateStudent,
//     deleteStudent,
//     toggleStudentStatus,
//   } = useStudentStore();
//   const { classes, fetchClasses } = useClassStore();
//   const { sections, fetchSections } = useSectionStore();
//   const { setEditingStudent } = useEditingStudentStore();
//   const { pageIndex, setPageIndex } = useStudentPaginationStore();
//   const navigate = useNavigate();

//   // Fetch initial data
//   useEffect(() => {
//     fetchStudents(0, PAGE_SIZE); // Load initial 50 students
//     fetchClasses();
//     fetchSections();
//   }, [fetchStudents, fetchClasses, fetchSections]);

//   // Handle pagination (Lazy Loading)
//   useEffect(() => {
//     if (pageIndex > 0) {
//       fetchStudents(pageIndex * PAGE_SIZE, PAGE_SIZE);
//     }
//   }, [pageIndex, fetchStudents]);

//   const data = useMemo(() => students || [], [students]);

//   const getClassName = useCallback(
//     (classId: number) => {
//       const classData = classes?.find((cls) => cls.id === classId);
//       return classData ? classData.className : "Unknown Class";
//     },
//     [classes]
//   );

//   const getSectionName = useCallback(
//     (sectionId: number) => {
//       const sectionData = sections?.find((sec) => sec.id === sectionId);
//       return sectionData ? sectionData.section : "Unknown Section";
//     },
//     [sections]
//   );

//   const handleEditStudent = (student: StudentData) => {
//     setEditingStudent(student);
//     navigate("/registration/register", {
//       state: { currentPageIndex: pageIndex },
//     });
//   };

//   const handleToggleEntityStatus = async (id: number) => {
//     try {
//       await toggleStudentStatus(id);
//     } catch (error) {
//       console.error(`Error toggling status:`, error);
//     }
//   };

//   const columns = useMemo<ColumnDef<StudentData>[]>(
//     () => [
//       {
//         accessorKey: "name",
//         header: "Name",
//         cell: (info) => info.getValue() || "N/A",
//       },
//       {
//         accessorKey: "classId",
//         header: "Class",
//         cell: ({ row }) => (
//           <span>{getClassName(row.original?.classId || 0)}</span>
//         ),
//       },
//       {
//         accessorKey: "sectionId",
//         header: "Section",
//         cell: ({ row }) => (
//           <span>{getSectionName(row.original?.sectionId || 0)}</span>
//         ),
//       },
//       {
//         accessorKey: "registrationNumber",
//         header: "Reg. No",
//         cell: ({ getValue }) => <span>{String(getValue() || "N/A")}</span>,
//       },
//       {
//         accessorKey: "profilePhoto",
//         header: "Photo",
//         cell: ({ getValue }) => {
//           const photoUrl = getValue() as string;
//           return photoUrl ? (
//             <img
//               src={photoUrl}
//               alt="Profile"
//               className="w-10 h-10 rounded-full mx-auto"
//             />
//           ) : (
//             <span>No Photo</span>
//           );
//         },
//       },
//       {
//         id: "actions",
//         header: "Actions",
//         cell: ({ row }) => {
//           const student = row.original;
//           return (
//             <div className="flex justify-center space-x-4">
//               <button
//                 title="Edit"
//                 onClick={() => handleEditStudent(student)}
//                 className="text-blue-500 hover:text-blue-700"
//               >
//                 <FaEdit className="h-5 w-5" />
//               </button>
//               <button
//                 title="Delete"
//                 onClick={() => deleteStudent(student)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <FaTrash className="h-5 w-5" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleToggleEntityStatus(row.original.id)}
//                 className={`${
//                   row.original.isActive ? "text-green-700" : "text-gray-500"
//                 } px-2`}
//                 title={
//                   row.original.isActive ? "Active Student" : "De-active Student"
//                 }
//               >
//                 {row.original.isActive ? (
//                   <FaToggleOn className="h-5 w-5" />
//                 ) : (
//                   <FaToggleOff className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           );
//         },
//       },
//     ],
//     [classes, deleteStudent, updateStudent, getClassName, getSectionName]
//   );

//   return (
//     <div className="entityDiv">
//       <div className="entitySubDiv max-w-4xl">
//         <h2 className="text-center landingPageHeading">
//           Student Registration Data
//         </h2>
//         <DataTable
//           columns={columns}
//           data={data}
//           showSearchBox={true}
//           className=" h-[79vh] "
//           pageIndex={pageIndex}
//           setPageIndex={setPageIndex}
//         />
//       </div>
//     </div>
//   );
// };

// export default StudentTable;
