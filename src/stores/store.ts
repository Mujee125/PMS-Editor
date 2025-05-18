

// import {
//   Class,
//   Section,
//   StudentData,
//   EditorContentEntity,
//   LogoEntity,
//   SessionEntity,
//   SubjectEntity,
//   TermEntity
// } from "../subMenus/types";
// import { create } from "zustand";

// // ⁡⁣⁣⁢class  store⁡

// interface ClassState {
//   classes: Class[];
//   addClass: (className: string) => Promise<void>;
//   updateClass: (id: number, className: string) => Promise<void>;
//   deleteClass: (id: number) => Promise<void>;
//   toggleClassStatus: (id: number) => Promise<void>;
//   fetchClasses: () => Promise<void>;
// }

// export const useClassStore = create<ClassState>((set) => ({
//   classes: [],

//   // Add a new class
//   addClass: async (className) => {
//     try {
//       // Call the API to add the class
//       await window.api.addClass(className);

//       // Fetch the updated list of classes
//       const updatedClasses = await window.api.getClasses();
//       set({ classes: updatedClasses });
//     } catch (error) {
//       console.error("Failed to add class:", error);
//     }
//   },

//   // Update an existing class
//   updateClass: async (id, className) => {
//     try {
//       // Call the API to update the class
//       await window.api.updateClass(id, className);

//       // Fetch the updated list of classes
//       const updatedClasses = await window.api.getClasses();
//       set({ classes: updatedClasses });
//     } catch (error) {
//       console.error("Failed to update class:", error);
//     }
//   },

//   // Delete a class
//   deleteClass: async (id) => {
//     try {
//       // Call the API to delete the class
//       await window.api.deleteClass(id);

//       // Fetch the updated list of classes
//       const updatedClasses = await window.api.getClasses();
//       set({ classes: updatedClasses });
//     } catch (error) {
//       console.error("Failed to delete class:", error);
//     }
//   },

//   // Fetch all classes
//   fetchClasses: async () => {
//     try {
//       const classes = await window.api.getClasses();
//       set({ classes });
//     } catch (error) {
//       console.error("Failed to fetch classes:", error);
//     }
//   },
//   // Toggle class status
//   toggleClassStatus: async (id) => {
//     try {
//       // Call the API to toggle the class status
//       await window.api.toggleClassStatus(id);

//       // Fetch the updated list of classes
//       const updatedClasses = await window.api.getClasses();
//       set({ classes: updatedClasses });
//     } catch (error) {
//       console.error("Failed to toggle class status:", error);
//     }
//   },
// }));

// // ⁡⁣⁣⁢student  store⁡

// interface StudentState {
//   students: StudentData[];
//   addStudent: (data: Omit<StudentData, "id">) => Promise<void>;
//   deleteStudent: (student: StudentData) => Promise<void>;
//   updateStudent: (id: number, data: Omit<StudentData, "id">) => Promise<void>;
//   fetchStudents: () => Promise<void>;
//   toggleStudentStatus: (id: number) => Promise<void>;

// }

// export const useStudentStore = create<StudentState>((set) => ({
//   students: [],

//   // Add a new student
//   addStudent: async (data) => {
//     try {
//       // Call the API to add the student
//       const newStudent = await window.electron.addStudent(data);

//       // Update the state with the new student
//       set((state) => ({ students: [...state.students, newStudent] }));

//       // Optionally, fetch the latest students to ensure the state is up-to-date
//       const updatedStudents = await window.electron.getAllStudents();
//       set({ students: updatedStudents });

     
//     } catch (error) {
//       console.error("Failed to add student:", error);
//     }
//   },

//   // Delete a student
//   deleteStudent: async (s: StudentData) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete ${s.name}?`
//     );

//     if (!confirmDelete) {
//       return;
//     }
//     try {
//       await window.electron.deleteStudentById(s.id);
//       set((state) => ({
//         students: state.students.filter((student) => student.id !== s.id),
//       }));
//       console.log("Student deleted successfully");
//     } catch (error) {
//       console.error("Unexpected error: ", error);
//       alert("An unexpected error occurred while deleting the student");
//     }
//   },
//   // Update an existing student
//   updateStudent: async (id, data) => {
//     try {
//       // Call the API to update the student
//       await window.electron.updateStudent(id, data);

