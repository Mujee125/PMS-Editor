
// import React, { useState, useEffect, useMemo } from 'react';
// import { FaToggleOn, FaToggleOff, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
// import { ColumnDef } from '@tanstack/react-table';
// import { Section } from './types';
// import { InputField } from './InputField';
// import DataTable from './DataTable';
// import { useSectionStore } from '../stores/store'; // Import the Zustand store

// type EntityManagerSectionProps = {
//   entityName: string;
// };

// const EntityManagerSection: React.FC<EntityManagerSectionProps> = ({
//   entityName,
// }) => {
//   // Use Zustand store
//   const {
//     sections,
//     fetchSections,
//     addSection,
//     updateSection,
//     deleteSection,
//     toggleSectionStatus,
//   } = useSectionStore();

//   const [newEntityName, setNewEntityName] = useState('');
//   const [editEntityId, setEditEntityId] = useState<number | null>(null);
//   const [editEntityName, setEditEntityName] = useState('');
//   const [hideAddButton, setHideAddButton] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch sections on component mount
//   useEffect(() => {
//     fetchSections();
//   }, [fetchSections]);

//   // Handle adding a new section
//   const handleAddEntity = async () => {
//     if (!newEntityName.trim()) {
//       setError(`${entityName} Name can't be empty.`);
//       return;
//     }
//     try {
//       await addSection(newEntityName);
//       setNewEntityName('');
//       setError(null);
//       setHideAddButton(true);
//     } catch (error) {
//       console.error(`Error adding ${entityName}:`, error);
//     }
//   };

//   // Handle editing a section
//   const handleEditEntity = (entity: Section) => {
//     setEditEntityId(entity.id);
//     setEditEntityName(entity.section);
//     setHideAddButton(false);
//   };

//   // Handle updating a section
//   const handleUpdateEntity = async () => {
//     if (!editEntityId || !editEntityName.trim()) {
//       alert(`${entityName} name cannot be empty.`);
//       return;
//     }
//     try {
//       await updateSection(editEntityId, editEntityName);
//       setEditEntityId(null);
//       setEditEntityName('');
//       setHideAddButton(true);
//     } catch (error) {
//       console.error(`Error updating ${entityName}:`, error);
//     }
//   };

//   // Handle deleting a section
//   const handleDeleteEntity = async (id: number) => {
//     try {
//       await deleteSection(id);
//     } catch (error) {
//       console.error(`Error deleting ${entityName}:`, error);
//     }
//   };

//   // Handle toggling section status
//   const handleToggleEntityStatus = async (id: number) => {
//     try {
//       await toggleSectionStatus(id);
//     } catch (error) {
//       console.error(`Error toggling ${entityName} status:`, error);
//     }
//   };

//    const handleAddEntityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === "Enter") {
//         handleAddEntity();
//       }
//     };
  
//     // Handle Enter key press for Update Entity
//     const handleUpdateEntityKeyDown = (
//       e: React.KeyboardEvent<HTMLInputElement>
//     ) => {
//       if (e.key === "Enter") {
//         handleUpdateEntity();
//       }
//     };

//   // Define columns for the data table
//   const columns = useMemo<ColumnDef<Section>[]>(
//     () => [
//       {
//         header: `${entityName} Name`,
//         accessorKey: 'section',
//       },
//       {
//         header: 'Actions',
//         cell: ({ row }) => (
//           <div className="flex justify-start space-x-8">
//             <button
//               title="Edit Section"
//               type="button"
//               aria-label="Edit"
//               onClick={() => handleEditEntity(row.original)}
//               className="text-blue-500 px-2"
//             >
//               <FaEdit className="h-5 w-5" />
//             </button>
//             <button
//               title="Delete Section"
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
//               title={row.original.isActive ? 'Active Section' : 'De-active Section'}
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
//                 onKeyDown={handleAddEntityKeyDown}
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
//                 label="Edit Section Name"
//                 name="entityName"
//                 value={editEntityName}
//                 onChange={(e) => setEditEntityName(e.target.value)}
//                 onKeyDown={handleUpdateEntityKeyDown}
//                 className={`border-r-0 rounded-r-none`}
//               />
//             </div>
//             <button
//               onClick={handleUpdateEntity}
//               className="entityAddButton"
//             >
//               Update
//             </button>
//           </div>
//         )}

