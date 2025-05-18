// import React, { useState } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   getPaginationRowModel,
//   ColumnDef,
//   getFilteredRowModel,
//   FilterFn,
// } from "@tanstack/react-table";
// import {
//   FaBackward,
//   FaStepBackward,
//   FaStepForward,
//   FaForward,
// } from "react-icons/fa";
// import { IoMdSearch } from "react-icons/io";

// interface DataTableProps<T> {
//   columns: ColumnDef<T>[];
//   data: T[];
//   showSearchBox?: boolean;
//   className?: string;
// }

// // Custom filter function
// const customFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
//   const value = row.getValue(columnId);

//   // Handle numeric values
//   if (typeof value === "number") {
//     return value.toString().includes(filterValue);
//   }

//   // Handle string values (case-insensitive)
//   if (typeof value === "string") {
//     return value.toLowerCase().includes(filterValue.toLowerCase());
//   }

//   // Handle other data types (e.g., boolean, dates)
//   return String(value).toLowerCase().includes(filterValue.toLowerCase());
// };

// const DataTable = <T,>({
//   columns,
//   data,
//   showSearchBox,
//   className,
// }: DataTableProps<T>) => {
//   const [globalFilter, setGlobalFilter] = useState("");

//   const table = useReactTable({
//     columns,
//     data,
//     state: { globalFilter },
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     globalFilterFn: customFilterFn, // Apply custom filter function globally
//     initialState: {
//       pagination: { pageSize: 10 }, // Default rows per page
//     },
//   });

//   return (
//     <div className={`flex flex-col h-[71vh] rounded-md ${className}`}>
//       {/* Search Box */}
//       {showSearchBox && (
//         <div className="relative mb-4 group w-full">
//           <input
//             value={globalFilter}
//             onChange={(e) => setGlobalFilter(e.target.value.trim())} // Trim whitespace
//             placeholder="Search..."
//             className="p-2 border border-[#cfd3d8] rounded-md w-full text-base pl-10 focus:outline-none focus:ring-1 focus:ring-[#2684ff] hover:border-[#2684ff] transition duration-300 ease-in-out"
//           />
//           <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-hover:text-[#2684ff]" />
//         </div>
//       )}

//       {/* Scrollable Table Container */}
//       <div className={`flex-grow overflow-auto min-h-0`}>
//         <table className="w-full border-collapse">
//           {/* Table Header */}
//           <thead className="sticky top-0 z-10 border-b-2 border-[lightgray] bg-blue-50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id} className="border-none">
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="border-none py-2 px-4 text-left"
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr
//                 key={row.id}
//                 className="hover:bg-gray-50 border-b border-[#f1f2f3] h-[40px]"
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="border-none px-4 py-1">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Fixed Pagination Bar */}
//       <div className="sticky bottom-0 text-[#888] bg-white border-t-2 z-20 border-[lightgray] flex justify-end items-center space-x-4">
//         {/* Page Info */}
//         <span className="ml-4">
//           Page {table.getState().pagination.pageIndex + 1} of{" "}
//           {table.getPageCount()}
//         </span>

//         {/* Pagination Controls */}
//         <div className="flex items-center space-x-1">
//           <button
//             title="Go to first page"
//             onClick={() => table.setPageIndex(0)}
//             disabled={!table.getCanPreviousPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaBackward />
//           </button>
//           <button
//             title="Go to previous page"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaStepBackward />
//           </button>
//           <button
//             title="Go to next page"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaStepForward />
//           </button>
//           <button
//             title="Go to last page"
//             onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//             disabled={!table.getCanNextPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaForward />
//           </button>

//           {/* Rows per Page Selector */}
//           <select
//             title="Rows per page"
//             value={table.getState().pagination.pageSize}
//             onChange={(e) => table.setPageSize(Number(e.target.value))}
//             className="bg-transparent outline-none border-none ml-4"
//           >
//             {[5, 10, 20, 30, 40, 50].map((size) => (
//               <option key={size} value={size}>
//                 Show Rows {size}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataTable;

