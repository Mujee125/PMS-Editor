// src/hooks/usePrintWorker.ts
import { useEffect, useState, useCallback } from "react";
import path from "path";
import { app } from "@electron/remote";
import { Class, LogoEntity, Section, StudentData } from "../subMenus/types";

export function usePrintWorker() {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [htmlChunks, setHtmlChunks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get absolute path to worker file
    const workerPath = path.join(
      app.getAppPath(),
      "dist",
      "workers",
      "print.worker.ts"
    );
    // Create worker with file:// URL
    const workerUrl = new URL(`file://${workerPath}`);
       const newWorker = new Worker(workerUrl);


    newWorker.onmessage = (e) => {
      const { type, payload, error } = e.data;

      switch (type) {
        case "PRINT_DATA_READY":
          setHtmlChunks(payload);
          setLoading(false);
          setError(null);
          break;
        case "ERROR":
          setError(error);
          setLoading(false);
          console.error("Print worker error:", error);
          break;
      }
    };

    newWorker.onerror = (err) => {
      setError(err.message);
      setLoading(false);
      console.error("Print worker error:", err);
    };

    setWorker(newWorker);

    return () => {
      newWorker.terminate();
    };
  }, []);

  const preparePrintData = useCallback(
    (
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
    ) => {
      if (worker) {
        setLoading(true);
        worker.postMessage({
          type: "PREPARE_PRINT_DATA",
          payload: {
            students,
            classes,
            sections,
            logos,
            selectedTerm,
            selectedContent,
            selectedDate,
            totalMarks,
            totalTime,
            printType,
          },
        });
      } else {
        console.warn("Print worker not ready");
        setLoading(false);
      }
    },
    [worker]
  );

  return { htmlChunks, preparePrintData, loading, error };
}