//         {/* Entities Table */}
//         <DataTable columns={columns} data={sections} />
//       </div>
//     </div>
//   );
// };

// export default EntityManagerSection;


import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FaToggleOn,
  FaToggleOff,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { Section } from "./types";
import { InputField } from "./InputField";
import DataTable from "./DataTable";
import { useSectionStore } from "../stores/store"; // Import the Zustand store

type EntityManagerSectionProps = {
  entityName: string;
};

const EntityManagerSection: React.FC<EntityManagerSectionProps> = ({
  entityName,
}) => {
  // Use Zustand store
  const {
    sections,
    fetchSections,
    addSection,
    updateSection,
    deleteSection,
    toggleSectionStatus,
  } = useSectionStore();

  const [newEntityName, setNewEntityName] = useState("");
  const [editEntityId, setEditEntityId] = useState<number | null>(null);
  const [editEntityName, setEditEntityName] = useState("");
  const [hideAddButton, setHideAddButton] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  // Fetch sections on component mount
  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  // Handle adding a new section
  const handleAddEntity = async () => {
    if (!newEntityName.trim()) {
      setError(`${entityName} Name can't be empty.`);
      return;
    }
    try {
      await addSection(newEntityName);
      setNewEntityName("");
      setError(null);
      await fetchSections();
      setHideAddButton(true);
    } catch (error) {
      console.error(`Error adding ${entityName}:`, error);
    }
  };

  // Handle editing a section
  const handleEditEntity = (entity: Section) => {
    setEditEntityId(entity.id);
    setEditEntityName(entity.section);
    setHideAddButton(false);
  };

  // Handle updating a section
  const handleUpdateEntity = async () => {
    if (!editEntityId || !editEntityName.trim()) {
      alert(`${entityName} name cannot be empty.`);
      return;
    }
    try {
      await updateSection(editEntityId, editEntityName);
      setEditEntityId(null);
      setEditEntityName("");
      setHideAddButton(true);
      await fetchSections();
    } catch (error) {
      console.error(`Error updating ${entityName}:`, error);
    }
  };

  // Handle deleting a section
  const handleDeleteEntity = useCallback(
    async (id: number) => {
      try {
        await deleteSection(id);
        await fetchSections();
      } catch (error) {
        console.error(`Error deleting ${entityName}:`, error);
      }
    },
    [deleteSection, fetchSections]
  );

  // Handle toggling section status
  const handleToggleEntityStatus = useCallback(
    async (id: number) => {
      try {
        await toggleSectionStatus(id);
      } catch (error) {
        console.error(`Error toggling ${entityName} status:`, error);
      }
    },
    [toggleSectionStatus, fetchSections]
  );

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

  // Define columns for the data table
  const columns = useMemo<ColumnDef<Section>[]>(
    () => [
      {
        header: `${entityName} Name`,
        accessorKey: "section",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-start space-x-8">
            <button
              title="Edit Section"
              type="button"
              aria-label="Edit"
              onClick={() => handleEditEntity(row.original)}
              className="text-blue-500 px-2"
            >
              <FaEdit className="h-5 w-5" />
            </button>
            <button
              title="Delete Section"
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
              title={
                row.original.isActive ? "Active Section" : "De-active Section"
              }
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
                onKeyDown={handleAddEntityKeyDown}
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
                label="Edit Section Name"
                name="entityName"
                value={editEntityName}
                onChange={(e) => setEditEntityName(e.target.value)}
                onKeyDown={handleUpdateEntityKeyDown}
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
          data={sections}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </div>
    </div>
  );
};

export default EntityManagerSection;