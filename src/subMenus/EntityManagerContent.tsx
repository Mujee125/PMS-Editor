
// import React, { useState, useEffect, useMemo } from "react";
// import { FaToggleOn, FaToggleOff, FaEdit, FaTrash } from "react-icons/fa";
// import { ColumnDef } from "@tanstack/react-table";
// import htmlReactParser from "html-react-parser";
// import DataTable from "./DataTable";
// import RichSunEditor from "../editor/RichSunEditor";
// import { useContentStore } from "../stores/store";
// import { EditorContentEntity } from "./types";

// interface EntityManagerContentProps {
//   entityName: string;
//   onCancel: () => void;
// }

// const EntityManagerContent: React.FC<EntityManagerContentProps> = ({
//   entityName,
//   onCancel,
// }) => {
//   const {
//     entities,
//     fetchEntities,
//     updateEntity,
//     deleteEntity,
//     toggleEntityStatus,
//   } = useContentStore();

//   const [editEntity, setEditEntity] = useState<{
//     id: number | null;
//     name: string;
//     content: string;
//   }>({ id: null, name: "", content: "" });
//   const [showEditor, setShowEditor] = useState<boolean>(false);

//   useEffect(() => {
//     fetchEntities();
//   }, [fetchEntities]);

//   const handleEditEntity = async (entity: EditorContentEntity) => {
//     try {
//       const content = await window.api.getEditorContentById(entity.id);
//       if (content?.editorContent && content?.contentName) {
//         setEditEntity({
//           id: entity.id,
//           name: content.contentName,
//           content: content.editorContent,
//         });
//         setShowEditor(true);
//       } else {
//         console.error("No content found for the given ID");
//       }
//     } catch (error) {
//       console.error("Error fetching content:", error);
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

//   const columns = useMemo<ColumnDef<EditorContentEntity>[]>(
//     () => [
//       {
//         header: entityName,
//         accessorKey: "editorContent",
//         cell: ({ row }) => {
//           const { contentName, editorContent } = row.original;
//           const [isOpen, setIsOpen] = useState(false);
//           return (
//             <div>
//               <button
//                 type="button"
//                 onClick={() => setIsOpen(!isOpen)}
//                 className={`text-lg ${
//                   isOpen ? "text-[#0070e0]" : "hover:text-[#0070e0]"
//                 }`}
//               >
//                 {contentName}
//               </button>
//               {isOpen && (
//                 <div className="mt-2 p-2 border border-[#cfd3d8] rounded text-start">
//                   {htmlReactParser(editorContent)}
//                 </div>
//               )}
//             </div>
//           );
//         },
//       },
//       {
//         header: "Actions",
//         cell: ({ row }) => (
//           <div className="flex justify-start space-x-8">
//             <button
//               title="Edit Content"
//               onClick={() => handleEditEntity(row.original)}
//               className="text-blue-500 px-2"
//             >
//               <FaEdit className="h-5 w-5" />
//             </button>
//             <button
//               title="Delete Content"
//               onClick={() => handleDeleteEntity(row.original.id)}
//               className="text-red-500 px-2"
//             >
//               <FaTrash className="h-5 w-5" />
//             </button>
//             <button
//               onClick={() => handleToggleEntityStatus(row.original.id)}
//               className={`${
//                 row.original.isActive ? "text-green-700" : "text-gray-500"
//               } px-2`}
//               title={
//                 row.original.isActive ? "Active Content" : "De-active Content"
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
//       {showEditor && (
//         <RichSunEditor
//           content={editEntity.content}
//           contentName={editEntity.name}
//           saveContentToDatabase={async (content) => {
//             if (editEntity.id) {
//               await updateEntity(editEntity.id, content.editorContent);
//               setShowEditor(false);
//             } else {
//               console.error("editEntityId is null");
//             }
//           }}
//           onCancel={onCancel}
//         />
//       )}
//       <div className="entitySubDiv">
//         <h2 className="text-center landingPageHeading">All Question Papers</h2>
//         <DataTable columns={columns} data={entities} showSearchBox={true} />
//       </div>
//     </div>
//   );
// };

// export default EntityManagerContent;

import React, { useState, useEffect, useMemo } from "react";
import { FaToggleOn, FaToggleOff, FaEdit, FaTrash } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import htmlReactParser from "html-react-parser";
import DataTable from "./DataTable";
import RichSunEditor from "../editor/RichSunEditor";
import { useContentPaginationStore, useContentStore } from "../stores/store";
import { EditorContentEntity } from "./types";

interface EntityManagerContentProps {
  entityName: string;
  onCancel: () => void;
}

const EntityManagerContent: React.FC<EntityManagerContentProps> = ({
  entityName,
  onCancel,
}) => {
  const {
    entities,
    fetchEntities,
    updateEntity,
    deleteEntity,
    toggleEntityStatus,
  } = useContentStore();

  const [editEntity, setEditEntity] = useState<{
    id: number | null;
    name: string;
    content: string;
  }>({ id: null, name: "", content: "" });
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const { pageIndex, setPageIndex } = useContentPaginationStore();

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  const handleEditEntity = async (entity: EditorContentEntity) => {
    try {
      const content = await window.api.getEditorContentById(entity.id);
      if (content?.editorContent && content?.contentName) {
        setEditEntity({
          id: entity.id,
          name: content.contentName,
          content: content.editorContent,
        });
        setShowEditor(true);
      } else {
        console.error("No content found for the given ID");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
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

  const columns = useMemo<ColumnDef<EditorContentEntity>[]>(
    () => [
      {
        header: entityName,
        accessorKey: "editorContent",
        cell: ({ row }) => {
          const { contentName, editorContent } = row.original;
          const [isOpen, setIsOpen] = useState(false);
          return (
            <div>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`text-lg ${
                  isOpen ? "text-[#0070e0]" : "hover:text-[#0070e0]"
                }`}
              >
                {contentName}
              </button>
              {isOpen && (
                <div className="mt-2 p-2 border border-[#cfd3d8] rounded text-start">
                  {htmlReactParser(editorContent)}
                </div>
              )}
            </div>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-start space-x-8">
            <button
              title="Edit Content"
              onClick={() => handleEditEntity(row.original)}
              className="text-blue-500 px-2"
            >
              <FaEdit className="h-5 w-5" />
            </button>
            <button
              title="Delete Content"
              onClick={() => handleDeleteEntity(row.original.id)}
              className="text-red-500 px-2"
            >
              <FaTrash className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleToggleEntityStatus(row.original.id)}
              className={`${
                row.original.isActive ? "text-green-700" : "text-gray-500"
              } px-2`}
              title={
                row.original.isActive ? "Active Content" : "De-active Content"
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
      {showEditor && (
        <RichSunEditor
          content={editEntity.content}
          contentName={editEntity.name}
          saveContentToDatabase={async (content) => {
            if (editEntity.id) {
              await updateEntity(editEntity.id, content.editorContent);
              setShowEditor(false);
            } else {
              console.error("editEntityId is null");
            }
          }}
          onCancel={onCancel}
        />
      )}
      <div className="entitySubDiv">
        <h2 className="text-center landingPageHeading">All Question Papers</h2>
        <DataTable
          columns={columns}
          data={entities}
          showSearchBox={true}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </div>
    </div>
  );
};

export default EntityManagerContent;