// import React, { useState } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   getPaginationRowModel,
//   ColumnDef,
//   getFilteredRowModel,
//   FilterFn,
// } from "@tanstack/react-table";
// import {
//   FaBackward,
//   FaStepBackward,
//   FaStepForward,
//   FaForward,
// } from "react-icons/fa";
// import { IoMdSearch } from "react-icons/io";

// interface DataTableProps<T> {
//   columns: ColumnDef<T>[];
//   data: T[];
//   showSearchBox?: boolean;
//   className?: string;
// }

// // Custom filter function
// const customFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
//   const value = row.getValue(columnId);

//   // Handle numeric values
//   if (typeof value === "number") {
//     return value.toString().includes(filterValue);
//   }

//   // Handle string values (case-insensitive)
//   if (typeof value === "string") {
//     return value.toLowerCase().includes(filterValue.toLowerCase());
//   }

//   // Handle other data types (e.g., boolean, dates)
//   return String(value).toLowerCase().includes(filterValue.toLowerCase());
// };

// const DataTable = <T,>({
//   columns,
//   data,
//   showSearchBox,
//   className,
// }: DataTableProps<T>) => {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [pageIndex, setPageIndex] = useState(0); // State to track current page index

//   const table = useReactTable({
//     columns,
//     data,
//     state: { globalFilter, pagination: { pageIndex, pageSize: 10 } },
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     globalFilterFn: customFilterFn, // Apply custom filter function globally
//   });

//   const handlePageChange = (newPageIndex: number) => {
//     setPageIndex(newPageIndex);
//     table.setPageIndex(newPageIndex);
//   };

//   return (
//     <div className={`flex flex-col h-[71vh] rounded-md ${className}`}>
//       {/* Search Box */}
//       {showSearchBox && (
//         <div className="relative mb-4 group w-full">
//           <input
//             value={globalFilter}
//             onChange={(e) => setGlobalFilter(e.target.value.trim())} // Trim whitespace
//             placeholder="Search..."
//             className="p-2 border border-[#cfd3d8] rounded-md w-full text-base pl-10 focus:outline-none focus:ring-1 focus:ring-[#2684ff] hover:border-[#2684ff] transition duration-300 ease-in-out"
//           />
//           <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-hover:text-[#2684ff]" />
//         </div>
//       )}

//       {/* Scrollable Table Container */}
//       <div className={`flex-grow overflow-auto min-h-0`}>
//         <table className="w-full border-collapse">
//           {/* Table Header */}
//           <thead className="sticky top-0 z-10 border-b-2 border-[lightgray] bg-blue-50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id} className="border-none">
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="border-none py-2 px-4 text-left"
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr
//                 key={row.id}
//                 className="hover:bg-gray-50 border-b border-[#f1f2f3] h-[40px]"
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="border-none px-4 py-1">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Fixed Pagination Bar */}
//       <div className="sticky bottom-0 text-[#888] bg-white border-t-2 z-20 border-[lightgray] flex justify-end items-center space-x-4">
//         {/* Page Info */}
//         <span className="ml-4">
//           Page {pageIndex + 1} of {table.getPageCount()}
//         </span>

//         {/* Pagination Controls */}
//         <div className="flex items-center space-x-1">
//           <button
//             title="Go to first page"
//             onClick={() => handlePageChange(0)}
//             disabled={!table.getCanPreviousPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaBackward />
//           </button>
//           <button
//             title="Go to previous page"
//             onClick={() => handlePageChange(pageIndex - 1)}
//             disabled={!table.getCanPreviousPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaStepBackward />
//           </button>
//           <button
//             title="Go to next page"
//             onClick={() => handlePageChange(pageIndex + 1)}
//             disabled={!table.getCanNextPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaStepForward />
//           </button>
//           <button
//             title="Go to last page"
//             onClick={() => handlePageChange(table.getPageCount() - 1)}
//             disabled={!table.getCanNextPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaForward />
//           </button>

//           {/* Rows per Page Selector */}
//           <select
//             title="Rows per page"
//             value={table.getState().pagination.pageSize}
//             onChange={(e) => {
//               table.setPageSize(Number(e.target.value));
//               handlePageChange(0); // Reset to first page when changing page size
//             }}
//             className="bg-transparent outline-none border-none ml-4"
//           >
//             {[5, 10, 20, 30, 40, 50].map((size) => (
//               <option key={size} value={size}>
//                 Show Rows {size}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataTable;

