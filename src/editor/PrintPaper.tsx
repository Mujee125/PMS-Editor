

// // // ⁡⁣⁣⁢original content started 6666666666666666666⁡

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useMemo,
//   useCallback,
// } from "react";
// import Modal from "react-modal";
// import { useReactToPrint } from "react-to-print";
// import PaperHeader from "./PaperHeader";
// import { SelectField } from "../subMenus/SelectField";
// import { InputField } from "../subMenus/InputField";
// import ContentSelectField from "../subMenus/ContentSelectField";
// import parse from "html-react-parser";
// import DOMPurify from "dompurify";



// import {
//   useClassStore,
//   useSectionStore,
//   useSubjectStore,
//   useTermStore,
//   useSessionStore,
//   useContentStore,
//   useStudentStore,
//   useLogoStore,
// } from "../stores/store"; // Import your existing stores


// Modal.setAppElement("#root");

// interface PrintPaperProps {
//   onCancel: () => void;
// }

// const PrintPaper: React.FC<PrintPaperProps> = ({ onCancel }) => {
//   const ssprintRef = useRef<HTMLDivElement>(null);
//    const msprintRef = useRef<HTMLDivElement>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedClass, setSelectedClass] = useState<number | null>(null);
//   const [selectedSection, setSelectedSection] = useState<number | null>(null);
//   const [selectedSubject, setSelectedSubject] = useState<string>("");
//   const [selectedContent, setSelectedContent] = useState<string>("");
//   const [selectedTerm, setSelectedTerm] = useState<string>("");
//   const [selectedSession, setSelectedSession] = useState<string>("");
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [totalMarks, setTotalMarks] = useState<string>("");
//   const [totalTime, setTotalTime] = useState<string>("");
//   const [loading, setLoading] = useState(false);

//   // Use existing Zustand stores
//   const { classes, fetchClasses } = useClassStore();
//   const { sections, fetchSections } = useSectionStore();
//   const { entities: subjects, fetchEntities: fetchSubjects } =
//     useSubjectStore();
//   const { entities: terms, fetchEntities: fetchTerms } = useTermStore();
//   const { entities: sessions, fetchEntities: fetchSessions } =
//     useSessionStore();
//   const { entities: editorContent, fetchEntities: fetchEditorContent } =
//     useContentStore();
//   const { entities: logos, fetchEntities: fetchLogos } = useLogoStore();
//   const { students, fetchStudents } = useStudentStore();

//   // Filter out inactive entities
//   const activeClasses = useMemo(
//     () => classes.filter((cls) => cls.isActive),
//     [classes]
//   );
//   const activeSections = useMemo(
//     () => sections.filter((sec) => sec.isActive),
//     [sections]
//   );
//   const activeSubjects = useMemo(
//     () => subjects.filter((sub) => sub.isActive),
//     [subjects]
//   );
//   const activeTerms = useMemo(
//     () => terms.filter((term) => term.isActive),
//     [terms]
//   );
//   const activeSessions = useMemo(
//     () => sessions.filter((session) => session.isActive),
//     [sessions]
//   );
//   const activeEditorContent = useMemo(
//     () => editorContent.filter((content) => content.isActive),
//     [editorContent]
//   );
//   const activeStudents = useMemo(
//     () => students.filter((student) => student.isActive),
//     [students]
//   );

//   // Memoized maps for efficient lookups
//   const classMap = useMemo(
//     () => new Map(activeClasses.map((cls) => [cls.id, cls.className])),
//     [activeClasses]
//   );
//   const sectionMap = useMemo(
//     () => new Map(activeSections.map((sec) => [sec.id, sec.section])),
//     [activeSections]
//   );

//   // Open modal on mount and fetch data
//   useEffect(() => {
//     setIsModalOpen(true);
//     fetchStudents();
//     fetchClasses();
//     fetchSections();
//     fetchSubjects();
//     fetchTerms();
//     fetchSessions();
//     fetchEditorContent();
//     fetchLogos();
//   }, [
//     fetchClasses,
//     fetchSections,
//     fetchSubjects,
//     fetchTerms,
//     fetchSessions,
//     fetchEditorContent,
//     fetchLogos,
//   ]);

//   // Reset form state
//   const resetState = useCallback(() => {
//     setSelectedClass(null);
//     setSelectedSection(null);
//     setSelectedSubject("");
//     setSelectedContent("");
//     setSelectedTerm("");
//     setSelectedSession("");
//     setSelectedDate("");
//     setTotalMarks("");
//     setTotalTime("");
//     // Ensure the modal is closed and reopened to reflect the reset state
//     setIsModalOpen(false);
//     setTimeout(() => setIsModalOpen(true), 0);
//   }, []);

//   const handlePreview = function (target: HTMLIFrameElement) {
//     return new Promise(() => {
//       console.log("forwarding print preview request...");

//       const data =
//         target.contentWindow?.document.documentElement.outerHTML || "";
//       //console.log(data);
//       const blob = new Blob([data], { type: "text/html;charset=utf-8" });
//       const url = URL.createObjectURL(blob);

//       window.electron.previewComponent(url, (response: any) => {
//         console.log("Main: ", response);
//       });
//       //console.log('Main: ', data);
//       setTimeout(() => {
//         setLoading(false);
//       }, 2000); 
//     }
//     );
  
//   };

//   // Handle print functionality
//   const handleSSPrint = useReactToPrint({
//     contentRef: ssprintRef,

//     pageStyle: `
//       @page {
//         size: A4;
//         margin: 3mm -5mm 3mm -5mm;
        
//       }
//       @media print {
//         body {
//           margin: 3mm -5mm 3mm -5mm;
         
//         }
//       }
//     `,
//     print: handlePreview,
//     onAfterPrint: () => {
//       onCancel();
//     },
//   });

//    const handleMSPrint = useReactToPrint({
//      contentRef: msprintRef,

//      pageStyle: `
//       @page {
//         size: A4;
//         margin: 3mm -5mm 3mm -5mm;
        
//       }
//       @media print {
//         body {
//           margin: 3mm -5mm 3mm -5mm;
         
//         }
//       }
//     `,
//      print: handlePreview,
//      onAfterPrint: () => {
//        onCancel();
//      },
//    });

//   // Filter students based on selected class and section
//   const filteredStudents = useMemo(() => {
//     return activeStudents.filter(
//       (student) =>
//         student.classId === selectedClass &&
//         student.sectionId === selectedSection
//     );
//   }, [activeStudents, selectedClass, selectedSection]);

//   // Sanitize HTML content to prevent XSS attacks
//   const sanitizeContent = useCallback((content: string) => {
//     return parse(DOMPurify.sanitize(content));
//   }, []);

//   // Send print preview request to the Main process


