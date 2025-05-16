
// import Database from "better-sqlite3";
// import { EditorContentEntity, LogoEntity, StudentData } from "./subMenus/types";

// // Database configuration
// const DB_NAME = process.env.DB_NAME || "students_db.db";

// class DatabaseManager {
//   private db: Database.Database;

//   constructor() {
//     this.db = new Database(DB_NAME);
//     this.db.pragma("foreign_keys = ON"); // Enable foreign key support
//     this.initializeTables();
//   }



//   /**
//    * Initialize database tables with normalized schema, foreign keys, and indexes.
//    */
//   initializeTables() {

//      try {
//       const createTableStmt = `
//       -- Enable foreign key support
//       PRAGMA foreign_keys = ON;

//       -- Classes Table
//       CREATE TABLE IF NOT EXISTS classes_tbl (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         className TEXT NOT NULL UNIQUE,
//         isActive INTEGER DEFAULT 1
//       );

//       -- Sections Table
//       CREATE TABLE IF NOT EXISTS sections_tbl (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         section TEXT NOT NULL UNIQUE,
//         isActive INTEGER DEFAULT 1
//       );

//       -- Students Table (with foreign keys)
//       CREATE TABLE IF NOT EXISTS students_tbl (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         classId INTEGER NOT NULL,
//         sectionId INTEGER NOT NULL,
//         registrationNumber TEXT NOT NULL UNIQUE,
//         profilePhoto TEXT,
//         isActive INTEGER DEFAULT 1,
//         FOREIGN KEY (classId) REFERENCES classes_tbl(id) ON DELETE CASCADE ON UPDATE CASCADE,
//         FOREIGN KEY (sectionId) REFERENCES sections_tbl(id) ON DELETE CASCADE ON UPDATE CASCADE
//       );

//       -- Subjects Table
//       CREATE TABLE IF NOT EXISTS subject_tbl (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         subject TEXT NOT NULL UNIQUE,
//         isActive INTEGER DEFAULT 1
//       );

//       -- Terms Table
//       CREATE TABLE IF NOT EXISTS term_tbl (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         term TEXT NOT NULL UNIQUE,
//         isActive INTEGER DEFAULT 1
//       );

//       -- Sessions Table
//       CREATE TABLE IF NOT EXISTS session_tbl (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         session TEXT NOT NULL UNIQUE,
//         isActive INTEGER DEFAULT 1
//       );

//       -- Logo Table
//       CREATE TABLE IF NOT EXISTS logo_tbl (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         logoPhoto TEXT,
//         isActive INTEGER DEFAULT 1
//       );

//       -- Content Table
//       CREATE TABLE IF NOT EXISTS content_tbl (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         contentName TEXT NOT NULL,
//         editorContent TEXT,
//         isActive INTEGER DEFAULT 1
//       );

//       -- Indexes for frequently queried columns
      
//       CREATE INDEX IF NOT EXISTS idx_classes_className ON classes_tbl(className);
//       CREATE INDEX IF NOT EXISTS idx_sections_section ON sections_tbl(section);
//       CREATE INDEX IF NOT EXISTS idx_students_registrationNumber ON students_tbl(registrationNumber);
  
//     `;
//       this.db.exec(createTableStmt);
//      } catch (error) {
//        console.error("Error initializing database tables:", error);
//        throw error;
//      }

   
//   }

//   /**
//    * Generic function to add an entry to any table.
//    */
//   addEntry(tableName: string, data: Record<string, unknown>) {
//     const columns = Object.keys(data).join(", ");
//     const placeholders = Object.keys(data)
//       .map(() => "?")
//       .join(", ");
//     const stmt = this.db.prepare(
//       `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`
//     );
//     const result = stmt.run(...Object.values(data));

//     return { id: result.lastInsertRowid, ...data };
//   }