// import React, { useState } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   getPaginationRowModel,
//   ColumnDef,
//   getFilteredRowModel,
//   FilterFn,
// } from "@tanstack/react-table";
// import {
//   FaBackward,
//   FaStepBackward,
//   FaStepForward,
//   FaForward,
// } from "react-icons/fa";
// import { IoMdSearch } from "react-icons/io";

// interface DataTableProps<T> {
//   columns: ColumnDef<T>[];
//   data: T[];
//   showSearchBox?: boolean;
//   className?: string;
// }

// // Custom filter function
// const customFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
//   const value = row.getValue(columnId);

//   // Handle numeric values
//   if (typeof value === "number") {
//     return value.toString().includes(filterValue);
//   }

//   // Handle string values (case-insensitive)
//   if (typeof value === "string") {
//     return value.toLowerCase().includes(filterValue.toLowerCase());
//   }

//   // Handle other data types (e.g., boolean, dates)
//   return String(value).toLowerCase().includes(filterValue.toLowerCase());
// };

// const DataTable = <T,>({
//   columns,
//   data,
//   showSearchBox,
//   className,
// }: DataTableProps<T>) => {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [pageIndex, setPageIndex] = useState(0); // State to track current page index
//   const [pageSize, setPageSize] = useState(10); // State to track page size

//   const table = useReactTable({
//     columns,
//     data,
//     state: { globalFilter, pagination: { pageIndex, pageSize } },
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     globalFilterFn: customFilterFn, // Apply custom filter function globally
//   });

//   const handlePageChange = (newPageIndex: number) => {
//     setPageIndex(newPageIndex);
//     table.setPageIndex(newPageIndex);
//   };

//   const handlePageSizeChange = (newPageSize: number) => {
//     setPageSize(newPageSize); // Update page size state
//     table.setPageSize(newPageSize); // Update table page size
//     setPageIndex(0); // Reset to the first page when page size changes
//     table.setPageIndex(0); // Reset table page index
//   };

//   return (
//     <div className={`flex flex-col h-[71vh] rounded-md ${className}`}>
//       {/* Search Box */}
//       {showSearchBox && (
//         <div className="relative mb-4 group w-full">
//           <input
//             value={globalFilter}
//             onChange={(e) => setGlobalFilter(e.target.value.trim())} // Trim whitespace
//             placeholder="Search..."
//             className="p-2 border border-[#cfd3d8] rounded-md w-full text-base pl-10 focus:outline-none focus:ring-1 focus:ring-[#2684ff] hover:border-[#2684ff] transition duration-300 ease-in-out"
//           />
//           <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-hover:text-[#2684ff]" />
//         </div>
//       )}

//       {/* Scrollable Table Container */}
//       <div
//         className={`flex-grow overflow-auto min-h-0 scrollbar-thin scrollbar-thumb-[#c3c3c3] scrollbar-track-white`}
//       >
//         <table className="w-full border-collapse">
//           {/* Table Header */}
//           <thead className="sticky top-0 z-10 border-b-2 border-[lightgray] bg-blue-50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id} className="border-none">
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="border-none py-2 px-4 text-left"
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr
//                 key={row.id}
//                 className="hover:bg-gray-50 border-b border-[#f1f2f3] h-[40px]"
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="border-none px-4 py-1">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Fixed Pagination Bar */}
//       <div className="sticky bottom-0 text-[#888] bg-white border-t-2 z-20 border-[lightgray] flex justify-end items-center space-x-4">
//         {/* Page Info */}
//         <span className="ml-4">
//           Page {pageIndex + 1} of {table.getPageCount()}
//         </span>

//         {/* Pagination Controls */}
//         <div className="flex items-center space-x-1">
//           <button
//             title="Go to first page"
//             onClick={() => handlePageChange(0)}
//             disabled={!table.getCanPreviousPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaBackward />
//           </button>
//           <button
//             title="Go to previous page"
//             onClick={() => handlePageChange(pageIndex - 1)}
//             disabled={!table.getCanPreviousPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaStepBackward />
//           </button>
//           <button
//             title="Go to next page"
//             onClick={() => handlePageChange(pageIndex + 1)}
//             disabled={!table.getCanNextPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaStepForward />
//           </button>
//           <button
//             title="Go to last page"
//             onClick={() => handlePageChange(table.getPageCount() - 1)}
//             disabled={!table.getCanNextPage()}
//             className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
//           >
//             <FaForward />
//           </button>