//   return (
//     <div>
//       {/* Full-screen loading overlay */}
//       {loading && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-[#c3c3c3]"></div>
//         </div>
//       )}
//       {/* Modal for selecting print options */}
//       {/* <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         contentLabel="Select Options"
//         className="fixed inset-y-36 inset-x-14 flex items-center justify-center scroll-container font-paypalRegular text-xl bg-white max-w-xl w-full h-[calc(100%-100px)] mx-auto rounded-lg border-2 border-[#cfd3d8] shadow-lg entitySubDiv"
//         overlayClassName="overlay-container"
//       >
      
//       </Modal> */}

//       <div className=" text-[#001435] border  border-[#cfd3d8] bg-[#fff]  shadow-lg  px-10   hover:animate-pulse-border-once max-w-xl w-full h-[calc(100%-60px)] mx-auto   text-base font-paypalRegular z-50 rounded-md space-y-4">
//         <h2 className="text-center landingPageHeading mb-4">
//           Select Print Options
//         </h2>

//         {/* Class Selection */}
//         <SelectField
//           label="Class       "
//           name="class"
//           value={selectedClass ?? ""}
//           onChange={(e) => setSelectedClass(Number(e.target.value))}
//           options={activeClasses.map((cls) => ({
//             value: cls.id,
//             label: cls.className,
//           }))}
//           required
//         />

//         {/* Section Selection */}
//         <SelectField
//           label="Section          "
//           name="section"
//           value={selectedSection ?? ""}
//           onChange={(e) => setSelectedSection(Number(e.target.value))}
//           options={activeSections.map((sec) => ({
//             value: sec.id,
//             label: sec.section,
//           }))}
//           required
//         />

//         {/* Subject Selection */}
//         <SelectField
//           label="Subject         "
//           name="subject"
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//           options={activeSubjects.map((sub) => ({
//             value: sub.subject,
//             label: sub.subject,
//           }))}
//           required
//         />

//         {/* Content Selection */}
//         <ContentSelectField
//           label="Content         "
//           name="content"
//           value={selectedContent}
//           onChange={(e) => {
//             setSelectedContent(e.target.value);
//             // Simulate background upload delay
//             setTimeout(() => {
//               console.log("Content uploaded:", e.target.value);
//             }, 2000); // 2 seconds delay
//           }}
//           options={activeEditorContent.map((content) => ({
//             value: content.editorContent,
//             label: content.contentName,
//           }))}
//           required
//         />

//         {/* Term Selection */}
//         <SelectField
//           label="Term            "
//           name="term"
//           value={selectedTerm}
//           onChange={(e) => setSelectedTerm(e.target.value)}
//           options={activeTerms.map((term) => ({
//             value: term.term,
//             label: term.term,
//           }))}
//           required
//         />

//         {/* Session Selection */}
//         {/* <SelectField
//             label="Session       "
//             name="session"
//             value={selectedSession}
//             onChange={(e) => setSelectedSession(e.target.value)}
//             options={activeSessions.map((session) => ({
//               value: session.session,
//               label: session.session,
//             }))}
//             required
//           />*/}

//         {/* Date Input */}
//         <InputField
//           label="Date"
//           name="date"
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           required
//           className={`${
//             selectedDate ? "text-black" : "text-transparent"
//           } focus:text-black`}
//         />

//         {/* Total Marks Input */}
//         <InputField
//           label="Total Marks"
//           name="totalMarks"
//           type="text"
//           value={totalMarks}
//           onChange={(e) => setTotalMarks(e.target.value)}
//           required
//         />

//         {/* Total Time Input */}
//         <InputField
//           label="Total Time"
//           name="totalTime"
//           type="text"
//           value={totalTime}
//           onChange={(e) => setTotalTime(e.target.value)}
//           required
//         />

//         {/* Action Buttons */}
//         <div className="mt-4 flex space-x-1 justify-evenly pb-4">
//           <button
//             title="Cancel"
//             type="button"
//             onClick={onCancel}
//             className="bg-white text-red-500 px-6 py-2 mb-4 border rounded border-red-500 hover:text-white hover:bg-red-500 transition duration-200 ease-in-out"
//           >
//             Cancel
//           </button>
//           <button
//             title="Reset"
//             type="button"
//             onClick={resetState}
//             className="bg-gray-300 text-white px-7 py-2 mb-4 rounded hover:bg-gray-400 transition duration-200 ease-in-out"
//           >
//             Reset
//           </button>
//           <button
//             title="Print Multiple Students per Page"
//             type="button"
//             onClick={() => {
//               setLoading(true);
//               handleMSPrint();
//               setIsModalOpen(true);
//             }}
//             className="bg-green-600 border-green-600 text-white px-4 border py-2 mb-4 rounded hover:text-green-600 hover:bg-white transition duration-200 ease-in-out"
//           >
//             MS Print
//           </button>
//           <button
//             title="Print Single Student per Page"
//             type="button"
//             onClick={() => {
//               setLoading(true);
//               handleSSPrint();
//               setIsModalOpen(true);
//             }}
//             className="bg-[#2684ff] border-[#2684ff] text-white px-4 border py-2 mb-4 rounded hover:text-[#2684ff] hover:bg-white transition duration-200 ease-in-out"
//           >
//             SS Print
//           </button>
//         </div>
//       </div>

//       {/* SS Print Content */}
//       <div className="p-6 bg-[#fff] max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hidden">
//         <div ref={ssprintRef} className="print-container bg-white">
//           {filteredStudents.map((student, index) => {
//             const className = classMap.get(student.classId) || "Unknown Class";
//             const sectionName =
//               sectionMap.get(student.sectionId) || "Unknown Section";

//             return (
//               <div
//                 key={student.id}
//                 className={index > 0 ? "break-before-page" : ""}
//               >
//                 <PaperHeader
//                   logoSrc={logos[0]?.logoPhoto}
//                   schoolName="The Allied Public School"
//                   campusName="Main Campus"
//                   term={selectedTerm}
//                   studentPhotoSrc={student.profilePhoto}
//                   studentName={student.name}
//                   subjectName={selectedSubject}
//                   className={className}
//                   section={sectionName}
//                   date={
//                     selectedDate ||
//                     new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
//                   }
//                   studentId={student.registrationNumber}
//                   totalMarks={totalMarks}
//                   totalTime={totalTime}
//                 />
//                 <div className="parsed-content pb-8 mb-2 bg-white">
//                   {sanitizeContent(selectedContent)}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* MS Print Content */}
//       <div className="p-6 bg-[#fff] max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hidden">
//         <div ref={msprintRef} className="print-container bg-white">
//           {filteredStudents.map((student, index) => {
//             const className = classMap.get(student.classId) || "Unknown Class";
//             const sectionName =
//               sectionMap.get(student.sectionId) || "Unknown Section";