//       // Update the state with the updated student
//       set((state) => ({
//         students: state.students.map((student) =>
//           student.id === id ? { ...student, ...data } : student
//         ),
//       }));

//       console.log("Student updated successfully");

//       // Navigate to the student table to view the updated student
//     } catch (error) {
//       console.error("Failed to update student:", error);
//     }
//   },
//   // Fetch all students
//   fetchStudents: async () => {
//     try {
//       const students = await window.electron.getAllStudents();
//       set({ students });
//     } catch (error) {
//       console.error("Failed to fetch students:", error);
//     }
//   },

//   // Toggle student status
//   toggleStudentStatus: async (id) => {
//     try {
//       await window.electron.toggleStudentStatus(id);
//       // Call the API to toggle the student status
//       const updatedStudents = await window.electron.getAllStudents();
//       set({ students: updatedStudents });
//     } catch (error) {
//       console.error("Failed to toggle student status:", error);
//     }
//   }
// }));

// // ⁡⁣⁣⁢section store⁡

// interface SectionState {
//   sections: Section[];
//   fetchSections: () => Promise<void>;
//   addSection: (sectionName: string) => Promise<void>;
//   updateSection: (id: number, sectionName: string) => Promise<void>;
//   deleteSection: (id: number) => Promise<void>;
//   toggleSectionStatus: (id: number) => Promise<void>;
// }

// export const useSectionStore = create<SectionState>((set) => ({
//   sections: [],

//   // Fetch all sections
//   fetchSections: async () => {
//     try {
//       const sections = await window.api.getSections();
//       set({ sections });
//     } catch (error) {
//       console.error("Failed to fetch sections:", error);
//     }
//   },

//   // Add a new section
//   addSection: async (sectionName) => {
//     try {
//       // Call the API to add the section
//       await window.api.addSection(sectionName);

//       // Fetch the updated list of sections
//       const updatedSections = await window.api.getSections();
//       set({ sections: updatedSections });
//     } catch (error) {
//       console.error("Failed to add section:", error);
//     }
//   },

//   // Update an existing section
//   updateSection: async (id, sectionName) => {
//     try {
//       // Call the API to update the section
//       await window.api.updateSection(id, sectionName);

//       // Fetch the updated list of sections
//       const updatedSections = await window.api.getSections();
//       set({ sections: updatedSections });
//     } catch (error) {
//       console.error("Failed to update section:", error);
//     }
//   },

//   // Delete a section
//   deleteSection: async (id) => {
//     try {
//       // Call the API to delete the section
//       await window.api.deleteSection(id);

//       // Fetch the updated list of sections
//       const updatedSections = await window.api.getSections();
//       set({ sections: updatedSections });
//     } catch (error) {
//       console.error("Failed to delete section:", error);
//     }
//   },

//   // Toggle section status
//   toggleSectionStatus: async (id) => {
//     try {
//       // Call the API to toggle the section status
//       await window.api.toggleSectionStatus(id);

//       // Fetch the updated list of sections
//       const updatedSections = await window.api.getSections();
//       set({ sections: updatedSections });
//     } catch (error) {
//       console.error("Failed to toggle section status:", error);
//     }
//   },
// }));


// // ⁡⁣⁣⁢session Store⁡




// interface SessionState {
//   entities: SessionEntity[];
//   fetchEntities: () => Promise<void>;
//   addEntity: (name: string) => Promise<void>;
//   updateEntity: (id: number, name: string) => Promise<void>;
//   deleteEntity: (id: number) => Promise<void>;
//   toggleEntityStatus: (id: number) => Promise<void>;
// }

// export const useSessionStore = create<SessionState>((set) => ({
//   entities: [],

//   // Fetch all session entities
//   fetchEntities: async () => {
//     try {
//       const entities = await window.api.getSessions();
//       set({ entities });
//     } catch (error) {
//       console.error("Failed to fetch session entities:", error);
//     }
//   },

