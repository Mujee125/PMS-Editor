
// import React, { useState, useEffect, useMemo } from "react";
// import { FaToggleOn, FaToggleOff, FaTrash } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa6";
// import { ColumnDef, ColumnFiltersState, RowData } from "@tanstack/react-table";
// import { LogoEntity } from "./types";
// import { FileInputField } from "./FileInputField";
// import DataTable from "./DataTable";
// import { useLogoStore } from "../stores/store";

// type EntityManagerLogoProps = {
//   entityName: string;
// };

// const EntityManagerLogo: React.FC<EntityManagerLogoProps> = ({
//   entityName,
// }) => {
//   const {
//     entities,
//     fetchEntities,
//     addEntity,
//     deleteEntity,
//     toggleEntityStatus,
//   } = useLogoStore();

//   const [newEntityName, setNewEntityName] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [file, setFile] = useState<File | null>(null);

//   useEffect(() => {
//     fetchEntities();
//   }, [fetchEntities]);

//   const handleAddEntity = async () => {
//     if (!newEntityName.trim()) {
//       setError(`${entityName} Name can't be empty.`);
//       return;
//     }
//     try {
//       await addEntity({ logoPhoto: newEntityName, isActive: true });
//       setNewEntityName("");
//       setError(null);
//     } catch (error) {
//       console.error(`Error adding ${entityName}:`, error);
//     }
//   };

//   const handleDeleteEntity = async (id: number) => {
//     try {
//       await deleteEntity(id);
//     } catch (error) {
//       console.error(`Error deleting ${entityName}:`, error);
//     }
//   };

//   const handleToggleEntityStatus = async (id: number) => {
//     try {
//       await toggleEntityStatus(id);
//     } catch (error) {
//       console.error(`Error toggling ${entityName} status:`, error);
//     }
//   };

//   const columns = useMemo<ColumnDef<LogoEntity>[]>(
//     () => [
//       {
//         header: `${entityName} `,
//         accessorKey: "logoPhoto",
//         footer: "",
//         cell: ({ getValue, row }) => (
//           <img
//             src={getValue() as string}
//             alt="Logo Photo"
//             className={`w-12 h-12 mx-auto ${
//               row.original.isActive ? "opacity-100" : "opacity-50"
//             }`}
//           />
//         ),
//       },
//       {
//         header: "Actions",
//         footer: "",
//         cell: ({ row }) => (
//           <div className="flex justify-start space-x-8">
//             <button
//               type="button"
//               title="Delete Logo"
//               aria-label="Delete"
//               onClick={() => handleDeleteEntity(row.original.id)}
//               className="text-red-500 rounded-md"
//             >
//               <FaTrash className="h-5 w-5" />
//             </button>
//             <button
//               type="button"
//               onClick={() => handleToggleEntityStatus(row.original.id)}
//               className={`rounded-md ${
//                 row.original.isActive ? "text-green-700" : "text-gray-500"
//               }`}
//               title={row.original.isActive ? "Active Logo" : "De-active Logo"}
//             >
//               {row.original.isActive ? (
//                 <FaToggleOn className="h-5 w-5" />
//               ) : (
//                 <FaToggleOff className="h-5 w-5" />
//               )}
//             </button>
//           </div>
//         ),
//       },
//     ],
//     [entityName]
//   );

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const file = files[0];
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const base64String = reader.result as string;
//           setNewEntityName(base64String);
//         };
//         reader.readAsDataURL(file);
//         setFile(file);
//       } else {
//         alert("Please upload a valid image file.");
//       }
//     }
//   };

//   return (
//     <div className="entityDiv">
//       <div className="entitySubDiv min-w-2xl">
//         <h2 className="landingPageHeading text-center">{entityName} Manager</h2>

//         {/* Add Entity Form */}
//         <div className="addEditFormInput">
//           <div className="flex-grow">
//             <FileInputField
//               label={"Upload Logo"}
//               name={"logoPhoto"}
//               accept="image/*"
//               value={file}
//               onChange={(e) => {
//                 handleFileChange(e);
//                 setError(null); // Clear the error message
//               }}
//               className={`border-r-0 rounded-r-none ${
//                 error ? "border-red-500" : ""
//               }`}
//             />
//           </div>
//           <button
//             type="button"
//             aria-label="Add"
//             onClick={() => {
//               handleAddEntity();
//               setFile(null); // Clear the file input
//             }}
//             className="entityAddButton w-1/10"
//           >
//             <FaPlus /> {entityName}
//           </button>
//           {error && (
//             <p className="-mt-14 pl-2 absolute text-red-500 flex text-base justify-start">
//               {error}
//             </p>
//           )}
//         </div>