//             return (
//               <div key={student.id}>
//                 <PaperHeader
//                   logoSrc={logos[0]?.logoPhoto}
//                   schoolName="The Allied Public School"
//                   campusName="Main Campus"
//                   term={selectedTerm}
//                   studentPhotoSrc={student.profilePhoto}
//                   studentName={student.name}
//                   subjectName={selectedSubject}
//                   className={className}
//                   section={sectionName}
//                   date={
//                     selectedDate ||
//                     new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
//                   }
//                   studentId={student.registrationNumber}
//                   totalMarks={totalMarks}
//                   totalTime={totalTime}
//                 />
//                 <div className="parsed-content pb-8 mb-2 bg-white">
//                   {sanitizeContent(selectedContent)}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(PrintPaper);


// // // ⁡⁣⁣⁢original content ended 6666666666666666666⁡

// // import React, {
// //   useState,
// //   useRef,
// //   useEffect,
// //   useMemo,
// //   useCallback,
// // } from "react";
// // import Modal from "react-modal";
// // import { useReactToPrint } from "react-to-print";
// // import PaperHeader from "./PaperHeader";
// // import { SelectField } from "../subMenus/SelectField";
// // import { InputField } from "../subMenus/InputField";
// // import ContentSelectField from "../subMenus/ContentSelectField";
// // import parse from "html-react-parser";
// // import DOMPurify from "dompurify";

// // import {
// //   useClassStore,
// //   useSectionStore,
// //   useSubjectStore,
// //   useTermStore,
// //   useSessionStore,
// //   useContentStore,
// //   useStudentStore,
// //   useLogoStore,
// // } from "../stores/store"; // Import your existing stores

// // Modal.setAppElement("#root");

// // interface PrintPaperProps {
// //   onCancel: () => void;
// // }

// // const PrintPaper: React.FC<PrintPaperProps> = ({ onCancel }) => {
// //   const ssprintRef = useRef<HTMLDivElement>(null);
// //   const msprintRef = useRef<HTMLDivElement>(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedClass, setSelectedClass] = useState<number | null>(null);
// //   const [selectedSection, setSelectedSection] = useState<number | null>(null);
// //   const [selectedSubject, setSelectedSubject] = useState<string>("");
// //   const [selectedContent, setSelectedContent] = useState<string>("");
// //   const [selectedTerm, setSelectedTerm] = useState<string>("");
// //   const [selectedSession, setSelectedSession] = useState<string>("");
// //   const [selectedDate, setSelectedDate] = useState<string>("");
// //   const [totalMarks, setTotalMarks] = useState<string>("");
// //   const [totalTime, setTotalTime] = useState<string>("");
// //   const [loading, setLoading] = useState(false); // Loading state

// //   // Use existing Zustand stores
// //   const { classes, fetchClasses } = useClassStore();
// //   const { sections, fetchSections } = useSectionStore();
// //   const { entities: subjects, fetchEntities: fetchSubjects } =
// //     useSubjectStore();
// //   const { entities: terms, fetchEntities: fetchTerms } = useTermStore();
// //   const { entities: sessions, fetchEntities: fetchSessions } =
// //     useSessionStore();
// //   const { entities: editorContent, fetchEntities: fetchEditorContent } =
// //     useContentStore();
// //   const { entities: logos, fetchEntities: fetchLogos } = useLogoStore();
// //   const { students, fetchStudents } = useStudentStore();

// //   // Filter out inactive entities
// //   const activeClasses = useMemo(
// //     () => classes.filter((cls) => cls.isActive),
// //     [classes]
// //   );
// //   const activeSections = useMemo(
// //     () => sections.filter((sec) => sec.isActive),
// //     [sections]
// //   );
// //   const activeSubjects = useMemo(
// //     () => subjects.filter((sub) => sub.isActive),
// //     [subjects]
// //   );
// //   const activeTerms = useMemo(
// //     () => terms.filter((term) => term.isActive),
// //     [terms]
// //   );
// //   const activeSessions = useMemo(
// //     () => sessions.filter((session) => session.isActive),
// //     [sessions]
// //   );
// //   const activeEditorContent = useMemo(
// //     () => editorContent.filter((content) => content.isActive),
// //     [editorContent]
// //   );
// //   const activeStudents = useMemo(
// //     () => students.filter((student) => student.isActive),
// //     [students]
// //   );

// //   // Memoized maps for efficient lookups
// //   const classMap = useMemo(
// //     () => new Map(activeClasses.map((cls) => [cls.id, cls.className])),
// //     [activeClasses]
// //   );
// //   const sectionMap = useMemo(
// //     () => new Map(activeSections.map((sec) => [sec.id, sec.section])),
// //     [activeSections]
// //   );

// //   // Open modal on mount and fetch data
// //   useEffect(() => {
// //     setIsModalOpen(true);
// //     fetchStudents();
// //     fetchClasses();
// //     fetchSections();
// //     fetchSubjects();
// //     fetchTerms();
// //     fetchSessions();
// //     fetchEditorContent();
// //     fetchLogos();
// //   }, [
// //     fetchClasses,
// //     fetchSections,
// //     fetchSubjects,
// //     fetchTerms,
// //     fetchSessions,
// //     fetchEditorContent,
// //     fetchLogos,
// //   ]);

// //   // Reset form state
// //   const resetState = useCallback(() => {
// //     setSelectedClass(null);
// //     setSelectedSection(null);
// //     setSelectedSubject("");
// //     setSelectedContent("");
// //     setSelectedTerm("");
// //     setSelectedSession("");
// //     setSelectedDate("");
// //     setTotalMarks("");
// //     setTotalTime("");
// //     setIsModalOpen(false);
// //     setTimeout(() => setIsModalOpen(true), 0);
// //   }, []);

// //   // const handlePreview = function (target: HTMLIFrameElement) {
// //   //   return new Promise<void>((resolve) => {
// //   //     console.log("forwarding print preview request...");

// //   //     const data =
// //   //       target.contentWindow?.document.documentElement.outerHTML || "";
// //   //     const blob = new Blob([data], { type: "text/html;charset=utf-8" });
// //   //     const url = URL.createObjectURL(blob);

// //   //     // Open the preview window
// //   //     const previewWindow = window.open(url, "_blank");

// //   //     if (previewWindow) {
// //   //       // Add an event listener to detect when the preview window is closed
// //   //       const interval = setInterval(() => {
// //   //         if (previewWindow.closed) {
// //   //           clearInterval(interval);
// //   //           resolve(); // Resolve the promise when the preview window is closed
// //   //         }
// //   //       }, 500);

// //   //       // Trigger print functionality in the preview window
// //   //       previewWindow.onload = () => {
// //   //         previewWindow.print();
// //   //       };
// //   //     } else {
// //   //       resolve(); // Fallback: resolve the promise if the preview window fails to open
// //   //     }
// //   //   });
// //   // };

// //     const handlePreview = function (target: HTMLIFrameElement) {
// //     return new Promise(() => {
// //       console.log("forwarding print preview request...");

// //       const data =
// //         target.contentWindow?.document.documentElement.outerHTML || "";
// //       //console.log(data);
// //       const blob = new Blob([data], { type: "text/html;charset=utf-8" });
// //       const url = URL.createObjectURL(blob);