//   // Add a new session entity
//   addEntity: async (name) => {
//     try {
//       await window.api.addSession(name);
//       const updatedEntities = await window.api.getSessions();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to add session entity:", error);
//     }
//   },

//   // Update an existing session entity
//   updateEntity: async (id, name) => {
//     try {
//       await window.api.updateSession(id, name);
//       const updatedEntities = await window.api.getSessions();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to update session entity:", error);
//     }
//   },

//   // Delete a session entity
//   deleteEntity: async (id) => {
//     try {
//       await window.api.deleteSession(id);
//       const updatedEntities = await window.api.getSessions();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to delete session entity:", error);
//     }
//   },

//   // Toggle session entity status
//   toggleEntityStatus: async (id) => {
//     try {
//       await window.api.toggleSessionStatus(id);
//       const updatedEntities = await window.api.getSessions();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to toggle session entity status:", error);
//     }
//   },
// }));

// // ⁡⁣⁣⁢subject Store⁡




// interface SubjectState {
//   entities: SubjectEntity[];
//   fetchEntities: () => Promise<void>;
//   addEntity: (name: string) => Promise<void>;
//   updateEntity: (id: number, name: string) => Promise<void>;
//   deleteEntity: (id: number) => Promise<void>;
//   toggleEntityStatus: (id: number) => Promise<void>;
// }

// export const useSubjectStore = create<SubjectState>((set) => ({
//   entities: [],

//   // Fetch all subject entities
//   fetchEntities: async () => {
//     try {
//       const entities = await window.api.getSubjects();
//       set({ entities });
//     } catch (error) {
//       console.error("Failed to fetch subject entities:", error);
//     }
//   },

//   // Add a new subject entity
//   addEntity: async (name) => {
//     try {
//       await window.api.addSubject(name);
//       const updatedEntities = await window.api.getSubjects();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to add subject entity:", error);
//     }
//   },

//   // Update an existing subject entity
//   updateEntity: async (id, name) => {
//     try {
//       await window.api.updateSubject(id, name);
//       const updatedEntities = await window.api.getSubjects();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to update subject entity:", error);
//     }
//   },

//   // Delete a subject entity
//   deleteEntity: async (id) => {
//     try {
//       await window.api.deleteSubject(id);
//       const updatedEntities = await window.api.getSubjects();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to delete subject entity:", error);
//     }
//   },

//   // Toggle subject entity status
//   toggleEntityStatus: async (id) => {
//     try {
//       await window.api.toggleSubjectStatus(id);
//       const updatedEntities = await window.api.getSubjects();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to toggle subject entity status:", error);
//     }
//   },
// }));

// // ⁡⁣⁣⁢term Store⁡



// interface TermState {
//   entities: TermEntity[];
//   fetchEntities: () => Promise<void>;
//   addEntity: (name: string) => Promise<void>;
//   updateEntity: (id: number, name: string) => Promise<void>;
//   deleteEntity: (id: number) => Promise<void>;
//   toggleEntityStatus: (id: number) => Promise<void>;
// }

// export const useTermStore = create<TermState>((set) => ({
//   entities: [],

//   // Fetch all term entities
//   fetchEntities: async () => {
//     try {
//       const entities = await window.api.getTerms();
//       set({ entities });
//     } catch (error) {
//       console.error("Failed to fetch term entities:", error);
//     }
//   },

//   // Add a new term entity
//   addEntity: async (name) => {
//     try {
//       await window.api.addTerm(name);
//       const updatedEntities = await window.api.getTerms();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to add term entity:", error);
//     }
//   },

//   // Update an existing term entity
//   updateEntity: async (id, name) => {
//     try {
//       await window.api.updateTerm(id, name);
//       const updatedEntities = await window.api.getTerms();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to update term entity:", error);
//     }
//   },

//   // Delete a term entity
//   deleteEntity: async (id) => {
//     try {
//       await window.api.deleteTerm(id);
//       const updatedEntities = await window.api.getTerms();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to delete term entity:", error);
//     }
//   },

