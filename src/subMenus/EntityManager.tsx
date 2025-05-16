
// import React, { useState, useCallback, useEffect, useMemo } from 'react';
// import { FaToggleOn, FaToggleOff, FaEdit, FaTrash } from 'react-icons/fa';
// import { FaPlus } from 'react-icons/fa6';
// import { ColumnDef } from '@tanstack/react-table';
// import { Class, Entity } from './types';
// import { InputField } from './InputField';
// import DataTable from './DataTable';
// import { useClassStore } from '../stores/store'; // Import the Zustand store

// type EntityManagerProps = {
//   entityName: string;
// };

// const EntityManager: React.FC<EntityManagerProps> = ({ entityName }) => {
//   const {
//     classes,
//     addClass,
//     updateClass,
//     deleteClass,
//     toggleClassStatus,
//     fetchClasses,
//   } = useClassStore();

//   const [newEntityName, setNewEntityName] = useState('');
//   const [editEntityId, setEditEntityId] = useState<number | null>(null);
//   const [editEntityName, setEditEntityName] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [hideAddButton, setHideAddButton] = useState<boolean>(true);

//   // Fetch entities on mount
//   useEffect(() => {
//     fetchClasses();
//   }, [fetchClasses]);

//   // Validate input to prevent unwanted characters
//   const sanitizeInput = (input: string) => input.trim();

//   const handleAddEntity = async () => {
//     const sanitizedInput = sanitizeInput(newEntityName);
//     if (!sanitizedInput) {
//       setError(`${entityName} Name can't be empty.`);
//       return;
//     }
//     try {
//       await addClass(sanitizedInput); // Use Zustand action
//       setNewEntityName('');
//       setError(null);
//       await fetchClasses(); // Refresh the list
//     } catch (error) {
//       console.error(`Error adding ${entityName}:`, error);
//     }
//   };

//   const handleEditEntity = useCallback((entity: Class) => {
//     setEditEntityId(entity.id);
//     setEditEntityName(entity.className);
//     setHideAddButton(false);
//   }, []);

//   const handleUpdateEntity = async () => {
//     const sanitizedInput = sanitizeInput(editEntityName);
//     if (!editEntityId || !sanitizedInput) {
//       alert(`${entityName} name cannot be empty.`);
//       return;
//     }
//     try {
//       await updateClass(editEntityId, sanitizedInput);
//       setEditEntityId(null);
//       setEditEntityName('');
//       setHideAddButton(true);
//       await fetchClasses(); // Refresh the list
//     } catch (error) {
//       console.error(`Error updating ${entityName}:`, error);
//     }
//   };

//   const handleDeleteEntity = useCallback(
//     async (id: number) => {
//       try {
//         await deleteClass(id); // Use Zustand action
//         await fetchClasses(); // Refresh the list
//       } catch (error) {
//         console.error(`Error deleting ${entityName}:`, error);
//       }
//     },
//     [deleteClass, fetchClasses]
//   );

//   const handleToggleEntityStatus = useCallback(
//     async (id: number) => {
//       try {
//         await toggleClassStatus(id); // Use Zustand action
//         await fetchClasses(); // Refresh the list
//       } catch (error) {
//         console.error(`Error toggling ${entityName} status:`, error);
//       }
//     },
//     [toggleClassStatus, fetchClasses]
//   );

//   const columns = useMemo<ColumnDef<Entity>[]>(
//     () => [
//       {
//         header: `${entityName} Name`,
//         accessorKey: 'className',
//       },
//       {
//         header: 'Actions',
//         cell: ({ row }) => (
//           <div className="flex justify-start space-x-8">
//             <button
//               title="Edit Class"
//               type="button"
//               aria-label="Edit"
//               onClick={() => handleEditEntity(row.original)}
//               className="text-blue-500 px-2"
//             >
//               <FaEdit className="h-5 w-5" />
//             </button>
//             <button
//               title="Delete Class"
//               type="button"
//               aria-label="Delete"
//               onClick={() => handleDeleteEntity(row.original.id)}
//               className="text-red-500 px-2"
//             >
//               <FaTrash className="h-5 w-5" />
//             </button>
//             <button
//               type="button"
//               onClick={() => handleToggleEntityStatus(row.original.id)}
//               className={`${
//                 row.original.isActive ? 'text-green-700' : 'text-gray-500'
//               } px-2`}
//               title={row.original.isActive ? 'Active Class' : 'De-active Class'}
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
//     [entityName, handleEditEntity, handleDeleteEntity, handleToggleEntityStatus]
//   );