// //       window.electron.previewComponent(url, (response: any) => {
// //         console.log("Main: ", response);
// //       });
// //       setLoading(false); // Reset loading state
// //       //console.log('Main: ', data);
// //     });
   
// //   };

// //   // Handle SS Print functionality
// //   const handleSSPrint = useReactToPrint({
// //     contentRef: ssprintRef,
// //     pageStyle: `
// //       @page {
// //         size: A4;
// //         margin: 3mm -5mm 3mm -5mm;
// //       }
// //       @media print {
// //         body {
// //           margin: 3mm -5mm 3mm -5mm;
// //         }
// //       }
// //     `,
// //     print: handlePreview,
// //     onAfterPrint: () => {
// //       setLoading(false); // Reset loading state
// //       onCancel();
// //     },
// //   });

// //   // Handle MS Print functionality
// //   const handleMSPrint = useReactToPrint({
// //     contentRef: msprintRef,
// //     pageStyle: `
// //       @page {
// //         size: A4;
// //         margin: 3mm -5mm 3mm -5mm;
// //       }
// //       @media print {
// //         body {
// //           margin: 3mm -5mm 3mm -5mm;
// //         }
// //       }
// //     `,
// //     print: handlePreview,
// //     onAfterPrint: () => {
// //       setLoading(false); // Reset loading state
// //       onCancel();
// //     },
// //   });

// //   // Filter students based on selected class and section
// //   const filteredStudents = useMemo(() => {
// //     return activeStudents.filter(
// //       (student) =>
// //         student.classId === selectedClass &&
// //         student.sectionId === selectedSection
// //     );
// //   }, [activeStudents, selectedClass, selectedSection]);

// //   // Sanitize HTML content to prevent XSS attacks
// //   const sanitizeContent = useCallback((content: string) => {
// //     return parse(DOMPurify.sanitize(content));
// //   }, []);

// //   return (
// //     <div>
// //       {/* Full-screen loading overlay */}
// //       {loading && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001435] bg-opacity-50">
// //           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
// //         </div>
// //       )}

// //       {/* Modal for selecting print options */}
// //       <Modal
// //         isOpen={isModalOpen}
// //         onRequestClose={() => setIsModalOpen(false)}
// //         contentLabel="Select Options"
// //         className="fixed inset-y-36 inset-x-14 flex items-center justify-center scroll-container font-paypalRegular text-xl bg-white max-w-xl w-full h-[calc(100%-100px)] mx-auto rounded-lg border-2 border-[#cfd3d8] shadow-lg entitySubDiv"
// //         overlayClassName="overlay-container"
// //       >
// //         <div className="text-[#001435] max-w-xl w-full h-[calc(100%-60px)] mx-auto p-4 -mt-24 text-base font-paypalRegular z-50 rounded-md space-y-4">
// //           <h2 className="text-center landingPageHeading mb-4">
// //             Select Print Options
// //           </h2>

// //           {/* Class Selection */}
// //           <SelectField
// //             label="Class       "
// //             name="class"
// //             value={selectedClass ?? ""}
// //             onChange={(e) => setSelectedClass(Number(e.target.value))}
// //             options={activeClasses.map((cls) => ({
// //               value: cls.id,
// //               label: cls.className,
// //             }))}
// //             required
// //           />

// //           {/* Section Selection */}
// //           <SelectField
// //             label="Section          "
// //             name="section"
// //             value={selectedSection ?? ""}
// //             onChange={(e) => setSelectedSection(Number(e.target.value))}
// //             options={activeSections.map((sec) => ({
// //               value: sec.id,
// //               label: sec.section,
// //             }))}
// //             required
// //           />

// //           {/* Subject Selection */}
// //           <SelectField
// //             label="Subject         "
// //             name="subject"
// //             value={selectedSubject}
// //             onChange={(e) => setSelectedSubject(e.target.value)}
// //             options={activeSubjects.map((sub) => ({
// //               value: sub.subject,
// //               label: sub.subject,
// //             }))}
// //             required
// //           />

// //           {/* Content Selection */}
// //           <ContentSelectField
// //             label="Content         "
// //             name="content"
// //             value={selectedContent}
// //             onChange={(e) => {
// //               setSelectedContent(e.target.value);
// //               setTimeout(() => {
// //                 console.log("Content uploaded:", e.target.value);
// //               }, 2000);
// //             }}
// //             options={activeEditorContent.map((content) => ({
// //               value: content.editorContent,
// //               label: content.contentName,
// //             }))}
// //             required
// //           />

// //           {/* Term Selection */}
// //           <SelectField
// //             label="Term            "
// //             name="term"
// //             value={selectedTerm}
// //             onChange={(e) => setSelectedTerm(e.target.value)}
// //             options={activeTerms.map((term) => ({
// //               value: term.term,
// //               label: term.term,
// //             }))}
// //             required
// //           />

// //           {/* Date Input */}
// //           <InputField
// //             label="Date"
// //             name="date"
// //             type="date"
// //             value={selectedDate}
// //             onChange={(e) => setSelectedDate(e.target.value)}
// //             required
// //             className={`${
// //               selectedDate ? "text-black" : "text-transparent"
// //             } focus:text-black`}
// //           />

// //           {/* Total Marks Input */}
// //           <InputField
// //             label="Total Marks"
// //             name="totalMarks"
// //             type="text"
// //             value={totalMarks}
// //             onChange={(e) => setTotalMarks(e.target.value)}
// //             required
// //           />

// //           {/* Total Time Input */}
// //           <InputField
// //             label="Total Time"
// //             name="totalTime"
// //             type="text"
// //             value={totalTime}
// //             onChange={(e) => setTotalTime(e.target.value)}
// //             required
// //           />

// //           {/* Action Buttons */}
// //           <div className="mt-4 flex space-x-1 justify-evenly pb-4">
// //             <button
// //               title="Cancel"
// //               type="button"
// //               onClick={onCancel}
// //               className="bg-white text-red-500 px-6 py-2 mb-4 border rounded border-red-500 hover:text-white hover:bg-red-500 transition duration-200 ease-in-out"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               title="Reset"
// //               type="button"
// //               onClick={resetState}
// //               className="bg-gray-300 text-white px-7 py-2 mb-4 rounded hover:bg-gray-400 transition duration-200 ease-in-out"
// //             >
// //               Reset
// //             </button>
// //             <button
// //               title="Print Multiple Students per Page"
// //               type="button"
// //               onClick={() => {
// //                 setLoading(true); // Set loading state
// //                 handleMSPrint();
// //               }}
// //               disabled={loading} // Disable button during loading
// //               className="bg-green-600 border-green-600 text-white px-4 border py-2 mb-4 rounded hover:text-green-600 hover:bg-white transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
// //             >
// //               MS Print
// //             </button>
// //             <button
// //               title="Print Single Student per Page"
// //               type="button"
// //               onClick={() => {
// //                 setLoading(true); // Set loading state
// //                 handleSSPrint();
// //               }}
// //               disabled={loading} // Disable button during loading
// //               className="bg-[#2684ff] border-[#2684ff] text-white px-4 border py-2 mb-4 rounded hover:text-[#2684ff] hover:bg-white transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
// //             >
// //               SS Print
// //             </button>
// //           </div>
// //         </div>
// //       </Modal>

