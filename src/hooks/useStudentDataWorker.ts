// src/hooks/useStudentDataWorker.ts
import { useEffect, useState, useCallback } from "react";
import { Class, Section, StudentData } from "../subMenus/types";

export function useStudentDataWorker() {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [processedData, setProcessedData] = useState<StudentData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initialize the worker
  useEffect(() => {
    const newWorker = new Worker(
      new URL("../workers/studentData.worker.ts", )
    );

    newWorker.onmessage = (e) => {
      const { type, payload, error } = e.data;

      switch (type) {
        case "STUDENT_DATA_PROCESSED":
          setProcessedData(payload);
          setError(null);
          break;
        case "ERROR":
          setError(error);
          console.error("Worker error:", error);
          break;
      }
    };

    newWorker.onerror = (err) => {
      setError(err.message);
      console.error("Worker error:", err);
    };

    setWorker(newWorker);

    return () => {
      newWorker.terminate();
    };
  }, []);

  // Function to send data to worker for processing
  const processData = useCallback(
    (
      students: StudentData[],
      classes: Class[],
      sections: Section[]
    ) => {
      if (worker) {
        worker.postMessage({
          type: "PROCESS_STUDENT_DATA",
          payload: { students, classes, sections },
        });
      } else {
        // Fallback to main thread processing if worker isn't ready
        console.warn(
          "Worker not ready, falling back to main thread processing"
        );
        setProcessedData(students); // You might want to process here as well
      }
    },
    [worker]
  );

  return { processedData, processData, error };
}