//   /**
//    * Generic function to fetch all entries from any table.
//    */
//   getEntries(tableName: string, conditions: Record<string, unknown> = {}) {
//     const whereClause =
//       Object.keys(conditions).length > 0
//         ? `WHERE ${Object.keys(conditions)
//             .map((col) => `${col} = ?`)
//             .join(" AND ")}`
//         : "";
//     const stmt = this.db.prepare(`SELECT * FROM ${tableName} ${whereClause}`);
//     return stmt.all(...Object.values(conditions));
//   }

//   /**
//    * Generic function to fetch a specific entry by id from any table.
//    */
//   getEntryById(tableName: string, id: number) {
//     const stmt = this.db.prepare(`SELECT * FROM ${tableName} WHERE id = ?`);
//     return stmt.get(id);
//   }

//   /**
//    * Generic function to update an entry in any table.
//    */
//   updateEntry(tableName: string, id: number, updates: Record<string, unknown>) {
//     const setClause = Object.keys(updates)
//       .map((col) => `${col} = ?`)
//       .join(", ");
//     const stmt = this.db.prepare(
//       `UPDATE ${tableName} SET ${setClause} WHERE id = ?`
//     );
//     stmt.run(...Object.values(updates), id);
//   }

//   /**
//    * Generic function to delete an entry from any table.
//    */
//   // deleteEntry(tableName: string, id: number) {
//   //   const stmt = this.db.prepare(`DELETE FROM ${tableName} WHERE id = ?`);
//   //   stmt.run(id);
//   // }

//   deleteEntry(
//     tableName: string,
//     id: number
//   ): { success: boolean; error?: string } {
//     try {
//       const stmt = this.db.prepare(`DELETE FROM ${tableName} WHERE id = ?`);
//       const result = stmt.run(id);

//       // Check if any rows were affected
//       if (result.changes > 0) {
//         return { success: true }; // Deletion successful
//       } else {
//         return { success: false, error: "No student found with the given ID" }; // No rows deleted
//       }
//     } catch (error) {
//       console.error("Error deleting entry:", error);
//       return { success: false, error: (error as Error).message }; // Return the error message
//     }
//   }

//   /**
//    * Generic function to toggle a boolean status in any table.
//    */
//   toggleEntryStatus(tableName: string, id: number, statusColumn: string) {
//     const stmt = this.db.prepare(
//       `UPDATE ${tableName} SET ${statusColumn} = NOT ${statusColumn} WHERE id = ?`
//     );
//     stmt.run(id);
//   }

//   // Student-specific methods
//   // addStudent(studentData: Omit<StudentData, "id">) {
//   //   return this.addEntry("students_tbl", studentData);
//   // }

//   addStudent(studentData: Omit<StudentData, "id">) {
//     try {
//       const result = this.db.transaction(() => {
//         return this.addEntry("students_tbl", studentData);
//       })();
//       return result;
//     } catch (error: any) {
//       if (error.code === "SQLITE_CONSTRAINT") {
//         throw new Error(
//           "Student with this registration number already exists."
//         );
//       }
//       throw error;
//     }
//   }

//   updateStudent(id: number, studentData: Partial<Omit<StudentData, "id">>) {
//     this.updateEntry("students_tbl", id, studentData);
//   }

//   deleteStudentById(id: number): { success: boolean; error?: string } {
//     return this.deleteEntry("students_tbl", id);
//   }

//   getAllStudents(): StudentData[] {
//     return this.getEntries("students_tbl") as StudentData[];
//   }

//   getStudentById(id: number): StudentData | null {
//     return this.getEntryById("students_tbl", id) as StudentData | null;
//   }

//   toggleStudentStatus(id: number) {
//     this.toggleEntryStatus("students_tbl", id, "isActive");
//   }

//   // Class-specific methods
//   addClass(className: string) {
//     return this.addEntry("classes_tbl", { className, isActive: 1 });
//   }

//   updateClass(id: number, className: string) {
//     this.updateEntry("classes_tbl", id, { className });
//   }