// //       {/* SS Print Content */}
// //       <div className="p-6 bg-[#fff] max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hidden">
// //         <div ref={ssprintRef} className="print-container bg-white">
// //           {filteredStudents.map((student, index) => {
// //             const className = classMap.get(student.classId) || "Unknown Class";
// //             const sectionName =
// //               sectionMap.get(student.sectionId) || "Unknown Section";

// //             return (
// //               <div
// //                 key={student.id}
// //                 className={index > 0 ? "break-before-page" : ""}
// //               >
// //                 <PaperHeader
// //                   logoSrc={logos[0]?.logoPhoto}
// //                   schoolName="The Allied Public School"
// //                   campusName="Main Campus"
// //                   term={selectedTerm}
// //                   studentPhotoSrc={student.profilePhoto}
// //                   studentName={student.name}
// //                   subjectName={selectedSubject}
// //                   className={className}
// //                   section={sectionName}
// //                   date={
// //                     selectedDate ||
// //                     new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
// //                   }
// //                   studentId={student.registrationNumber}
// //                   totalMarks={totalMarks}
// //                   totalTime={totalTime}
// //                 />
// //                 <div className="parsed-content pb-8 mb-2 bg-white">
// //                   {sanitizeContent(selectedContent)}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* MS Print Content */}
// //       <div className="p-6 bg-[#fff] max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hidden">
// //         <div ref={msprintRef} className="print-container bg-white">
// //           {filteredStudents.map((student, index) => {
// //             const className = classMap.get(student.classId) || "Unknown Class";
// //             const sectionName =
// //               sectionMap.get(student.sectionId) || "Unknown Section";

// //             return (
// //               <div key={student.id}>
// //                 <PaperHeader
// //                   logoSrc={logos[0]?.logoPhoto}
// //                   schoolName="The Allied Public School"
// //                   campusName="Main Campus"
// //                   term={selectedTerm}
// //                   studentPhotoSrc={student.profilePhoto}
// //                   studentName={student.name}
// //                   subjectName={selectedSubject}
// //                   className={className}
// //                   section={sectionName}
// //                   date={
// //                     selectedDate ||
// //                     new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
// //                   }
// //                   studentId={student.registrationNumber}
// //                   totalMarks={totalMarks}
// //                   totalTime={totalTime}
// //                 />
// //                 <div className="parsed-content pb-8 mb-2 bg-white">
// //                   {sanitizeContent(selectedContent)}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default React.memo(PrintPaper);



// ⁡⁣⁣⁢----------------------------- dated 27-03-25 ---------------------------------⁡

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useReactToPrint } from "react-to-print";
import PaperHeader from "./PaperHeader";
import { SelectField } from "../subMenus/SelectField";
import { InputField } from "../subMenus/InputField";
import ContentSelectField from "../subMenus/ContentSelectField";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

import {
  useClassStore,
  useSectionStore,
  useTermStore,
  useContentStore,
  useStudentStore,
  useLogoStore,
} from "../stores/store";
import Modal from "react-modal";
Modal.setAppElement("#root");

interface PrintPaperProps {
  onCancel: () => void;
}

