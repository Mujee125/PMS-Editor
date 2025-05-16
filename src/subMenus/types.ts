
// Class Entity
export interface Class {
  id: number; // Changed from string to number
  className: string; // Added className to match the schema
  isActive: boolean;
}

// Section Entity
export interface Section {
  id: number; // Changed from string to number
  section: string;
  isActive: boolean;
}

// Subject Entity
export type SubjectEntity = {
  id: number; // Changed from string to number
  subject: string;
  isActive: boolean;
};

// Term Entity
export type TermEntity = {
  id: number; // Changed from string to number
  term: string;
  isActive: boolean;
};

// Session Entity
export type SessionEntity = {
  id: number; // Changed from string to number
  session: string;
  isActive: boolean;
};

// Entity (Generic)
export type Entity = {
  id: number; // Changed from string to number
  className: string;
  isActive: boolean;
};

// Logo Entity
export type LogoEntity = {
  id: number; // Changed from string to number
  logoPhoto: string;
  isActive: boolean;
};

// Editor Content Entity
export type EditorContentEntity = {
  id: number; // Changed from string to number
  contentName: string;
  editorContent: string;
  isActive: boolean;
};

// Student Data
export type StudentData = {
  id: number;
  name: string;
  classId: number;
  sectionId: number;
  registrationNumber: string;
  profilePhoto: string;
  isActive: number;
};