//   deleteClass(id: number) {
//     this.deleteEntry("classes_tbl", id);
//   }

//   toggleClassStatus(id: number) {
//     this.toggleEntryStatus("classes_tbl", id, "isActive");
//   }

//   getClasses() {
//     return this.getEntries("classes_tbl");
//   }

//   // Section-specific methods
//   addSection(section: string) {
//     return this.addEntry("sections_tbl", { section, isActive: 1 });
//   }

//   updateSection(id: number, section: string) {
//     this.updateEntry("sections_tbl", id, { section });
//   }

//   deleteSection(id: number) {
//     this.deleteEntry("sections_tbl", id);
//   }

//   toggleSectionStatus(id: number) {
//     this.toggleEntryStatus("sections_tbl", id, "isActive");
//   }

//   getSections() {
//     return this.getEntries("sections_tbl");
//   }

//   // Subject-specific methods
//   addSubject(subject: string) {
//     return this.addEntry("subject_tbl", { subject, isActive: 1 });
//   }

//   updateSubject(id: number, subject: string) {
//     this.updateEntry("subject_tbl", id, { subject });
//   }

//   deleteSubject(id: number) {
//     this.deleteEntry("subject_tbl", id);
//   }

//   toggleSubjectStatus(id: number) {
//     this.toggleEntryStatus("subject_tbl", id, "isActive");
//   }

//   getSubjects() {
//     return this.getEntries("subject_tbl");
//   }

//   // Term-specific methods
//   addTerm(term: string) {
//     return this.addEntry("term_tbl", { term, isActive: 1 });
//   }

//   updateTerm(id: number, term: string) {
//     this.updateEntry("term_tbl", id, { term });
//   }

//   deleteTerm(id: number) {
//     this.deleteEntry("term_tbl", id);
//   }

//   toggleTermStatus(id: number) {
//     this.toggleEntryStatus("term_tbl", id, "isActive");
//   }

//   getTerms() {
//     return this.getEntries("term_tbl");
//   }

//   // Session-specific methods
//   addSession(session: string) {
//     return this.addEntry("session_tbl", { session, isActive: 1 });
//   }

//   updateSession(id: number, session: string) {
//     this.updateEntry("session_tbl", id, { session });
//   }

//   deleteSession(id: number) {
//     this.deleteEntry("session_tbl", id);
//   }

//   toggleSessionStatus(id: number) {
//     this.toggleEntryStatus("session_tbl", id, "isActive");
//   }

//   getSessions() {
//     return this.getEntries("session_tbl");
//   }

//   // Logo-specific methods
//   addLogo(logoData: LogoEntity) {
//     return this.addEntry("logo_tbl", {
//       logoPhoto: logoData.logoPhoto,
//       isActive: 1,
//     });
//   }

//   updateLogo(id: number, logoPhoto: string) {
//     this.updateEntry("logo_tbl", id, { logoPhoto });
//   }

//   deleteLogo(id: number) {
//     this.deleteEntry("logo_tbl", id);
//   }

//   toggleLogoStatus(id: number) {
//     this.toggleEntryStatus("logo_tbl", id, "isActive");
//   }

//   getLogo() {
//     return this.getEntries("logo_tbl");
//   }

//   // Content-specific methods
//   addEditorContent(contentData: EditorContentEntity) {
//     return this.addEntry("content_tbl", {
//       contentName: contentData.contentName,
//       editorContent: contentData.editorContent,
//       isActive: 1,
//     });
//   }

//   updateEditorContent(id: number, editorContent: string) {
//     this.updateEntry("content_tbl", id, { editorContent });
//   }

//   deleteEditorContent(id: number) {
//     this.deleteEntry("content_tbl", id);
//   }

//   toggleEditorContentStatus(id: number) {
//     this.toggleEntryStatus("content_tbl", id, "isActive");
//   }

//   getEditorContent() {
//     return this.getEntries("content_tbl");
//   }