//   return (
//     <div className="entityDiv">
//       <div className="entitySubDiv min-w-2xl">
//         <h2 className="landingPageHeading text-center">{entityName} Manager</h2>

//         {/* Add Entity Form */}
//         {hideAddButton && (
//           <div className="addEditFormInput">
//             <div className="flex-grow">
//               <InputField
//                 label={`${entityName} Name`}
//                 name="entityName"
//                 value={newEntityName}
//                 onChange={(e) => {
//                   setNewEntityName(e.target.value);
//                   setError(null);
//                 }}
//                 className={`border-r-0 rounded-r-none ${
//                   error ? 'border-red-500' : ''
//                 }`}
//               />
//             </div>
//             <button onClick={handleAddEntity} className="entityAddButton">
//               <FaPlus /> {entityName}
//             </button>
//             {error && (
//               <p className="-mt-14 pl-2 absolute text-red-500 flex text-base justify-start">
//                 {error}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Edit Entity Form */}
//         {editEntityId && (
//           <div className="addEditFormInput">
//             <div className="flex-grow">
//               <InputField
//                 label="Edit Class Name"
//                 name="entityName"
//                 value={editEntityName}
//                 onChange={(e) => setEditEntityName(e.target.value)}
//                 className={`border-r-0 rounded-r-none`}
//               />
//             </div>
//             <button onClick={handleUpdateEntity} className="entityAddButton">
//               Update
//             </button>
//           </div>
//         )}

//         {/* Entities Table */}
//         <div className="entityTableDiv">
//           <DataTable columns={columns} data={classes} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EntityManager;


// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import { FaToggleOn, FaToggleOff, FaEdit, FaTrash } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa6";
// import { ColumnDef } from "@tanstack/react-table";
// import { Class, Entity } from "./types";
// import { InputField } from "./InputField";
// import DataTable from "./DataTable";
// import { useClassStore } from "../stores/store"; // Import the Zustand store

// type EntityManagerProps = {
//   entityName: string;
// };

// const EntityManager: React.FC<EntityManagerProps> = ({ entityName }) => {
//   const {
//     classes,
//     addClass,
//     updateClass,
//     deleteClass,
//     toggleClassStatus,
//     fetchClasses,
//   } = useClassStore();

//   const [newEntityName, setNewEntityName] = useState("");
//   const [editEntityId, setEditEntityId] = useState<number | null>(null);
//   const [editEntityName, setEditEntityName] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [hideAddButton, setHideAddButton] = useState<boolean>(true);

//   // Fetch entities on mount
//   useEffect(() => {
//     fetchClasses();
//   }, [fetchClasses]);

//   // Validate input to prevent unwanted characters
//   const sanitizeInput = (input: string) => input.trim();

//   const handleAddEntity = async () => {
//     const sanitizedInput = sanitizeInput(newEntityName);
//     if (!sanitizedInput) {
//       setError(`${entityName} Name can't be empty.`);
//       return;
//     }
//     try {
//       await addClass(sanitizedInput); // Use Zustand action
//       setNewEntityName("");
//       setError(null);
//       await fetchClasses(); // Refresh the list
//     } catch (error) {
//       console.error(`Error adding ${entityName}:`, error);
//     }
//   };

//   const handleEditEntity = useCallback((entity: Class) => {
//     setEditEntityId(entity.id);
//     setEditEntityName(entity.className);
//     setHideAddButton(false);
//   }, []);

//   const handleUpdateEntity = async () => {
//     const sanitizedInput = sanitizeInput(editEntityName);
//     if (!editEntityId || !sanitizedInput) {
//       alert(`${entityName} name cannot be empty.`);
//       return;
//     }
//     try {
//       await updateClass(editEntityId, sanitizedInput);
//       setEditEntityId(null);
//       setEditEntityName("");
//       setHideAddButton(true);
//       await fetchClasses();
//     } catch (error) {
//       console.error(`Error updating ${entityName}:`, error);
//     }
//   };

//   const handleDeleteEntity = useCallback(
//     async (id: number) => {
//       try {
//         await deleteClass(id); // Use Zustand action
//         await fetchClasses(); // Refresh the list
//       } catch (error) {
//         console.error(`Error deleting ${entityName}:`, error);
//       }
//     },
//     [deleteClass, fetchClasses]
//   );

//   const handleToggleEntityStatus = useCallback(
//     async (id: number) => {
//       try {
//         await toggleClassStatus(id); // Use Zustand action
//         await fetchClasses(); // Refresh the list
//       } catch (error) {
//         console.error(`Error toggling ${entityName} status:`, error);
//       }
//     },
//     [toggleClassStatus, fetchClasses]
//   );