//   // Toggle term entity status
//   toggleEntityStatus: async (id) => {
//     try {
//       await window.api.toggleTermStatus(id);
//       const updatedEntities = await window.api.getTerms();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to toggle term entity status:", error);
//     }
//   },
// }));


// // ⁡⁣⁣⁢editing student store⁡

// interface EditingStudentState {
//   editingStudent: StudentData | null;
//   setEditingStudent: (student: StudentData | null) => void;
// }

// export const useEditingStudentStore = create<EditingStudentState>((set) => ({
//   editingStudent: null,
//   setEditingStudent: (student) => set({ editingStudent: student }),
// }));


// // ⁡⁣⁣⁢content Store⁡

// interface ContentState {
//   entities: EditorContentEntity[];
//   fetchEntities: () => Promise<void>;
//   addEntity: (entity: EditorContentEntity) => Promise<void>;
//   updateEntity: (id: number, content: string) => Promise<void>;
//   deleteEntity: (id: number) => Promise<void>;
//   toggleEntityStatus: (id: number) => Promise<void>;
// }

// export const useContentStore = create<ContentState>((set) => ({
//   entities: [],

//   // Fetch all entities
//   fetchEntities: async () => {
//     try {
//       const entities = await window.api.getEditorContent();
//       set({ entities });
//     } catch (error) {
//       console.error("Failed to fetch entities:", error);
//     }
//   },

//   // Add a new entity
//   addEntity: async (entity) => {
//     try {
//       await window.api.addEditorContent(entity);
//       const updatedEntities = await window.api.getEditorContent();
//       set({ entities: updatedEntities });
//       console.log("Entity added successfully from entityStore.ts");
//     } catch (error) {
//       console.error("Failed to add entity:", error);
//     }
//   },

//   // Update an existing entity
//   updateEntity: async (id, content) => {
//     try {
//       await window.api.updateEditorContent(id, content);
//       const updatedEntities = await window.api.getEditorContent();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to update entity:", error);
//     }
//   },

//   // Delete an entity
//   deleteEntity: async (id) => {
//     try {
//       await window.api.deleteEditorContent(id);
//       const updatedEntities = await window.api.getEditorContent();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to delete entity:", error);
//     }
//   },

//   // Toggle entity status
//   toggleEntityStatus: async (id) => {
//     try {
//       await window.api.toggleEditorContentStatus(id);
//       const updatedEntities = await window.api.getEditorContent();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to toggle entity status:", error);
//     }
//   },
// }));


// // ⁡⁣⁣⁢logoStore⁡

// interface LogoState {
//   entities: LogoEntity[];
//   fetchEntities: () => Promise<void>;
//   addEntity: (entity: Omit<LogoEntity, "id">) => Promise<void>;
//   deleteEntity: (id: number) => Promise<void>;
//   toggleEntityStatus: (id: number) => Promise<void>;
// }

// export const useLogoStore = create<LogoState>((set) => ({
//   entities: [],

//   // Fetch all logo entities
//   fetchEntities: async () => {
//     try {
//       const entities = await window.api.getLogo();
//       set({ entities });
//     } catch (error) {
//       console.error("Failed to fetch logo entities:", error);
//     }
//   },

//   // Add a new logo entity
//   addEntity: async (entity) => {
//     try {
//       await window.api.addLogo(entity);
//       const updatedEntities = await window.api.getLogo();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to add logo entity:", error);
//     }
//   },

//   // Delete a logo entity
//   deleteEntity: async (id) => {
//     try {
//       await window.api.deleteLogo(id);
//       const updatedEntities = await window.api.getLogo();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to delete logo entity:", error);
//     }
//   },

//   // Toggle logo entity status
//   toggleEntityStatus: async (id) => {
//     try {
//       await window.api.toggleLogoStatus(id);
//       const updatedEntities = await window.api.getLogo();
//       set({ entities: updatedEntities });
//     } catch (error) {
//       console.error("Failed to toggle logo entity status:", error);
//     }
//   },
// }));



import {
  Class,
  Section,
  StudentData,
  EditorContentEntity,
  LogoEntity,
  SessionEntity,
  SubjectEntity,
  TermEntity,
} from "../subMenus/types";
import { create } from "zustand";