//   getEditorContentById(id: number) {
//     return this.getEntryById("content_tbl", id);
//   }

//   // Delete multiple students by their IDs
//   deleteSelectedStudents(studentIds: number[]) {
//     const stmt = this.db.prepare(
//       `DELETE FROM students_tbl WHERE id IN (${studentIds
//         .map(() => "?")
//         .join(", ")})`
//     );
//     stmt.run(...studentIds);
//   }
// }

// const dbManager = new DatabaseManager();

// // Export functions for external use
// export const addStudent = (studentData: Omit<StudentData, "id">) =>
//   dbManager.addStudent(studentData);

// export const updateStudent = (
//   id: number,
//   studentData: Partial<Omit<StudentData, "id">>
// ) => dbManager.updateStudent(id, studentData);

// export const deleteStudentById = (id: number) =>
//   dbManager.deleteStudentById(id);

// export const getAllStudents = (): StudentData[] => dbManager.getAllStudents();

// export const getStudentById = (id: number): StudentData | null =>
//   dbManager.getStudentById(id);

// export const toggleStudentStatus = (id: number) =>
//   dbManager.toggleStudentStatus(id);

// export const addClass = (className: string) => dbManager.addClass(className);

// export const updateClass = (id: number, className: string) =>
//   dbManager.updateClass(id, className);

// export const deleteClass = (id: number) => dbManager.deleteClass(id);

// export const toggleClassStatus = (id: number) =>
//   dbManager.toggleClassStatus(id);

// export const getClasses = () => dbManager.getClasses();

// export const addSection = (section: string) => dbManager.addSection(section);

// export const updateSection = (id: number, section: string) =>
//   dbManager.updateSection(id, section);

// export const deleteSection = (id: number) => dbManager.deleteSection(id);

// export const toggleSectionStatus = (id: number) =>
//   dbManager.toggleSectionStatus(id);

// export const getSections = () => dbManager.getSections();

// export const addSubject = (subject: string) => dbManager.addSubject(subject);

// export const updateSubject = (id: number, subject: string) =>
//   dbManager.updateSubject(id, subject);

// export const deleteSubject = (id: number) => dbManager.deleteSubject(id);

// export const toggleSubjectStatus = (id: number) =>
//   dbManager.toggleSubjectStatus(id);

// export const getSubjects = () => dbManager.getSubjects();

// export const addTerm = (term: string) => dbManager.addTerm(term);

// export const updateTerm = (id: number, term: string) =>
//   dbManager.updateTerm(id, term);

// export const deleteTerm = (id: number) => dbManager.deleteTerm(id);

// export const toggleTermStatus = (id: number) => dbManager.toggleTermStatus(id);

// export const getTerms = () => dbManager.getTerms();

// export const addSession = (session: string) => dbManager.addSession(session);

// export const updateSession = (id: number, session: string) =>
//   dbManager.updateSession(id, session);

// export const deleteSession = (id: number) => dbManager.deleteSession(id);

// export const toggleSessionStatus = (id: number) =>
//   dbManager.toggleSessionStatus(id);

// export const getSessions = () => dbManager.getSessions();

// export const addLogo = (logoData: LogoEntity) => dbManager.addLogo(logoData);

// export const updateLogo = (id: number, logoPhoto: string) =>
//   dbManager.updateLogo(id, logoPhoto);

// export const deleteLogo = (id: number) => dbManager.deleteLogo(id);

// export const toggleLogoStatus = (id: number) => dbManager.toggleLogoStatus(id);

// export const getLogo = () => dbManager.getLogo();

// export const addEditorContent = (contentData: EditorContentEntity) =>
//   dbManager.addEditorContent(contentData);

// export const updateEditorContent = (id: number, editorContent: string) =>
//   dbManager.updateEditorContent(id, editorContent);

// export const deleteEditorContent = (id: number) =>
//   dbManager.deleteEditorContent(id);

// export const toggleEditorContentStatus = (id: number) =>
//   dbManager.toggleEditorContentStatus(id);

