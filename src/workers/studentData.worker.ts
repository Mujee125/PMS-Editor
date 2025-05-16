// src/workers/studentData.worker.ts

import { Class, Section, StudentData } from "../subMenus/types";

// Define the type for messages we'll receive from the main thread
type WorkerMessage = {
  type: "PROCESS_STUDENT_DATA";
  payload: {
    students: StudentData[];
    classes: Class[]; // You'll need to define this type
    sections: Section[]; // You'll need to define this type
  };
};

// Function to process student data
function processStudentData(
  students: StudentData[],
  classes: Class[],
  sections: Section[]
) {
  return students.map((student) => {
    // Find class and section names
    const className =
      classes.find((cls) => cls.id === student.classId)?.className ||
      "Unknown Class";
    const sectionName =
      sections.find((sec) => sec.id === student.sectionId)?.section ||
      "Unknown Section";

    return {
      ...student,
      className, // Add processed class name
      sectionName, // Add processed section name
      // You can add more processed fields here
    };
  });
}

// Listen for messages from the main thread
self.onmessage = function (e: MessageEvent<WorkerMessage>) {
  const { type, payload } = e.data;

  switch (type) {
    case "PROCESS_STUDENT_DATA":
      try {
        const processedData = processStudentData(
          payload.students,
          payload.classes,
          payload.sections
        );
        self.postMessage({
          type: "STUDENT_DATA_PROCESSED",
          payload: processedData,
        });
      } catch (error) {
        self.postMessage({
          type: "ERROR",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
      break;

    // Add more cases as needed
  }
};

// Export types for TypeScript (this line is important for TypeScript workers)
export default {} as typeof Worker & { new (): Worker };