// ⁡⁣⁣⁢class  store⁡

interface ClassState {
  classes: Class[];
  addClass: (className: string) => Promise<void>;
  updateClass: (id: number, className: string) => Promise<void>;
  deleteClass: (id: number) => Promise<void>;
  toggleClassStatus: (id: number) => Promise<void>;
  fetchClasses: () => Promise<void>;
}

export const useClassStore = create<ClassState>((set) => ({
  classes: [],

  // Add a new class
  addClass: async (className) => {
    try {
      // Call the API to add the class
      await window.api.addClass(className);

      // Fetch the updated list of classes
      const updatedClasses = await window.api.getClasses();
      set({ classes: updatedClasses });
    } catch (error) {
      console.error("Failed to add class:", error);
    }
  },

  // Update an existing class
  updateClass: async (id, className) => {
    try {
      // Call the API to update the class
      await window.api.updateClass(id, className);

      // Fetch the updated list of classes
      const updatedClasses = await window.api.getClasses();
      set({ classes: updatedClasses });
    } catch (error) {
      console.error("Failed to update class:", error);
    }
  },

  // Delete a class
  deleteClass: async (id) => {
    try {
      // Call the API to delete the class
      await window.api.deleteClass(id);

      // Fetch the updated list of classes
      const updatedClasses = await window.api.getClasses();
      set({ classes: updatedClasses });
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  },

  // Fetch all classes
  fetchClasses: async () => {
    try {
      const classes = await window.api.getClasses();
      set({ classes });
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  },
  // Toggle class status
  toggleClassStatus: async (id) => {
    try {
      // Call the API to toggle the class status
      await window.api.toggleClassStatus(id);

      // Fetch the updated list of classes
      const updatedClasses = await window.api.getClasses();
      set({ classes: updatedClasses });
    } catch (error) {
      console.error("Failed to toggle class status:", error);
    }
  },
}));

// ⁡⁣⁣⁢student  store⁡

interface StudentState {
  students: StudentData[];
  addStudent: (data: Omit<StudentData, "id">) => Promise<void>;
  deleteStudent: (student: StudentData) => Promise<void>;
  updateStudent: (id: number, data: Omit<StudentData, "id">) => Promise<void>;
  fetchStudents: () => Promise<void>;
  toggleStudentStatus: (id: number) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set) => ({
  students: [],

  // Add a new student
  addStudent: async (data) => {
    try {
      // Call the API to add the student
      const newStudent = await window.electron.addStudent(data);

      // Update the state with the new student
      set((state) => ({ students: [...state.students, newStudent] }));

      // Optionally, fetch the latest students to ensure the state is up-to-date
      const updatedStudents = await window.electron.getAllStudents();
      set({ students: updatedStudents });
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  },

  // Delete a student
  deleteStudent: async (s: StudentData) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${s.name}?`
    );

    if (!confirmDelete) {
      return;
    }
    try {
      await window.electron.deleteStudentById(s.id);
      set((state) => ({
        students: state.students.filter((student) => student.id !== s.id),
      }));
      console.log("Student deleted successfully");
    } catch (error) {
      console.error("Unexpected error: ", error);
      alert("An unexpected error occurred while deleting the student");
    }
  },
  // Update an existing student
  updateStudent: async (id, data) => {
    try {
      // Call the API to update the student
      await window.electron.updateStudent(id, data);

      // Update the state with the updated student
      set((state) => ({
        students: state.students.map((student) =>
          student.id === id ? { ...student, ...data } : student
        ),
      }));

      console.log("Student updated successfully");

      // Navigate to the student table to view the updated student
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  },
  // Fetch all students
  // fetchStudents: async () => {
  //   try {
  //     const offset = 0; // Define the offset value
  //     const limit = 0; // Define the limit value
  //     const students = await window.electron.getAllStudents(offset, limit);
  //     set({ students });
  //   } catch (error) {
  //     console.error("Failed to fetch students:", error);
  //   }
  // },

  // fetchStudents: async (offset = 0, limit = 0) => {
  //   try {
  //     const initialStudents = await window.electron.getAllStudents(
  //       offset,
  //       limit
  //     );
  //     set((state) => ({
  //       students:
  //         offset === 0
  //           ? initialStudents
  //           : [...state.students, ...initialStudents],
  //     }));
  //   } catch (error) {
  //     console.error("Failed to fetch students:", error);
  //   }
  // },
  fetchStudents: async () => {
    try {
      const students = await window.electron.getAllStudents();
      set({ students });
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  },
  // fetchStudents: async () => {
  //   try {
  //     // Fetch first 50 students for quick UI response
  //     const initialStudents = await window.electron.getAllStudents(0, 500);
  //     set({ students: initialStudents });

  //     // Fetch remaining students in the background
  //     window.electron.getAllStudents(500, 5000).then((fullData: StudentData[]) => {
  //       set((state) => ({ students: [...state.students, ...fullData] }));
  //     });
  //   } catch (error) {
  //     console.error("Failed to fetch students:", error);
  //   }
  // },

  // Toggle student status
  toggleStudentStatus: async (id) => {
    try {
      await window.electron.toggleStudentStatus(id);
      // Call the API to toggle the student status
      const updatedStudents = await window.electron.getAllStudents();
      set({ students: updatedStudents });
    } catch (error) {
      console.error("Failed to toggle student status:", error);
    }
  },
}));

// ⁡⁣⁣⁢section store⁡

interface SectionState {
  sections: Section[];
  addSection: (sectionName: string) => Promise<void>;
  updateSection: (id: number, sectionName: string) => Promise<void>;
  deleteSection: (id: number) => Promise<void>;
  toggleSectionStatus: (id: number) => Promise<void>;
  fetchSections: () => Promise<void>;
}

export const useSectionStore = create<SectionState>((set) => ({
  sections: [],

  // Add a new section
  addSection: async (sectionName) => {
    try {
      // Call the API to add the section
      await window.api.addSection(sectionName);

      // Fetch the updated list of sections
      const updatedSections = await window.api.getSections();
      set({ sections: updatedSections });
    } catch (error) {
      console.error("Failed to add section:", error);
    }
  },

  // Update an existing section
  updateSection: async (id, sectionName) => {
    try {
      // Call the API to update the section
      await window.api.updateSection(id, sectionName);

      // Fetch the updated list of sections
      const updatedSections = await window.api.getSections();
      set({ sections: updatedSections });
    } catch (error) {
      console.error("Failed to update section:", error);
    }
  },

  // Delete a section
  deleteSection: async (id) => {
    try {
      // Call the API to delete the section
      await window.api.deleteSection(id);

      // Fetch the updated list of sections
      const updatedSections = await window.api.getSections();
      set({ sections: updatedSections });
    } catch (error) {
      console.error("Failed to delete section:", error);
    }
  },

  // Fetch all sections
  fetchSections: async () => {
    try {
      const sections = await window.api.getSections();
      set({ sections });
    } catch (error) {
      console.error("Failed to fetch sections:", error);
    }
  },
  // Toggle section status
  toggleSectionStatus: async (id) => {
    try {
      // Call the API to toggle the section status
      await window.api.toggleSectionStatus(id);

      // Fetch the updated list of sections
      const updatedSections = await window.api.getSections();
      set({ sections: updatedSections });
    } catch (error) {
      console.error("Failed to toggle section status:", error);
    }
  },
}));

// ⁡⁣⁣⁢session Store⁡

interface SessionState {
  entities: SessionEntity[];
  fetchEntities: () => Promise<void>;
  addEntity: (name: string) => Promise<void>;
  updateEntity: (id: number, name: string) => Promise<void>;
  deleteEntity: (id: number) => Promise<void>;
  toggleEntityStatus: (id: number) => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  entities: [],

  // Fetch all session entities
  fetchEntities: async () => {
    try {
      const entities = await window.api.getSessions();
      set({ entities });
    } catch (error) {
      console.error("Failed to fetch session entities:", error);
    }
  },

  // Add a new session entity
  addEntity: async (name) => {
    try {
      await window.api.addSession(name);
      const updatedEntities = await window.api.getSessions();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to add session entity:", error);
    }
  },

  // Update an existing session entity
  updateEntity: async (id, name) => {
    try {
      await window.api.updateSession(id, name);
      const updatedEntities = await window.api.getSessions();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to update session entity:", error);
    }
  },

  // Delete a session entity
  deleteEntity: async (id) => {
    try {
      await window.api.deleteSession(id);
      const updatedEntities = await window.api.getSessions();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to delete session entity:", error);
    }
  },

  // Toggle session entity status
  toggleEntityStatus: async (id) => {
    try {
      await window.api.toggleSessionStatus(id);
      const updatedEntities = await window.api.getSessions();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to toggle session entity status:", error);
    }
  },
}));

// ⁡⁣⁣⁢subject Store⁡

interface SubjectState {
  entities: SubjectEntity[];
  fetchEntities: () => Promise<void>;
  addEntity: (name: string) => Promise<void>;
  updateEntity: (id: number, name: string) => Promise<void>;
  deleteEntity: (id: number) => Promise<void>;
  toggleEntityStatus: (id: number) => Promise<void>;
}

export const useSubjectStore = create<SubjectState>((set) => ({
  entities: [],

  // Fetch all subject entities
  fetchEntities: async () => {
    try {
      const entities = await window.api.getSubjects();
      set({ entities });
    } catch (error) {
      console.error("Failed to fetch subject entities:", error);
    }
  },

  // Add a new subject entity
  addEntity: async (name) => {
    try {
      await window.api.addSubject(name);
      const updatedEntities = await window.api.getSubjects();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to add subject entity:", error);
    }
  },

  // Update an existing subject entity
  updateEntity: async (id, name) => {
    try {
      await window.api.updateSubject(id, name);
      const updatedEntities = await window.api.getSubjects();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to update subject entity:", error);
    }
  },

  // Delete a subject entity
  deleteEntity: async (id) => {
    try {
      await window.api.deleteSubject(id);
      const updatedEntities = await window.api.getSubjects();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to delete subject entity:", error);
    }
  },

  // Toggle subject entity status
  toggleEntityStatus: async (id) => {
    try {
      await window.api.toggleSubjectStatus(id);
      const updatedEntities = await window.api.getSubjects();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to toggle subject entity status:", error);
    }
  },
}));

// ⁡⁣⁣⁢term Store⁡

interface TermState {
  entities: TermEntity[];
  fetchEntities: () => Promise<void>;
  addEntity: (name: string) => Promise<void>;
  updateEntity: (id: number, name: string) => Promise<void>;
  deleteEntity: (id: number) => Promise<void>;
  toggleEntityStatus: (id: number) => Promise<void>;
}

export const useTermStore = create<TermState>((set) => ({
  entities: [],

  // Fetch all term entities
  fetchEntities: async () => {
    try {
      const entities = await window.api.getTerms();
      set({ entities });
    } catch (error) {
      console.error("Failed to fetch term entities:", error);
    }
  },

  // Add a new term entity
  addEntity: async (name) => {
    try {
      await window.api.addTerm(name);
      const updatedEntities = await window.api.getTerms();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to add term entity:", error);
    }
  },

  // Update an existing term entity
  updateEntity: async (id, name) => {
    try {
      await window.api.updateTerm(id, name);
      const updatedEntities = await window.api.getTerms();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to update term entity:", error);
    }
  },

  // Delete a term entity
  deleteEntity: async (id) => {
    try {
      await window.api.deleteTerm(id);
      const updatedEntities = await window.api.getTerms();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to delete term entity:", error);
    }
  },

  // Toggle term entity status
  toggleEntityStatus: async (id) => {
    try {
      await window.api.toggleTermStatus(id);
      const updatedEntities = await window.api.getTerms();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to toggle term entity status:", error);
    }
  },
}));

// ⁡⁣⁣⁢editing student store⁡

interface EditingStudentState {
  editingStudent: StudentData | null;
  setEditingStudent: (student: StudentData | null) => void;
}

export const useEditingStudentStore = create<EditingStudentState>((set) => ({
  editingStudent: null,
  setEditingStudent: (student) => set({ editingStudent: student }),
}));

// ⁡⁣⁣⁢content Store⁡

interface ContentState {
  entities: EditorContentEntity[];
  fetchEntities: () => Promise<void>;
  addEntity: (entity: EditorContentEntity) => Promise<void>;
  updateEntity: (id: number, content: string) => Promise<void>;
  deleteEntity: (id: number) => Promise<void>;
  toggleEntityStatus: (id: number) => Promise<void>;
}

export const useContentStore = create<ContentState>((set) => ({
  entities: [],

  // Fetch all entities
  fetchEntities: async () => {
    try {
      const entities = await window.api.getEditorContent();
      set({ entities });
    } catch (error) {
      console.error("Failed to fetch entities:", error);
    }
  },

  // Add a new entity
  addEntity: async (entity) => {
    try {
      await window.api.addEditorContent(entity);
      const updatedEntities = await window.api.getEditorContent();
      set({ entities: updatedEntities });
      console.log("Entity added successfully from entityStore.ts");
    } catch (error) {
      console.error("Failed to add entity:", error);
    }
  },

  // Update an existing entity
  updateEntity: async (id, content) => {
    try {
      await window.api.updateEditorContent(id, content);
      const updatedEntities = await window.api.getEditorContent();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to update entity:", error);
    }
  },

  // Delete an entity
  deleteEntity: async (id) => {
    try {
      await window.api.deleteEditorContent(id);
      const updatedEntities = await window.api.getEditorContent();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to delete entity:", error);
    }
  },

  // Toggle entity status
  toggleEntityStatus: async (id) => {
    try {
      await window.api.toggleEditorContentStatus(id);
      const updatedEntities = await window.api.getEditorContent();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to toggle entity status:", error);
    }
  },
}));

// ⁡⁣⁣⁢logoStore⁡

interface LogoState {
  entities: LogoEntity[];
  fetchEntities: () => Promise<void>;
  addEntity: (entity: Omit<LogoEntity, "id">) => Promise<void>;
  deleteEntity: (id: number) => Promise<void>;
  toggleEntityStatus: (id: number) => Promise<void>;
}

export const useLogoStore = create<LogoState>((set) => ({
  entities: [],

  // Fetch all logo entities
  fetchEntities: async () => {
    try {
      const entities = await window.api.getLogo();
      set({ entities });
    } catch (error) {
      console.error("Failed to fetch logo entities:", error);
    }
  },

  // Add a new logo entity
  addEntity: async (entity) => {
    try {
      await window.api.addLogo(entity);
      const updatedEntities = await window.api.getLogo();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to add logo entity:", error);
    }
  },

  // Delete a logo entity
  deleteEntity: async (id) => {
    try {
      await window.api.deleteLogo(id);
      const updatedEntities = await window.api.getLogo();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to delete logo entity:", error);
    }
  },

  // Toggle logo entity status
  toggleEntityStatus: async (id) => {
    try {
      await window.api.toggleLogoStatus(id);
      const updatedEntities = await window.api.getLogo();
      set({ entities: updatedEntities });
    } catch (error) {
      console.error("Failed to toggle logo entity status:", error);
    }
  },
}));

interface StudentPaginationState {
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
}

export const useStudentPaginationStore = create<StudentPaginationState>(
  (set) => ({
    pageIndex: 0, // Default page index
    setPageIndex: (pageIndex) => set({ pageIndex }),
  })
);

interface ClassPaginationState {
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
}
export const useClassPaginationStore = create<ClassPaginationState>((set) => ({
  pageIndex: 0, // Default page index
  setPageIndex: (pageIndex) => set({ pageIndex }),
}));

interface SubjectPaginationState {
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
}
export const useSubjectPaginationStore = create<SubjectPaginationState>(
  (set) => ({
    pageIndex: 0, // Default page index
    setPageIndex: (pageIndex) => set({ pageIndex }),
  })
);

interface ContentPaginationState {
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
}
export const useContentPaginationStore = create<ContentPaginationState>(
  (set) => ({
    pageIndex: 0, // Default page index
    setPageIndex: (pageIndex) => set({ pageIndex }),
  })
);