// export const getEditorContent = () => dbManager.getEditorContent();

// export const getEditorContentById = (id: number) =>
//   dbManager.getEditorContentById(id);

// export const deleteSelectedStudents = (studentIds: number[]) =>
//   dbManager.deleteSelectedStudents(studentIds);

import Database from "better-sqlite3";
import { EditorContentEntity, LogoEntity, StudentData } from "./subMenus/types";
import { app } from "electron";
import path from "path";
// Database configuration
// const DB_NAME = process.env.DB_NAME || "students_db.db";
const DB_NAME = path.join(app.getPath("userData"), "students_db.db");
console.log("Database path:", DB_NAME);

class DatabaseManager {
  private static instance: DatabaseManager;
  private db: Database.Database;

  constructor() {
    this.db = new Database(DB_NAME, { fileMustExist: false });
    this.db.pragma("foreign_keys = ON");
    this.db.pragma("journal_mode = WAL");
    this.initializeTables();
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public close(): void {
    if (this.db) {
      this.db.close();
      console.log("Database connection closed.");
    }
  }

  /**
   * Initialize database tables with normalized schema, foreign keys, and indexes.
   */
  initializeTables() {
    try {
      const createTableStmt = `
      -- Enable foreign key support
      PRAGMA foreign_keys = ON;

      -- Classes Table
      CREATE TABLE IF NOT EXISTS classes_tbl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        className TEXT NOT NULL UNIQUE,
        isActive INTEGER DEFAULT 1
      );

      -- Sections Table
      CREATE TABLE IF NOT EXISTS sections_tbl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        section TEXT NOT NULL UNIQUE,
        isActive INTEGER DEFAULT 1
      );

      -- Students Table (with foreign keys)
      CREATE TABLE IF NOT EXISTS students_tbl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        classId INTEGER NOT NULL,
        sectionId INTEGER NOT NULL,
        registrationNumber TEXT NOT NULL UNIQUE,
        profilePhoto TEXT,
        isActive INTEGER CHECK (isActive IN (0,1)) DEFAULT 1,
        FOREIGN KEY (classId) REFERENCES classes_tbl(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (sectionId) REFERENCES sections_tbl(id) ON DELETE CASCADE ON UPDATE CASCADE
      );

      -- Subjects Table
      CREATE TABLE IF NOT EXISTS subject_tbl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT NOT NULL UNIQUE,
        isActive INTEGER DEFAULT 1
      );

      -- Terms Table
      CREATE TABLE IF NOT EXISTS term_tbl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        term TEXT NOT NULL UNIQUE,
        isActive INTEGER DEFAULT 1
      );

      -- Sessions Table
      CREATE TABLE IF NOT EXISTS session_tbl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session TEXT NOT NULL UNIQUE,
        isActive INTEGER DEFAULT 1
      );

      -- Logo Table
      CREATE TABLE IF NOT EXISTS logo_tbl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        logoPhoto TEXT,
        isActive INTEGER DEFAULT 1
      );

      -- Content Table
      CREATE TABLE IF NOT EXISTS content_tbl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contentName TEXT NOT NULL,
        editorContent TEXT,
        isActive INTEGER DEFAULT 1
      );

      -- Indexes for frequently queried columns
     
      CREATE INDEX IF NOT EXISTS idx_students_classId ON students_tbl(classId);
      CREATE INDEX IF NOT EXISTS idx_students_sectionId ON students_tbl(sectionId);
       CREATE INDEX IF NOT EXISTS idx_students_registrationNumber ON students_tbl(registrationNumber);
      CREATE INDEX IF NOT EXISTS idx_classes_className ON classes_tbl(className);
      CREATE INDEX IF NOT EXISTS idx_sections_section ON sections_tbl(section);
      CREATE INDEX IF NOT EXISTS idx_content_name ON content_tbl(contentName);
      
    `;
      this.db.exec(createTableStmt);
    } catch (error) {
      console.error("Error initializing database tables:", error);
      throw error;
    }
  }

  /**
   * Generic function to add an entry to any table.
   */
  addEntry(tableName: string, data: Record<string, unknown>) {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    const stmt = this.db.prepare(
      `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`
    );
    const result = stmt.run(...Object.values(data));

    return { id: result.lastInsertRowid, ...data };
  }

  /**
   * Generic function to fetch all entries from any table.
   */
  getEntries(tableName: string, conditions: Record<string, unknown> = {}) {
    const whereClause =
      Object.keys(conditions).length > 0
        ? `WHERE ${Object.keys(conditions)
            .map((col) => `${col} = ?`)
            .join(" AND ")}`
        : "";
    const stmt = this.db.prepare(`SELECT * FROM ${tableName} ${whereClause}`);
    return stmt.all(...Object.values(conditions));
  }

  /**
   * Generic function to fetch a specific entry by id from any table.
   */
  getEntryById(tableName: string, id: number) {
    const stmt = this.db.prepare(`SELECT * FROM ${tableName} WHERE id = ?`);
    return stmt.get(id);
  }

  /**
   * Generic function to update an entry in any table.
   */
  updateEntry(tableName: string, id: number, updates: Record<string, unknown>) {
    const setClause = Object.keys(updates)
      .map((col) => `${col} = ?`)
      .join(", ");
    const stmt = this.db.prepare(
      `UPDATE ${tableName} SET ${setClause} WHERE id = ?`
    );
    stmt.run(...Object.values(updates), id);
  }

  /**
   * Generic function to delete an entry from any table.
   */
  // deleteEntry(tableName: string, id: number) {
  //   const stmt = this.db.prepare(`DELETE FROM ${tableName} WHERE id = ?`);
  //   stmt.run(id);
  // }

  deleteEntry(
    tableName: string,
    id: number
  ): { success: boolean; error?: string } {
    try {
      const stmt = this.db.prepare(`DELETE FROM ${tableName} WHERE id = ?`);
      const result = stmt.run(id);

      // Check if any rows were affected
      if (result.changes > 0) {
        return { success: true }; // Deletion successful
      } else {
        return { success: false, error: "No student found with the given ID" }; // No rows deleted
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
      return { success: false, error: (error as Error).message }; // Return the error message
    }
  }

  /**
   * Generic function to toggle a boolean status in any table.
   */
  toggleEntryStatus(tableName: string, id: number, statusColumn: string) {
    const stmt = this.db.prepare(
      `UPDATE ${tableName} SET ${statusColumn} = NOT ${statusColumn} WHERE id = ?`
    );
    stmt.run(id);
  }

  // Student-specific methods
  // addStudent(studentData: Omit<StudentData, "id">) {
  //   return this.addEntry("students_tbl", studentData);
  // }

  addStudent(studentData: Omit<StudentData, "id">) {
    try {
      const result = this.db.transaction(() => {
        return this.addEntry("students_tbl", studentData);
      })();
      return result;
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT") {
        throw new Error(
          "Student with this registration number already exists."
        );
      }
      throw error;
    }
  }

  updateStudent(id: number, studentData: Partial<Omit<StudentData, "id">>) {
    this.updateEntry("students_tbl", id, studentData);
  }

  deleteStudentById(id: number): { success: boolean; error?: string } {
    return this.deleteEntry("students_tbl", id);
  }

  getAllStudents(): StudentData[] {
    return this.getEntries("students_tbl") as StudentData[];
  }

  getStudentById(id: number): StudentData | null {
    return this.getEntryById("students_tbl", id) as StudentData | null;
  }

  toggleStudentStatus(id: number) {
    this.toggleEntryStatus("students_tbl", id, "isActive");
  }

  // Class-specific methods
  addClass(className: string) {
    return this.addEntry("classes_tbl", { className, isActive: 1 });
  }

  updateClass(id: number, className: string) {
    this.updateEntry("classes_tbl", id, { className });
  }

  deleteClass(id: number) {
    this.deleteEntry("classes_tbl", id);
  }

  toggleClassStatus(id: number) {
    this.toggleEntryStatus("classes_tbl", id, "isActive");
  }

  getClasses() {
    return this.getEntries("classes_tbl");
  }

  // Section-specific methods
  addSection(section: string) {
    return this.addEntry("sections_tbl", { section, isActive: 1 });
  }

  updateSection(id: number, section: string) {
    this.updateEntry("sections_tbl", id, { section });
  }

  deleteSection(id: number) {
    this.deleteEntry("sections_tbl", id);
  }

  toggleSectionStatus(id: number) {
    this.toggleEntryStatus("sections_tbl", id, "isActive");
  }

  getSections() {
    return this.getEntries("sections_tbl");
  }

  // Subject-specific methods
  addSubject(subject: string) {
    return this.addEntry("subject_tbl", { subject, isActive: 1 });
  }

  updateSubject(id: number, subject: string) {
    this.updateEntry("subject_tbl", id, { subject });
  }

  deleteSubject(id: number) {
    this.deleteEntry("subject_tbl", id);
  }

  toggleSubjectStatus(id: number) {
    this.toggleEntryStatus("subject_tbl", id, "isActive");
  }

  getSubjects() {
    return this.getEntries("subject_tbl");
  }

  // Term-specific methods
  addTerm(term: string) {
    return this.addEntry("term_tbl", { term, isActive: 1 });
  }

  updateTerm(id: number, term: string) {
    this.updateEntry("term_tbl", id, { term });
  }

  deleteTerm(id: number) {
    this.deleteEntry("term_tbl", id);
  }

  toggleTermStatus(id: number) {
    this.toggleEntryStatus("term_tbl", id, "isActive");
  }

  getTerms() {
    return this.getEntries("term_tbl");
  }

  // Session-specific methods
  addSession(session: string) {
    return this.addEntry("session_tbl", { session, isActive: 1 });
  }

  updateSession(id: number, session: string) {
    this.updateEntry("session_tbl", id, { session });
  }

  deleteSession(id: number) {
    this.deleteEntry("session_tbl", id);
  }

  toggleSessionStatus(id: number) {
    this.toggleEntryStatus("session_tbl", id, "isActive");
  }

  getSessions() {
    return this.getEntries("session_tbl");
  }

  // Logo-specific methods
  addLogo(logoData: LogoEntity) {
    return this.addEntry("logo_tbl", {
      logoPhoto: logoData.logoPhoto,
      isActive: 1,
    });
  }

  updateLogo(id: number, logoPhoto: string) {
    this.updateEntry("logo_tbl", id, { logoPhoto });
  }

  deleteLogo(id: number) {
    this.deleteEntry("logo_tbl", id);
  }

  toggleLogoStatus(id: number) {
    this.toggleEntryStatus("logo_tbl", id, "isActive");
  }

  getLogo() {
    return this.getEntries("logo_tbl");
  }

  // Content-specific methods
  addEditorContent(contentData: EditorContentEntity) {
    return this.addEntry("content_tbl", {
      contentName: contentData.contentName,
      editorContent: contentData.editorContent,
      isActive: 1,
    });
  }

  updateEditorContent(id: number, editorContent: string) {
    this.updateEntry("content_tbl", id, { editorContent });
  }

  deleteEditorContent(id: number) {
    this.deleteEntry("content_tbl", id);
  }

  toggleEditorContentStatus(id: number) {
    this.toggleEntryStatus("content_tbl", id, "isActive");
  }

  getEditorContent() {
    return this.getEntries("content_tbl");
  }

  getEditorContentById(id: number) {
    return this.getEntryById("content_tbl", id);
  }

  // Delete multiple students by their IDs
  deleteSelectedStudents(studentIds: number[]) {
    const stmt = this.db.prepare(
      `DELETE FROM students_tbl WHERE id IN (${studentIds
        .map(() => "?")
        .join(", ")})`
    );
    stmt.run(...studentIds);
  }
}

const dbManager = new DatabaseManager();

// Export functions for external use
export const addStudent = (studentData: Omit<StudentData, "id">) =>
  dbManager.addStudent(studentData);

// Add a function to close the database connection
export const closeDatabase = () => {
  dbManager.close();
};

export const updateStudent = (
  id: number,
  studentData: Partial<Omit<StudentData, "id">>
) => dbManager.updateStudent(id, studentData);

export const deleteStudentById = (id: number) =>
  dbManager.deleteStudentById(id);

export const getAllStudents = (): StudentData[] => dbManager.getAllStudents();

export const getStudentById = (id: number): StudentData | null =>
  dbManager.getStudentById(id);

export const toggleStudentStatus = (id: number) =>
  dbManager.toggleStudentStatus(id);

export const addClass = (className: string) => dbManager.addClass(className);

export const updateClass = (id: number, className: string) =>
  dbManager.updateClass(id, className);

export const deleteClass = (id: number) => dbManager.deleteClass(id);

export const toggleClassStatus = (id: number) =>
  dbManager.toggleClassStatus(id);

export const getClasses = () => dbManager.getClasses();

export const addSection = (section: string) => dbManager.addSection(section);

export const updateSection = (id: number, section: string) =>
  dbManager.updateSection(id, section);

export const deleteSection = (id: number) => dbManager.deleteSection(id);

export const toggleSectionStatus = (id: number) =>
  dbManager.toggleSectionStatus(id);

export const getSections = () => dbManager.getSections();

export const addSubject = (subject: string) => dbManager.addSubject(subject);

export const updateSubject = (id: number, subject: string) =>
  dbManager.updateSubject(id, subject);

export const deleteSubject = (id: number) => dbManager.deleteSubject(id);

export const toggleSubjectStatus = (id: number) =>
  dbManager.toggleSubjectStatus(id);

export const getSubjects = () => dbManager.getSubjects();

export const addTerm = (term: string) => dbManager.addTerm(term);

export const updateTerm = (id: number, term: string) =>
  dbManager.updateTerm(id, term);

export const deleteTerm = (id: number) => dbManager.deleteTerm(id);

export const toggleTermStatus = (id: number) => dbManager.toggleTermStatus(id);

export const getTerms = () => dbManager.getTerms();

export const addSession = (session: string) => dbManager.addSession(session);

export const updateSession = (id: number, session: string) =>
  dbManager.updateSession(id, session);

export const deleteSession = (id: number) => dbManager.deleteSession(id);

export const toggleSessionStatus = (id: number) =>
  dbManager.toggleSessionStatus(id);

export const getSessions = () => dbManager.getSessions();

export const addLogo = (logoData: LogoEntity) => dbManager.addLogo(logoData);

export const updateLogo = (id: number, logoPhoto: string) =>
  dbManager.updateLogo(id, logoPhoto);

export const deleteLogo = (id: number) => dbManager.deleteLogo(id);

export const toggleLogoStatus = (id: number) => dbManager.toggleLogoStatus(id);

export const getLogo = () => dbManager.getLogo();

export const addEditorContent = (contentData: EditorContentEntity) =>
  dbManager.addEditorContent(contentData);

export const updateEditorContent = (id: number, editorContent: string) =>
  dbManager.updateEditorContent(id, editorContent);

export const deleteEditorContent = (id: number) =>
  dbManager.deleteEditorContent(id);

export const toggleEditorContentStatus = (id: number) =>
  dbManager.toggleEditorContentStatus(id);

export const getEditorContent = () => dbManager.getEditorContent();

export const getEditorContentById = (id: number) =>
  dbManager.getEditorContentById(id);

export const deleteSelectedStudents = (studentIds: number[]) =>
  dbManager.deleteSelectedStudents(studentIds);