//         {/* Entities Table */}
//         <DataTable columns={columns} data={entities} />
//       </div>
//     </div>
//   );
// };

// export default EntityManagerLogo;

import React, { useState, useEffect, useMemo } from "react";
import { FaToggleOn, FaToggleOff, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { LogoEntity } from "./types";
import { FileInputField } from "./FileInputField";
import DataTable from "./DataTable";
import { useLogoStore } from "../stores/store";

type EntityManagerLogoProps = {
  entityName: string;
};

const EntityManagerLogo: React.FC<EntityManagerLogoProps> = ({
  entityName,
}) => {
  const {
    entities,
    fetchEntities,
    addEntity,
    deleteEntity,
    toggleEntityStatus,
  } = useLogoStore();

  const [newEntityName, setNewEntityName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  const handleAddEntity = async () => {
    if (!newEntityName.trim()) {
      setError(`${entityName} Name can't be empty.`);
      return;
    }
    try {
      await addEntity({ logoPhoto: newEntityName, isActive: true });
      setNewEntityName("");
      setError(null);
    } catch (error) {
      console.error(`Error adding ${entityName}:`, error);
    }
  };

  const handleDeleteEntity = async (id: number) => {
    try {
      await deleteEntity(id);
    } catch (error) {
      console.error(`Error deleting ${entityName}:`, error);
    }
  };

  const handleToggleEntityStatus = async (id: number) => {
    try {
      await toggleEntityStatus(id);
    } catch (error) {
      console.error(`Error toggling ${entityName} status:`, error);
    }
  };

  const columns = useMemo<ColumnDef<LogoEntity>[]>(
    () => [
      {
        header: `${entityName} `,
        accessorKey: "logoPhoto",
        footer: "",
        cell: ({ getValue, row }) => (
          <img
            src={getValue() as string}
            alt="Logo Photo"
            className={`w-12 h-12 mx-auto ${
              row.original.isActive ? "opacity-100" : "opacity-50"
            }`}
          />
        ),
      },
      {
        header: "Actions",
        footer: "",
        cell: ({ row }) => (
          <div className="flex justify-start space-x-8">
            <button
              type="button"
              title="Delete Logo"
              aria-label="Delete"
              onClick={() => handleDeleteEntity(row.original.id)}
              className="text-red-500 rounded-md"
            >
              <FaTrash className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => handleToggleEntityStatus(row.original.id)}
              className={`rounded-md ${
                row.original.isActive ? "text-green-700" : "text-gray-500"
              }`}
              title={row.original.isActive ? "Active Logo" : "De-active Logo"}
            >
              {row.original.isActive ? (
                <FaToggleOn className="h-5 w-5" />
              ) : (
                <FaToggleOff className="h-5 w-5" />
              )}
            </button>
          </div>
        ),
      },
    ],
    [entityName]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setNewEntityName(base64String);
        };
        reader.readAsDataURL(file);
        setFile(file);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  return (
    <div className="entityDiv">
      <div className="entitySubDiv min-w-2xl">
        <h2 className="landingPageHeading text-center">{entityName} Manager</h2>

        {/* Add Entity Form */}
        <div className="addEditFormInput">
          <div className="flex-grow">
            <FileInputField
              label={"Upload Logo"}
              name={"logoPhoto"}
              accept="image/*"
              value={file}
              onChange={(e) => {
                handleFileChange(e);
                setError(null); // Clear the error message
              }}
              className={`border-r-0 rounded-r-none ${
                error ? "border-red-500" : ""
              }`}
            />
          </div>
          <button
            type="button"
            aria-label="Add"
            onClick={() => {
              handleAddEntity();
              setFile(null); // Clear the file input
            }}
            className="entityAddButton w-1/10"
          >
            <FaPlus /> {entityName}
          </button>
          {error && (
            <p className="-mt-14 pl-2 absolute text-red-500 flex text-base justify-start">
              {error}
            </p>
          )}
        </div>

        {/* Entities Table */}
        <DataTable
          columns={columns}
          data={entities}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </div>
    </div>
  );
};

export default EntityManagerLogo;