//   // Handle Enter key press for Add Entity
//   const handleAddEntityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleAddEntity();
//     }
//   };

//   // Handle Enter key press for Update Entity
//   const handleUpdateEntityKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     if (e.key === "Enter") {
//       handleUpdateEntity();
//     }
//   };

//   const columns = useMemo<ColumnDef<Entity>[]>(
//     () => [
//       {
//         header: `${entityName} Name`,
//         accessorKey: "className",
//       },
//       {
//         header: "Actions",
//         cell: ({ row }) => (
//           <div className="flex justify-start space-x-8">
//             <button
//               title="Edit Class"
//               type="button"
//               aria-label="Edit"
//               onClick={() => handleEditEntity(row.original)}
//               className="text-blue-500 px-2"
//             >
//               <FaEdit className="h-5 w-5" />
//             </button>
//             <button
//               title="Delete Class"
//               type="button"
//               aria-label="Delete"
//               onClick={() => handleDeleteEntity(row.original.id)}
//               className="text-red-500 px-2"
//             >
//               <FaTrash className="h-5 w-5" />
//             </button>
//             <button
//               type="button"
//               onClick={() => handleToggleEntityStatus(row.original.id)}
//               className={`${
//                 row.original.isActive ? "text-green-700" : "text-gray-500"
//               } px-2`}
//               title={row.original.isActive ? "Active Class" : "De-active Class"}
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
//     [entityName, handleEditEntity, handleDeleteEntity, handleToggleEntityStatus]
//   );

//   return (
//     <div className="entityDiv">
//       <div className="entitySubDiv">
//         <h2 className="landingPageHeading text-center">{entityName} Manager</h2>

//         {/* Add Entity Form */}
//         {hideAddButton && (
//           <div className="addEditFormInput">
//             <div className="flex-grow">
//               <InputField
//                 label={`${entityName} Name`}
//                 name="entityName"
//                 value={newEntityName}
//                 onChange={(e) => {
//                   setNewEntityName(e.target.value);
//                   setError(null);
//                 }}
//                 onKeyDown={handleAddEntityKeyDown} // Handle Enter key for Add
//                 className={`border-r-0 rounded-r-none ${
//                   error ? "border-red-500" : ""
//                 }`}
//               />
//             </div>
//             <button onClick={handleAddEntity} className="entityAddButton">
//               <FaPlus /> {entityName}
//             </button>
//             {error && (
//               <p className="-mt-14 pl-2 absolute text-red-500 flex text-base justify-start">
//                 {error}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Edit Entity Form */}
//         {editEntityId && (
//           <div className="addEditFormInput">
//             <div className="flex-grow">
//               <InputField
//                 label="Edit Class Name"
//                 name="entityName"
//                 value={editEntityName}
//                 onChange={(e) => setEditEntityName(e.target.value)}
//                 onKeyDown={handleUpdateEntityKeyDown} // Handle Enter key for Update
//                 className={`border-r-0 rounded-r-none`}
//               />
//             </div>
//             <button onClick={handleUpdateEntity} className="entityAddButton">
//               Update
//             </button>
//           </div>
//         )}

//         {/* Entities Table */}
       
//           <DataTable columns={columns} data={classes} />
        
//       </div>
//     </div>
//   );
// };

