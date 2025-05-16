
// import React, { useState, useEffect, useMemo } from "react";
// import { FaToggleOn, FaToggleOff, FaEdit, FaTrash } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa6";
// import { ColumnDef } from "@tanstack/react-table";
// import { SubjectEntity } from "./types";
// import { InputField } from "./InputField";
// import DataTable from "./DataTable";
// import { useSubjectStore } from "../stores/store";

// type EntityManagerSubjectProps = {
//   entityName: string;
// };

// const EntityManagerSubject: React.FC<EntityManagerSubjectProps> = ({
//   entityName,
// }) => {
//   const {
//     entities,
//     fetchEntities,
//     addEntity,
//     updateEntity,
//     deleteEntity,
//     toggleEntityStatus,
//   } = useSubjectStore();

//   const [newEntityName, setNewEntityName] = useState("");
//   const [editEntityId, setEditEntityId] = useState<number | null>(null);
//   const [editEntityName, setEditEntityName] = useState("");
//   const [hideAddButton, setHideAddButton] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchEntities();
//   }, [fetchEntities]);

//   const handleAddEntity = async () => {
//     if (!newEntityName.trim()) {
//       setError(`${entityName} Name can't be empty.`);
//       return;
//     }
//     try {
//       await addEntity(newEntityName);
//       setNewEntityName("");
//       setError(null);
//     } catch (error) {
//       console.error(`Error adding ${entityName}:`, error);
//     }
//   };

//   const handleEditEntity = (entity: SubjectEntity) => {
//     setEditEntityId(entity.id);
//     setEditEntityName(entity.subject);
//     setHideAddButton(false);
//   };

//   const handleUpdateEntity = async () => {
//     if (!editEntityId || !editEntityName.trim()) {
//       alert(`${entityName} name cannot be empty.`);
//       return;
//     }
//     try {
//       await updateEntity(editEntityId, editEntityName);
//       setEditEntityId(null);
//       setEditEntityName("");
//       setHideAddButton(true);
//     } catch (error) {
//       console.error(`Error updating ${entityName}:`, error);
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

//    const handleAddEntityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Enter") {
//           handleAddEntity();
//         }
//       };
    
//       // Handle Enter key press for Update Entity
//       const handleUpdateEntityKeyDown = (
//         e: React.KeyboardEvent<HTMLInputElement>
//       ) => {
//         if (e.key === "Enter") {
//           handleUpdateEntity();
//         }
//       };

//   const columns = useMemo<ColumnDef<SubjectEntity>[]>(
//     () => [
//       {
//         header: `${entityName} Name`,
//         accessorKey: "subject",
//       },
//       {
//         header: "Actions",
//         cell: ({ row }) => (
//           <div className="flex justify-start space-x-8">
//             <button
//               title="Edit Subject"
//               type="button"
//               aria-label="Edit"
//               onClick={() => handleEditEntity(row.original)}
//               className="text-blue-500 px-2"
//             >
//               <FaEdit className="h-5 w-5" />
//             </button>
//             <button
//               title="Delete Subject"
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
//               title={
//                 row.original.isActive ? "Active Subject" : "De-active Subject"
//               }
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
//         <h2 className="text-center landingPageHeading">{entityName} Manager</h2>

//         {/* Add Entity Form */}
//         {hideAddButton && (
//           <div className="addEditFormInput">
//             <div className="flex-grow">
//               <InputField
//                 label={entityName + " Name"}
//                 name={"entityName"}
//                 value={newEntityName}
//                 onChange={(e) => {
//                   setNewEntityName(e.target.value);
//                   setError(null);
//                 }}
//                 onKeyDown={handleAddEntityKeyDown}
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
//                 label={"Edit Class Name"}
//                 name={"entityName"}
//                 value={editEntityName}
//                 onChange={(e) => setEditEntityName(e.target.value)}
//                 onKeyDown={handleUpdateEntityKeyDown}
//                 className={`border-r-0 rounded-r-none `}
//               />
//             </div>

//             <button
//               onClick={() => {
//                 handleUpdateEntity();
//                 setHideAddButton(true);
//                 setError(null);
//               }}
//               className="entityAddButton"
//             >
//               Update
//             </button>
//           </div>
//         )}

//         {/* Entities Table */}
//         <DataTable columns={columns} data={entities} />
//       </div>
//     </div>
//   );
// };

// export default EntityManagerSubject;


import React, { useState, useEffect, useMemo } from "react";
import { FaToggleOn, FaToggleOff, FaEdit, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { ColumnDef } from "@tanstack/react-table";
import { SubjectEntity } from "./types";
import { InputField } from "./InputField";
import DataTable from "./DataTable";
import { useSubjectPaginationStore, useSubjectStore } from "../stores/store";

type EntityManagerSubjectProps = {
  entityName: string;
};

const EntityManagerSubject: React.FC<EntityManagerSubjectProps> = ({
  entityName,
}) => {
  const {
    entities,
    fetchEntities,
    addEntity,
    updateEntity,
    deleteEntity,
    toggleEntityStatus,
  } = useSubjectStore();

  const [newEntityName, setNewEntityName] = useState("");
  const [editEntityId, setEditEntityId] = useState<number | null>(null);
  const [editEntityName, setEditEntityName] = useState("");
  const [hideAddButton, setHideAddButton] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { pageIndex, setPageIndex } = useSubjectPaginationStore();

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  const handleAddEntity = async () => {
    if (!newEntityName.trim()) {
      setError(`${entityName} Name can't be empty.`);
      return;
    }
    try {
      await addEntity(newEntityName);
      setNewEntityName("");
      setError(null);
    } catch (error) {
      console.error(`Error adding ${entityName}:`, error);
    }
  };

  const handleEditEntity = (entity: SubjectEntity) => {
    setEditEntityId(entity.id);
    setEditEntityName(entity.subject);
    setHideAddButton(false);
  };

  const handleUpdateEntity = async () => {
    if (!editEntityId || !editEntityName.trim()) {
      alert(`${entityName} name cannot be empty.`);
      return;
    }
    try {
      await updateEntity(editEntityId, editEntityName);
      setEditEntityId(null);
      setEditEntityName("");
      setHideAddButton(true);
    } catch (error) {
      console.error(`Error updating ${entityName}:`, error);
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

  const columns = useMemo<ColumnDef<SubjectEntity>[]>(
    () => [
      {
        header: `${entityName} Name`,
        accessorKey: "subject",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-start space-x-8">
            <button
              title="Edit Subject"
              type="button"
              aria-label="Edit"
              onClick={() => handleEditEntity(row.original)}
              className="text-blue-500 px-2"
            >
              <FaEdit className="h-5 w-5" />
            </button>
            <button
              title="Delete Subject"
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
                row.original.isActive ? "Active Subject" : "De-active Subject"
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
        <h2 className="text-center landingPageHeading">{entityName} Manager</h2>

        {/* Add Entity Form */}
        {hideAddButton && (
          <div className="addEditFormInput">
            <div className="flex-grow">
              <InputField
                label={entityName + " Name"}
                name={"entityName"}
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
                label={"Edit Class Name"}
                name={"entityName"}
                value={editEntityName}
                onChange={(e) => setEditEntityName(e.target.value)}
                onKeyDown={handleUpdateEntityKeyDown}
                className={`border-r-0 rounded-r-none `}
              />
            </div>

            <button
              onClick={() => {
                handleUpdateEntity();
                setHideAddButton(true);
                setError(null);
              }}
              className="entityAddButton"
            >
              Update
            </button>
          </div>
        )}

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

export default EntityManagerSubject;