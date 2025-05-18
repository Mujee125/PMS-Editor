

// ****************** ⁡⁢⁣⁢start of electron⁡ ********************

import { get } from "http";
import { EditorContentEntity, LogoEntity, StudentData } from "./subMenus/types";

import { contextBridge, ipcRenderer,shell } from "electron";

// Expose protected methods that allow the renderer process to use
console.log("Preload script loaded");
contextBridge.exposeInMainWorld("electron", {
  shell: {
    openPath: (path: string) => {
      console.log("Opening path:", path); // Debug statement
      return shell.openPath(path);
    },
  },

  // previewComponent: async (url: string, callback: (response: any) => void) => {
  //   const response = await ipcRenderer.invoke("previewComponent", url);
  //   callback(response);
  // },
  previewComponent: async (
    url: string,
    totalFiles: number,
    callback: (response: any) => void
  ) => {
    const response = await ipcRenderer.invoke(
      "previewComponent",
      url,
      totalFiles
    );
    callback(response);
  },
  minimize: (): void => ipcRenderer.send("window-minimize"),

  maximize: (): void => ipcRenderer.send("window-maximize"),

  close: (): void => ipcRenderer.send("window-close"),

  addStudent: (student: StudentData): Promise<void> =>
    ipcRenderer.invoke("add-student", student),

  // deleteStudentById: (student: StudentData): Promise<void> =>
  //   ipcRenderer.invoke("delete-by-id", student),

  deleteStudentById: (
    id: number
  ): Promise<{ success: boolean; error?: string }> =>
    ipcRenderer.invoke("delete-by-id", id),

  updateStudent: (id: string, student: StudentData): Promise<void> =>
    ipcRenderer.invoke("update-student", id, student),

  deleteSelectedStudents: (students: StudentData[]): Promise<void> => {
    const studentIds = students.map((student) => student.id);
    return ipcRenderer.invoke("delete-selected-students", studentIds);
  },

  getAllStudents: (): Promise<StudentData[]> =>
    ipcRenderer.invoke("get-all-students"),
  // getAllStudents: (offset = 0, limit = 500): Promise<StudentData[]> =>
  //   ipcRenderer.invoke("get-all-students", offset, limit),

  toggleStudentStatus: (id: number) =>
    ipcRenderer.invoke("toggle-student-status", id),
});



// ****************** ⁡⁢⁣⁢end of electron⁡ ********************

contextBridge.exposeInMainWorld("api", {
  // ⁡⁢⁣⁢adding entries functions⁡

  addClass: (className: string) => {
    if (!className) {
      console.error("No className provided to addClass");
    }
    return ipcRenderer.invoke("add-class", className);
  },

  addSection: (section: string) => {
    if (!section) {
      console.error("No section provided to addSection");
    }
    return ipcRenderer.invoke("add-section", section);
  },

  addSubject: (subject: string) => {
    if (!subject) {
      console.error("No subject provided to addSubject");
    }
    return ipcRenderer.invoke("add-subject", subject);
  },

  addTerm: (term: string) => {
    if (!term) {
      console.log("No term provided for saving");
    }
    return ipcRenderer.invoke("add-term", term);
  },

  addSession: (session: string) => {
    if (!session) {
      console.log("No session provided for saving");
    }
    return ipcRenderer.invoke("add-session", session);
  },

  addLogo: (logoPhoto: LogoEntity) => {
    if (!logoPhoto) {
      console.error("No Logo provided for saving");
    }
    return ipcRenderer.invoke("add-logo", logoPhoto);
  },

  addEditorContent: (editorContent: EditorContentEntity) => {
    if (!editorContent) {
      console.log("No Content is provided");
    }
    return ipcRenderer.invoke("add-editor-content", editorContent);
  },

  // ⁡⁢⁣⁢getting all entries functions⁡

  getClasses: () => ipcRenderer.invoke("get-classes"),

  getSections: () => ipcRenderer.invoke("get-sections"),

  getSubjects: () => ipcRenderer.invoke("get-subjects"),

  getLogo: () => ipcRenderer.invoke("get-logo"),

  getTerms: () => ipcRenderer.invoke("get-terms"),

  getSessions: () => ipcRenderer.invoke("get-sessions"),

  getEditorContent: () => ipcRenderer.invoke("get-editor-content"),

  getEditorContentById: (id: string) =>
    ipcRenderer.invoke("get-editor-content-by-id", id),

  // ⁡⁢⁣⁢updating entries⁡

  updateClass: (id: string, className: string) =>
    ipcRenderer.invoke("update-class", id, className),

  updateSection: (id: string, section: string) =>
    ipcRenderer.invoke("update-section", id, section),

  updateTerm: (id: string, term: string) => {
    ipcRenderer.invoke("update-term", id, term);
  },

  updateSession: (id: string, session: string) => {
    ipcRenderer.invoke("update-session", id, session);
  },

  updateSubject: (id: string, subject: string) => {
    ipcRenderer.invoke("update-subject", id, subject);
  },

  updateEditorContent: (id: string, editorContent: string) =>
    ipcRenderer.invoke("update-editor-content", id, editorContent),

  // ⁡⁢⁣⁢Deleting entities⁡

  deleteClass: (id: string) => ipcRenderer.invoke("delete-class", id),

  deleteSection: (id: string) => ipcRenderer.invoke("delete-section", id),

  deleteSubject: (id: string) => ipcRenderer.invoke("delete-subject", id),

  deleteLogo: (id: string) => ipcRenderer.invoke("delete-logo", id),

  deleteTerm: (id: string) => ipcRenderer.invoke("delete-term", id),

  deleteSession: (id: string) => ipcRenderer.invoke("delete-session", id),

  deleteEditorContent: (id: string) =>
    ipcRenderer.invoke("delete-editor-content", id),
  // ⁡⁢⁣⁢Toggling status⁡



  toggleClassStatus: (id: string) =>
    ipcRenderer.invoke("toggle-class-status", id),

  toggleSectionStatus: (id: string) =>
    ipcRenderer.invoke("toggle-section-status", id),

  toggleTermStatus: (id: string) =>
    ipcRenderer.invoke("toggle-term-status", id),

  toggleSessionStatus: (id: string) =>
    ipcRenderer.invoke("toggle-session-status", id),

  toggleSubjectStatus: (id: string) =>
    ipcRenderer.invoke("toggle-subject-status", id),

  toggleLogoStatus: (id: string) =>
    ipcRenderer.invoke("toggle-logo-status", id),

  toggleEditorContentStatus: (id: string) =>
    ipcRenderer.invoke("toggle-editor-content-status", id),
});