// export default EntityManager;

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { FaToggleOn, FaToggleOff, FaEdit, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { ColumnDef } from "@tanstack/react-table";
import { Class, Entity } from "./types";
import { InputField } from "./InputField";
import DataTable from "./DataTable";
import { useClassPaginationStore, useClassStore } from "../stores/store"; // Import the Zustand store

type EntityManagerProps = {
  entityName: string;
};

const EntityManager: React.FC<EntityManagerProps> = ({ entityName }) => {
  const {
    classes,
    addClass,
    updateClass,
    deleteClass,
    toggleClassStatus,
    fetchClasses,
  } = useClassStore();

  const [newEntityName, setNewEntityName] = useState("");
  const [editEntityId, setEditEntityId] = useState<number | null>(null);
  const [editEntityName, setEditEntityName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [hideAddButton, setHideAddButton] = useState<boolean>(true);
  const { pageIndex, setPageIndex } = useClassPaginationStore();

  // Fetch entities on mount
  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  // Validate input to prevent unwanted characters
  const sanitizeInput = (input: string) => input.trim();

  const handleAddEntity = async () => {
    const sanitizedInput = sanitizeInput(newEntityName);
    if (!sanitizedInput) {
      setError(`${entityName} Name can't be empty.`);
      return;
    }
    try {
      await addClass(sanitizedInput); // Use Zustand action
      setNewEntityName("");
      setError(null);
      await fetchClasses(); // Refresh the list
    } catch (error) {
      console.error(`Error adding ${entityName}:`, error);
    }
  };

  const handleEditEntity = useCallback((entity: Class) => {
    setEditEntityId(entity.id);
    setEditEntityName(entity.className);
    setHideAddButton(false);
  }, []);

  const handleUpdateEntity = async () => {
    const sanitizedInput = sanitizeInput(editEntityName);
    if (!editEntityId || !sanitizedInput) {
      alert(`${entityName} name cannot be empty.`);
      return;
    }
    try {
      await updateClass(editEntityId, sanitizedInput);
      setEditEntityId(null);
      setEditEntityName("");
      setHideAddButton(true);
      await fetchClasses();
    } catch (error) {
      console.error(`Error updating ${entityName}:`, error);
    }
  };

  const handleDeleteEntity = useCallback(
    async (id: number) => {
      try {
        await deleteClass(id); // Use Zustand action
        await fetchClasses(); // Refresh the list
      } catch (error) {
        console.error(`Error deleting ${entityName}:`, error);
      }
    },
    [deleteClass, fetchClasses]
  );

  const handleToggleEntityStatus = useCallback(
    async (id: number) => {
      try {
        await toggleClassStatus(id); // Use Zustand action
        await fetchClasses(); // Refresh the list
      } catch (error) {
        console.error(`Error toggling ${entityName} status:`, error);
      }
    },
    [toggleClassStatus, fetchClasses]
  );

  // Handle Enter key press for Add Entity
  const handleAddEntityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddEntity();
    }
  };

  // Handle Enter key press for Update Entity
  const handleUpdateEntityKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleUpdateEntity();
    }
  };

  const columns = useMemo<ColumnDef<Entity>[]>(
    () => [
      {
        header: `${entityName} Name`,
        accessorKey: "className",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-start space-x-8">
            <button
              title="Edit Class"
              type="button"
              aria-label="Edit"
              onClick={() => handleEditEntity(row.original)}
              className="text-blue-500 px-2"
            >
              <FaEdit className="h-5 w-5" />
            </button>
            <button
              title="Delete Class"
              type="button"
              aria-label="Delete"
              onClick={() => handleDeleteEntity(row.original.id)}
              className="text-red-500 px-2"
            >
              <FaTrash className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => handleToggleEntityStatus(row.original.id)}
              className={`${
                row.original.isActive ? "text-green-700" : "text-gray-500"
              } px-2`}
              title={row.original.isActive ? "Active Class" : "De-active Class"}
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
    [entityName, handleEditEntity, handleDeleteEntity, handleToggleEntityStatus]
  );

  return (
    <div className="entityDiv">
      <div className="entitySubDiv">
        <h2 className="landingPageHeading text-center">{entityName} Manager</h2>

        {/* Add Entity Form */}
        {hideAddButton && (
          <div className="addEditFormInput">
            <div className="flex-grow">
              <InputField
                label={`${entityName} Name`}
                name="entityName"
                value={newEntityName}
                onChange={(e) => {
                  setNewEntityName(e.target.value);
                  setError(null);
                }}
                onKeyDown={handleAddEntityKeyDown} // Handle Enter key for Add
                className={`border-r-0 rounded-r-none ${
                  error ? "border-red-500" : ""
                }`}
              />
            </div>
            <button onClick={handleAddEntity} className="entityAddButton">
              <FaPlus /> {entityName}
            </button>
            {error && (
              <p className="-mt-14 pl-2 absolute text-red-500 flex text-base justify-start">
                {error}
              </p>
            )}
          </div>
        )}

        {/* Edit Entity Form */}
        {editEntityId && (
          <div className="addEditFormInput">
            <div className="flex-grow">
              <InputField
                label="Edit Class Name"
                name="entityName"
                value={editEntityName}
                onChange={(e) => setEditEntityName(e.target.value)}
                onKeyDown={handleUpdateEntityKeyDown} // Handle Enter key for Update
                className={`border-r-0 rounded-r-none`}
              />
            </div>
            <button onClick={handleUpdateEntity} className="entityAddButton">
              Update
            </button>
          </div>
        )}

        {/* Entities Table */}

        <DataTable
          columns={columns}
          data={classes}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </div>
    </div>
  );
};

export default EntityManager;