const PrintPaper: React.FC<PrintPaperProps> = ({ onCancel }) => {
  const ssprintRef = useRef<HTMLDivElement>(null);
  const msprintRef = useRef<HTMLDivElement>(null);

  const chunkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mschunkRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [totalMarks, setTotalMarks] = useState<string>("");
  const [totalTime, setTotalTime] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Zustand stores
  const { classes, fetchClasses } = useClassStore();
  const { sections, fetchSections } = useSectionStore();
  const { entities: terms, fetchEntities: fetchTerms } = useTermStore();
  const { entities: editorContent, fetchEntities: fetchEditorContent } =
    useContentStore();
  const { entities: logos, fetchEntities: fetchLogos } = useLogoStore();
  const { students } = useStudentStore();

  // Filter active entities
  const activeClasses = useMemo(
    () => classes.filter((cls) => cls.isActive),
    [classes]
  );
  const activeSections = useMemo(
    () => sections.filter((sec) => sec.isActive),
    [sections]
  );
  const activeTerms = useMemo(
    () => terms.filter((term) => term.isActive),
    [terms]
  );
  const activeEditorContent = useMemo(
    () => editorContent.filter((content) => content.isActive),
    [editorContent]
  );
  const activeStudents = useMemo(
    () => students.filter((student) => student.isActive),
    [students]
  );

  // Memoized maps
  const classMap = useMemo(
    () => new Map(activeClasses.map((cls) => [cls.id, cls.className])),
    [activeClasses]
  );
  const sectionMap = useMemo(
    () => new Map(activeSections.map((sec) => [sec.id, sec.section])),
    [activeSections]
  );

  // Filter students
  const filteredStudents = useMemo(() => {
    return activeStudents.filter(
      (student) =>
        student.classId === selectedClass &&
        student.sectionId === selectedSection
    );
  }, [activeStudents, selectedClass, selectedSection]);

  // Split students into chunks of 50
  const studentChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < filteredStudents.length; i += 50) {
      chunks.push(filteredStudents.slice(i, i + 50));
    }
    return chunks;
  }, [filteredStudents]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchClasses(),
          fetchSections(),
          fetchTerms(),
          fetchEditorContent(),
          fetchLogos(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    fetchClasses,
    fetchSections,
    fetchTerms,
    fetchEditorContent,
    fetchLogos,
  ]);

  // Reset form state
  const [resetKey, setResetKey] = useState(0);
  const resetState = useCallback(() => {
    setSelectedClass(null);
    setSelectedSection(null);
    setSelectedContent([]);
    setSelectedTerm("");
    setSelectedDate("");
    setTotalMarks("");
    setTotalTime("");
    setResetKey((prevKey) => prevKey + 1);
  }, []);

  // Original preview handler
  const handlePreview = useCallback((target: HTMLIFrameElement) => {
    return new Promise<void>((resolve) => {
      console.log("forwarding print preview request...");
      const data =
        target.contentWindow?.document.documentElement.outerHTML || "";
      const blob = new Blob([data], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      window.electron.previewComponent(url, 1, (response: unknown) => {
        console.log("Preview response:", response);
        setLoading(false);
        resolve();
      });
    });
  }, []);

  const handleChunkedPreview = useCallback(
    () => {
      return new Promise<void>((resolve) => {
        console.log("starting chunked preview...");

        (async () => {
          try {
            for (let i = 0; i < studentChunks.length; i++) {
              const chunkElement = chunkRefs.current[i];
              if (!chunkElement) continue;

              const styles = Array.from(
                document.head.querySelectorAll('style, link[rel="stylesheet"]')
              )
                .map((el) => el.outerHTML)
                .join("\n");

              const data = `
                <!DOCTYPE html>
                <html>
                  <head>
                  <style>
                    @page {
                      size: A4;
                      margin: 4mm 3mm;
                    }
                  </style>
                    ${styles}
                  </head>
                  <body>${chunkElement.innerHTML}</body>
                </html>
              `;

              const blob = new Blob([data], {
                type: "text/html;charset=utf-8",
              });
              const url = URL.createObjectURL(blob);

              await new Promise<void>((chunkResolve) => {
                let totalFiles = `${i + 1}/${studentChunks.length}`;
                window.electron.previewComponent(url, totalFiles, () => {
                  URL.revokeObjectURL(url);
                  totalFiles = `${i + 1}/${studentChunks.length}`;
                  console.log(`Previewed chunk ${totalFiles}`);
                  chunkResolve();
                });
              });

              if (i < studentChunks.length - 1) {
                await new Promise((r) => setTimeout(r, 500));
              }
            }
          } catch (error) {
            console.error("Error during chunked preview:", error);
          } finally {
            setLoading(false);
            resolve();
          }
        })();
      });
    },
    [studentChunks]
  );

  const handlemsChunkedPreview = useCallback(
    () => {
      return new Promise<void>((resolve) => {
        console.log("starting chunked preview...");

        (async () => {
          try {
            for (let i = 0; i < studentChunks.length; i++) {
              const chunkElement = mschunkRefs.current[i];
              if (!chunkElement) continue;

              const styles = Array.from(
                document.head.querySelectorAll('style, link[rel="stylesheet"]')
              )
                .map((el) => el.outerHTML)
                .join("\n");

              const data = `
                <!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      @page {
                        size: A4;
                        margin: 4mm 3mm;
                      }
                    </style>
                    ${styles}
                  </head>
                  <body>${chunkElement.innerHTML}</body>
                </html>
              `;

              const blob = new Blob([data], {
                type: "text/html;charset=utf-8",
              });
              const url = URL.createObjectURL(blob);
              let mstotalFiles = `${i + 1}/${studentChunks.length}`;

              await new Promise<void>((chunkResolve) => {
                window.electron.previewComponent(url, mstotalFiles, () => {
                  URL.revokeObjectURL(url);
                  mstotalFiles = `${i + 1}/${studentChunks.length}`;
                  console.log(`Previewed chunk ${i + 1}/${mstotalFiles}`);
                  chunkResolve();
                });
              });

              if (i < studentChunks.length - 1) {
                await new Promise((r) => setTimeout(r, 500));
              }
            }
          } catch (error) {
            console.error("Error during chunked preview:", error);
          } finally {
            setLoading(false);
            resolve();
          }
        })();
      });
    },
    [studentChunks]
  );

  const handleSSPrint = useReactToPrint({
    contentRef:
      filteredStudents.length > 50
        ? { current: chunkRefs.current[0] }
        : ssprintRef,

    print: filteredStudents.length > 50 ? handleChunkedPreview : handlePreview,
  });

  const handleMSPrint = useReactToPrint({
    contentRef:
      filteredStudents.length > 50
        ? { current: mschunkRefs.current[0] }
        : msprintRef,
    print:
      filteredStudents.length > 50 ? handlemsChunkedPreview : handlePreview,
  });

  const sanitizeContent = useCallback((content: string) => {
    return parse(DOMPurify.sanitize(content));
  }, []);

  return (
    <div>
      {/* Full-screen loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4  border-[#c3c3c3]"></div>
        </div>
      )}

      {/* Print options form */}
      <div className="text-[#001435] border border-[#cfd3d8] bg-[#fff] shadow-lg px-10 mt-16 hover:animate-pulse-border-once max-w-xl w-full h-[calc(100%-60px)] mx-auto text-base font-paypalRegular z-50 rounded-md space-y-4">
        <h2 className="text-center landingPageHeading mb-4">
          Select Print Options
        </h2>

        <SelectField
          key={`class-${resetKey}`}
          label="Class"
          name="class"
          value={selectedClass ?? ""}
          onChange={(e) => setSelectedClass(Number(e.target.value))}
          options={activeClasses.map((cls) => ({
            value: cls.id,
            label: cls.className,
          }))}
          required
        />

        <SelectField
          key={`section-${resetKey}`}
          label="Section"
          name="section"
          value={selectedSection ?? ""}
          onChange={(e) => setSelectedSection(Number(e.target.value))}
          options={activeSections.map((sec) => ({
            value: sec.id,
            label: sec.section,
          }))}
          required
        />

        <SelectField
          key={`term-${resetKey}`}
          label="Term"
          name="term"
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          options={activeTerms.map((term) => ({
            value: term.term,
            label: term.term,
          }))}
          required
        />

        <InputField
          label="Date"
          name="date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
          className={`${
            selectedDate ? "text-black" : "text-transparent"
          } focus:text-black`}
        />

        <InputField
          label="Total Marks"
          name="totalMarks"
          type="text"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
          required
        />

        <InputField
          label="Total Time"
          name="totalTime"
          type="text"
          value={totalTime}
          onChange={(e) => setTotalTime(e.target.value)}
          required
        />

        <ContentSelectField
          key={`content-${resetKey}`}
          label="Content"
          name="content"
          value={selectedContent.join(", ") || ""}
          onChange={(e) => {
            const selectedOption = activeEditorContent.find(
              (content) => content.editorContent === e.target.value
            );
            setSelectedContent([
              e.target.value, // content value (editorContent)
              selectedOption?.contentName || "", // content label (contentName)
            ]);
          }}
          options={activeEditorContent.map((content) => ({
            value: content.editorContent,
            label: content.contentName,
          }))}
          required
        />

        <div className="mt-4 flex space-x-1 justify-evenly pb-4">
          <button
            title="Cancel"
            type="button"
            onClick={() => {
              onCancel();
            }}
            className="bg-white text-red-500 px-6 py-2 mb-4 border rounded border-red-500 hover:text-white hover:bg-red-500 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            title="Reset"
            type="button"
            onClick={resetState}
            className="bg-gray-300 text-white px-7 py-2 mb-4 rounded hover:bg-gray-400 transition duration-200 ease-in-out"
          >
            Reset
          </button>
          <button
            title="Print Multiple Students per Page"
            type="button"
            onClick={() => {
              setLoading(true);

              handleMSPrint();
            }}
            className="bg-green-600 border-green-600 text-white px-4 border py-2 mb-4 rounded hover:text-green-600 hover:bg-white transition duration-200 ease-in-out"
          >
            MS Print
          </button>
          <button
            title="Print Single Student per Page"
            type="button"
            onClick={() => {
              handleSSPrint();
              setLoading(true);
            }}
            className="bg-[#2684ff] border-[#2684ff] text-white px-4 border py-2 mb-4 rounded hover:text-[#2684ff] hover:bg-white transition duration-200 ease-in-out"
          >
            SS Print
          </button>
        </div>
      </div>

      {/* SS Print Content */}
      {filteredStudents.length <= 50 && (
        <div className="p-6 bg-[#fff] max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hidden">
          <div ref={ssprintRef} className="print-container bg-white">
            {filteredStudents.map((student, index) => {
              const className =
                classMap.get(student.classId) || "Unknown Class";
              const sectionName =
                sectionMap.get(student.sectionId) || "Unknown Section";

              return (
                <div
                  key={student.id}
                  className={index > 0 ? "break-before-page" : ""}
                >
                  <PaperHeader
                    logoSrc={logos[0]?.logoPhoto}
                    schoolName="The Allied Public School"
                    campusName="Main Campus"
                    term={selectedTerm}
                    studentPhotoSrc={student.profilePhoto}
                    studentName={student.name}
                    subjectName={selectedContent[1]}
                    className={className}
                    section={sectionName}
                    date={
                      selectedDate ||
                      new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
                    }
                    studentId={student.registrationNumber}
                    totalMarks={totalMarks}
                    totalTime={totalTime}
                  />
                  <div className="parsed-content pb-8 mb-2 bg-white">
                    {sanitizeContent(selectedContent.join(" "))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filteredStudents.length > 50 &&
        studentChunks.map((chunk, chunkIndex) => (
          <div
            key={`chunk-${chunkIndex}`}
            ref={(el) => (chunkRefs.current[chunkIndex] = el)}
            className="p-6 bg-[#fff] max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hidden"
          >
            <div className="print-container bg-white">
              {chunk.map((student, index) => {
                const className =
                  classMap.get(student.classId) || "Unknown Class";
                const sectionName =
                  sectionMap.get(student.sectionId) || "Unknown Section";

                return (
                  <div
                    key={student.id}
                    className={index > 0 ? "break-before-page" : ""}
                  >
                    <PaperHeader
                      logoSrc={logos[0]?.logoPhoto}
                      schoolName="The Allied Public School"
                      campusName="Main Campus"
                      term={selectedTerm}
                      studentPhotoSrc={student.profilePhoto}
                      studentName={student.name}
                     subjectName={selectedContent[1]}
                      className={className}
                      section={sectionName}
                      date={
                        selectedDate ||
                        new Date()
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")
                      }
                      studentId={student.registrationNumber}
                      totalMarks={totalMarks}
                      totalTime={totalTime}
                    />
                    <div className="parsed-content pb-8 mb-2 bg-white">
                      {sanitizeContent(selectedContent.join(" "))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

      {/* MS Print Content */}
      {filteredStudents.length <= 50 && (
        <div className="p-6 bg-[#fff] max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hidden">
          <div ref={msprintRef} className="print-container bg-white">
            {filteredStudents.map((student) => {
              const className =
                classMap.get(student.classId) || "Unknown Class";
              const sectionName =
                sectionMap.get(student.sectionId) || "Unknown Section";

              return (
                <div key={student.id}>
                  <PaperHeader
                    logoSrc={logos[0]?.logoPhoto}
                    schoolName="The Allied Public School"
                    campusName="Main Campus"
                    term={selectedTerm}
                    studentPhotoSrc={student.profilePhoto}
                    studentName={student.name}
                   subjectName={selectedContent[1]}
                    className={className}
                    section={sectionName}
                    date={
                      selectedDate ||
                      new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
                    }
                    studentId={student.registrationNumber}
                    totalMarks={totalMarks}
                    totalTime={totalTime}
                  />
                  <div className="parsed-content pb-8 mb-2 bg-white">
                    {sanitizeContent(selectedContent.join(" "))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filteredStudents.length > 50 &&
        studentChunks.map((chunk, chunkIndex) => (
          <div
            key={`chunk-${chunkIndex}`}
            ref={(el) => (mschunkRefs.current[chunkIndex] = el)}
            className="p-6 bg-[#fff] max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hidden"
          >
            <div className="print-container bg-white">
              {chunk.map((student) => {
                const className =
                  classMap.get(student.classId) || "Unknown Class";
                const sectionName =
                  sectionMap.get(student.sectionId) || "Unknown Section";

                return (
                  <div key={student.id}>
                    <PaperHeader
                      logoSrc={logos[0]?.logoPhoto}
                      schoolName="The Allied Public School"
                      campusName="Main Campus"
                      term={selectedTerm}
                      studentPhotoSrc={student.profilePhoto}
                      studentName={student.name}
                      subjectName={selectedContent[1]}
                      className={className}
                      section={sectionName}
                      date={
                        selectedDate ||
                        new Date()
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")
                      }
                      studentId={student.registrationNumber}
                      totalMarks={totalMarks}
                      totalTime={totalTime}
                    />
                    <div className="parsed-content pb-8 mb-2 bg-white">
                      {sanitizeContent(selectedContent.join(" "))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default React.memo(PrintPaper);

// ---------------------------------------------------------------------

// ⁡⁣⁣⁢---------- 31-03-25 -------------⁡
// Updated PrintPaper.tsx
// import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
// import { useReactToPrint } from "react-to-print";
// import PaperHeader from "./PaperHeader";
// import { SelectField } from "../subMenus/SelectField";
// import { InputField } from "../subMenus/InputField";
// import ContentSelectField from "../subMenus/ContentSelectField";
// import parse from "html-react-parser";
// import DOMPurify from "dompurify";
// import {
//   useClassStore,
//   useSectionStore,
//   useTermStore,
//   useContentStore,
//   useStudentStore,
//   useLogoStore,
// } from "../stores/store";
// import Modal from "react-modal";
// import { usePrintWorker } from "../hooks/usePrintWorker";

// Modal.setAppElement("#root");

// interface PrintPaperProps {
//   onCancel: () => void;
// }

// const PrintPaper: React.FC<PrintPaperProps> = ({ onCancel }) => {
//   // Refs for printing
//   const ssprintRef = useRef<HTMLDivElement>(null);
//   const msprintRef = useRef<HTMLDivElement>(null);
//   const chunkRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const mschunkRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Form state
//   const [selectedClass, setSelectedClass] = useState<number | null>(null);
//   const [selectedSection, setSelectedSection] = useState<number | null>(null);
//   const [selectedContent, setSelectedContent] = useState<string[]>([]);
//   const [selectedTerm, setSelectedTerm] = useState<string>("");
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [totalMarks, setTotalMarks] = useState<string>("");
//   const [totalTime, setTotalTime] = useState<string>("");

//   // Zustand stores
//   const { classes, fetchClasses } = useClassStore();
//   const { sections, fetchSections } = useSectionStore();
//   const { entities: terms, fetchEntities: fetchTerms } = useTermStore();
//   const { entities: editorContent, fetchEntities: fetchEditorContent } = useContentStore();
//   const { entities: logos, fetchEntities: fetchLogos } = useLogoStore();
//   const { students } = useStudentStore();

//   // Filter active entities
//   const activeClasses = useMemo(() => classes.filter((cls) => cls.isActive), [classes]);
//   const activeSections = useMemo(() => sections.filter((sec) => sec.isActive), [sections]);
//   const activeTerms = useMemo(() => terms.filter((term) => term.isActive), [terms]);
//   const activeEditorContent = useMemo(() => editorContent.filter((content) => content.isActive), [editorContent]);
//   const activeStudents = useMemo(() => students.filter((student) => student.isActive), [students]);

//   // Use our print worker
//   const { htmlChunks, preparePrintData, loading: workerLoading } = usePrintWorker();

//   // Filter students based on selected class and section
//   const filteredStudents = useMemo(() => {
//     return activeStudents.filter(
//       (student) =>
//         student.classId === selectedClass &&
//         student.sectionId === selectedSection
//     );
//   }, [activeStudents, selectedClass, selectedSection]);

//   // Fetch data on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       await Promise.all([
//         fetchClasses(),
//         fetchSections(),
//         fetchTerms(),
//         fetchEditorContent(),
//         fetchLogos(),
//       ]);
//     };
//     fetchData();
//   }, [fetchClasses, fetchSections, fetchTerms, fetchEditorContent, fetchLogos]);

//   // Reset form state
//   const [resetKey, setResetKey] = useState(0);
//   const resetState = useCallback(() => {
//     setSelectedClass(null);
//     setSelectedSection(null);
//     setSelectedContent([]);
//     setSelectedTerm("");
//     setSelectedDate("");
//     setTotalMarks("");
//     setTotalTime("");
//     setResetKey((prevKey) => prevKey + 1);
//   }, []);

//   // Handle preview with worker-generated content
//   const handlePreview = useCallback((target: HTMLIFrameElement, html: string) => {
//     return new Promise<void>((resolve) => {
//       const data = target.contentWindow?.document.documentElement.outerHTML || "";
//       const blob = new Blob([data], { type: "text/html;charset=utf-8" });
//       const url = URL.createObjectURL(blob);

//       window.electron.previewComponent(url, 1, (response: unknown) => {
//         console.log("Preview response:", response);
//         resolve();
//       });
//     });
//   }, []);

//   const handleChunkedPreview = useCallback((htmlChunks: string[]) => {
//     return new Promise<void>((resolve) => {
//       (async () => {
//         try {
//           for (let i = 0; i < htmlChunks.length; i++) {
//             const styles = Array.from(
//               document.head.querySelectorAll('style, link[rel="stylesheet"]')
//             )
//               .map((el) => el.outerHTML)
//               .join("\n");

//             const data = `
//               <!DOCTYPE html>
//               <html>
//                 <head>
//                   <style>
//                     @page {
//                       size: A4;
//                       margin: 4mm 3mm;
//                     }
//                   </style>
//                   ${styles}
//                 </head>
//                 <body>${htmlChunks[i]}</body>
//               </html>
//             `;

//             const blob = new Blob([data], { type: "text/html;charset=utf-8" });
//             const url = URL.createObjectURL(blob);
//             const totalFiles = `${i + 1}/${htmlChunks.length}`;

//             await new Promise<void>((chunkResolve) => {
//               window.electron.previewComponent(url, totalFiles, () => {
//                 URL.revokeObjectURL(url);
//                 console.log(`Previewed chunk ${totalFiles}`);
//                 chunkResolve();
//               });
//             });

//             if (i < htmlChunks.length - 1) {
//               await new Promise((r) => setTimeout(r, 500));
//             }
//           }
//         } catch (error) {
//           console.error("Error during chunked preview:", error);
//         } finally {
//           resolve();
//         }
//       })();
//     });
//   }, []);

//   // Prepare data for printing when button is clicked
//   const handlePrintPreparation = useCallback(async (printType: 'SS' | 'MS') => {
//     if (!selectedClass || !selectedSection || !selectedTerm || !selectedContent.length) {
//       console.error('Required fields are missing');
//       return;
//     }

//     preparePrintData(
//       filteredStudents,
//       activeClasses,
//       activeSections,
//       logos,
//       selectedTerm,
//       selectedContent,
//       selectedDate || new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
//       totalMarks,
//       totalTime,
//       printType
//     );
//   }, [
//     selectedClass,
//     selectedSection,
//     selectedTerm,
//     selectedContent,
//     selectedDate,
//     totalMarks,
//     totalTime,
//     filteredStudents,
//     activeClasses,
//     activeSections,
//     logos,
//     preparePrintData
//   ]);

//   // React-to-print handlers
//   const handleSSPrint = useReactToPrint({
//     contentRef: ssprintRef,
//     onBeforePrint: () => handlePrintPreparation('SS'),
//     print: async (target) => {
//       if (htmlChunks.length > 0) {
//         await handlePreview(target, htmlChunks[0]);
//       }
//     }
//   });

//   const handleMSPrint = useReactToPrint({
//     contentRef: msprintRef,
//     onBeforePrint: () => handlePrintPreparation('MS'),
//     print: async () => {
//       if (htmlChunks.length > 0) {
//         await handleChunkedPreview(htmlChunks);
//       }
//     }
//   });

//   const sanitizeContent = useCallback((content: string) => {
//     return parse(DOMPurify.sanitize(content));
//   }, []);

//   // Update print refs when htmlChunks change
//   useEffect(() => {
//     if (htmlChunks.length > 0) {
//       // Update the refs with the new HTML content
//       // This is a simplified version - you might need to adjust based on your exact needs
//       if (ssprintRef.current && htmlChunks.length === 1) {
//         ssprintRef.current.innerHTML = htmlChunks[0];
//       }
      
//       if (msprintRef.current && htmlChunks.length === 1) {
//         msprintRef.current.innerHTML = htmlChunks[0];
//       }
      
//       // For chunked printing, you'd update each chunk ref
//     }
//   }, [htmlChunks]);

//   return (
//     <div>
//       {/* Loading overlay */}
//       {(workerLoading) && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#c3c3c3]"></div>
//         </div>
//       )}

//       {/* Print options form (unchanged) */}
//       <div className="text-[#001435] border border-[#cfd3d8] bg-[#fff] shadow-lg px-10 mt-16 hover:animate-pulse-border-once max-w-xl w-full h-[calc(100%-60px)] mx-auto text-base font-paypalRegular z-50 rounded-md space-y-4">
//         {/* ... existing form JSX ... */}
//       </div>

//       {/* Print content containers */}
//       {htmlChunks.length === 1 && (
//         <>
//           <div className="hidden">
//             <div ref={ssprintRef} />
//             <div ref={msprintRef} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default React.memo(PrintPaper);

// ----------------------------------------------