//           {/* Rows per Page Selector */}
//           <select
//             title="Rows per page"
//             value={pageSize}
//             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//             className="bg-transparent outline-none border-none ml-4"
//           >
//             {[5, 10, 20, 30, 40, 50].map((size) => (
//               <option key={size} value={size}>
//                 Show Rows {size}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataTable;

// ⁡⁣⁣⁢----------- working -------------⁡
import { useState, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type FilterFn,
  flexRender,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { IoMdSearch } from "react-icons/io";
import {
  FaBackward,
  FaStepBackward,
  FaStepForward,
  FaForward,
} from "react-icons/fa";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  showSearchBox?: boolean;
  className?: string;
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
}

// Custom filter function
const customFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  const value = row.getValue(columnId);

  // Handle numeric values
  if (typeof value === "number") {
    return value.toString().includes(filterValue);
  }

  // Handle string values (case-insensitive)
  if (typeof value === "string") {
    return value.toLowerCase().includes(filterValue.toLowerCase());
  }

  // Handle other data types
  return String(value).toLowerCase().includes(filterValue.toLowerCase());
};

const DataTable = <T,>({
  columns,
  data,
  showSearchBox,
  className,
  pageIndex,
  setPageIndex,
}: DataTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    columns,
    data,
    state: { globalFilter, pagination: { pageIndex, pageSize } },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: customFilterFn,
  });

  // Virtualizer setup
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    estimateSize: () => 50, // Average row height in pixels
    getScrollElement: () => tableContainerRef.current,
    overscan: 5, // Extra rows to render above/below visible area
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  // Calculate padding for virtual scrolling
  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows[virtualRows.length - 1]?.end || 0)
      : 0;

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    table.setPageSize(newPageSize);
    setPageIndex(0);
    table.setPageIndex(0);
  };

  return (
    <div className={`flex flex-col h-[71vh] rounded-md ${className}`}>
      {/* Search Box */}
      {showSearchBox && (
        <div className="relative mb-4 group w-full">
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value.trim())}
            placeholder="Search..."
            className="p-2 border border-[#cfd3d8] rounded-md w-full text-base pl-10 focus:outline-none focus:ring-1 focus:ring-[#2684ff] hover:border-[#2684ff] transition duration-300 ease-in-out"
          />
          <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-hover:text-[#2684ff]" />
        </div>
      )}

      {/* Scrollable Table Container */}
      <div
        ref={tableContainerRef}
        className={`flex-grow overflow-auto min-h-0 scrollbar-thin scrollbar-thumb-[#c3c3c3] scrollbar-track-white`}
      >
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead className="sticky top-0 z-10 border-b-2 border-[lightgray] bg-blue-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-none">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-none py-2 px-4 text-left"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Virtualized Table Body */}
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 border-b border-[#f1f2f3]"
                  style={{
                    height: "40px",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border-none px-4 py-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="sticky bottom-0 text-[#888] bg-white border-t-2 z-20 border-[lightgray] flex justify-end items-center space-x-4">
        {/* Page Info */}
        <span className="ml-4">
          Page {pageIndex + 1} of {table.getPageCount()}
        </span>

        {/* Pagination Buttons */}
        <div className="flex items-center space-x-1">
          <button
            title="Go to first page"
            onClick={() => handlePageChange(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
          >
            <FaBackward />
          </button>
          <button
            title="Go to previous page"
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
          >
            <FaStepBackward />
          </button>
          <button
            title="Go to next page"
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
          >
            <FaStepForward />
          </button>
          <button
            title="Go to last page"
            onClick={() => handlePageChange(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded border-none hover:text-blue-600 disabled:opacity-50"
          >
            <FaForward />
          </button>

          {/* Rows per Page Selector */}
          <select
            title="Rows per page"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="bg-transparent outline-none border-none ml-4"
          >
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataTable;


