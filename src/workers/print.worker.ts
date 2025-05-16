// src/workers/print.worker.ts

import { Class, LogoEntity, Section, StudentData } from "../subMenus/types";

// Define types for our messages
type WorkerMessage = {
  type: "PREPARE_PRINT_DATA";
  payload: {
    students: StudentData[];
    classes: Class[];
    sections: Section[];
    logos: LogoEntity[];
    selectedTerm: string;
    selectedContent: string[];
    selectedDate: string;
    totalMarks: string;
    totalTime: string;
    printType: "SS" | "MS"; // Single Student or Multiple Students
  };
};

// Function to generate HTML for a single student
function generateStudentHTML(
  student: StudentData,
  classes: Class[],
  sections: Section[],
  logos: LogoEntity[],
  selectedTerm: string,
  selectedContent: string[],
  selectedDate: string,
  totalMarks: string,
  totalTime: string
): string {
  const className =
    classes.find((c) => c.id === student.classId)?.className || "Unknown Class";
  const sectionName =
    sections.find((s) => s.id === student.sectionId)?.section ||
    "Unknown Section";
  const logo = logos[0]?.logoPhoto || "";

  return `
    <div>
      <header class="print-header">
        <!-- Your PaperHeader HTML here -->
        <div>${student.name}</div>
        <div>${className}</div>
        <!-- More header content -->
      </header>
      <div class="content">
        ${selectedContent.join(" ")}
      </div>
    </div>
  `;
}

// Function to chunk students and generate HTML
function preparePrintData(
  students: StudentData[],
  classes: Class[],
  sections: Section[],
  logos: LogoEntity[],
  selectedTerm: string,
  selectedContent: string[],
  selectedDate: string,
  totalMarks: string,
  totalTime: string,
  printType: "SS" | "MS"
): string[] {
  const chunkSize = printType === "SS" ? 1 : 50;
  const chunks: string[] = [];

  for (let i = 0; i < students.length; i += chunkSize) {
    const chunk = students.slice(i, i + chunkSize);
    let html = "";

    chunk.forEach((student) => {
      html += generateStudentHTML(
        student,
        classes,
        sections,
        logos,
        selectedTerm,
        selectedContent,
        selectedDate,
        totalMarks,
        totalTime
      );
    });

    chunks.push(html);
  }

  return chunks;
}

// Listen for messages
self.onmessage = function (e: MessageEvent<WorkerMessage>) {
  const { type, payload } = e.data;

  switch (type) {
    case "PREPARE_PRINT_DATA":
      try {
        const htmlChunks = preparePrintData(
          payload.students,
          payload.classes,
          payload.sections,
          payload.logos,
          payload.selectedTerm,
          payload.selectedContent,
          payload.selectedDate,
          payload.totalMarks,
          payload.totalTime,
          payload.printType
        );

        self.postMessage({
          type: "PRINT_DATA_READY",
          payload: htmlChunks,
        });
      } catch (error) {
        self.postMessage({
          type: "ERROR",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
      break;
  }
};

export default {} as typeof Worker & { new (): Worker };
