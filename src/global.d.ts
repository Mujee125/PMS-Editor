export {};

declare global {
  interface Window {
    electron: WindowApi;
    api: API;
  }
}

declare module "react-table" {
  

  export interface TableState<D extends object> {
    filters: Array<{ id: string; value: any }>; // Ensure filters are properly defined
    // Other state properties as needed...
  }

  export interface TableInstance<D extends object> {
    setFilter: (columnId: string, filterValue: any) => void;
    // Include other methods and properties...
  }

  export interface UseTableOptions<D extends object> {
    columns: Array<{ Header: string; accessor: keyof D }>;
    data: D[];
    initialState?: Partial<TableState<D>>; // Use the TableState type
  }

  export function useTable<D extends object>(
    options: UseTableOptions<D>
  ): TableInstance<D>;

  export function useFilters<D extends object>(hook: any): any;
  export function useRowSelect(hook: any): any;

  
}

import "react-table";
import { TableInstance } from "react-table";

declare module "react-table" {
  export interface TableInstance<D> {
    getToggleAllRowsSelectedProps: () => any;
  }
}
// src/global.d.ts
declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}