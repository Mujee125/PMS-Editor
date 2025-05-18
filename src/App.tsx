// import {
//   HashRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
// } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import HamburgerMenu from "./HamburgerMenu";
// import WindowControl from "./WindowControl";
// import MainContent from "./MainContent";
// import StudentRegistrationForm from "./subMenus/StudentRegistrationForm";
// import {
//   EditorContentEntity,
//   LogoEntity,
//   StudentData,
// } from "./subMenus/types";

// import StudentTable from "./subMenus/StudentTable";

// import EntityManager from "./subMenus/EntityManager";
// import EntityManagerSection from "./subMenus/EntityManagerSection";

// import EntityManagerLogo from "./subMenus/EntityManagerLogo";
// import RichSunEditor from "./editor/RichSunEditor";
// import EntityManagerContent from "./subMenus/EntityManagerContent";
// import PrintPaper from "./editor/PrintPaper";

// import EntityManagerSubject from "./subMenus/EntityManagerSubject";
// import EntityManagerTerm from "./subMenus/EntityManagerTerm";
// import EntityManagerSession from "./subMenus/EntityManagerSession";
// import LandingPage from "./subMenus/LandingPage";
// import UploadStudents from "./subMenus/UploadStudents";
// import {
//   useClassStore,
//   useStudentStore,
//   useEditingStudentStore,
// } from "./stores/store";
// import SlecIcon from "./SlecIcon";

// const App: React.FC = () => {
//   const { fetchClasses } = useClassStore();
//   const { fetchStudents } = useStudentStore();
//   const { editingStudent } = useEditingStudentStore();

//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     isSidebarOpen: false,
//     students: [] as StudentData[],
//     isFormVisible: false,
//     logos: [] as LogoEntity[],
//     contents: [] as EditorContentEntity[],
//   });

//   // ⁡⁢⁣⁢useStates functions⁡
//   const [showEditor, setShowEditor] = useState(false);

//   const [editorData, setEditorData] = useState<EditorContentEntity[]>([]);

//   const [content, setContent] = useState<boolean>(false);

//   const [activeMenu, setActiveMenu] = useState<string>("landing");

//   useEffect(() => {
//     fetchClasses();
//     fetchStudents();
//   }, [fetchClasses, fetchStudents]);

//   const handleLandingPageMenuClick = (menu: string) => {
//     setActiveMenu(menu);
//   };

//   const toggleSidebar = () => {
//     setState((prev) => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
//     setContent(!content);
//   };

//   const handleCancel = () => {
//     setActiveMenu("landing");
//   };

//   // ⁡⁣⁣⁢getting the data from the database table⁡

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   // ⁡⁢⁣⁢fetching functions⁡

//   const addContentEntity = async (contentData: EditorContentEntity) => {
//     console.log("contentdata", contentData);
//     try {
//       const addedContent = await window.api.addEditorContent(contentData);
//       setShowEditor(!showEditor);
//       console.log("addedContent", addedContent);
//       console.log("name: ", addedContent.contentName);
//       loadEditorContentOptions();
//     } catch (error) {
//       console.error("Failed to add content:", error);
//     }
//   };

  

//   const loadEditorContentOptions = async () => {
//     try {
//       const contents = await window.api.getEditorContent();
//       const activeContent: EditorContentEntity[] = contents
//         .filter((cls: EditorContentEntity) => cls.isActive)
//         .map((cls: EditorContentEntity) => ({
//           id: cls.id,
//           contentName: cls.contentName,
//           editorContent: cls.editorContent,
//           isActive: cls.isActive,
//         }));

//       setEditorData(activeContent);
//     } catch (error) {
//       console.error("Error loading class options:", error);
//     }
//   };

//   const handleMenuClick = (menu: string) => {
//     setActiveMenu(menu);
//   };

//   return (
//     <>
//       <div className=" fixed top-0 left-0 w-full flex justify-evenly  px-4 py-2 text-white  shadow bg-[#001435]  drag z-20 border-b border-[lightgray]">
//         <HamburgerMenu
//           isOpen={state.isSidebarOpen}
//           toggleSidebar={toggleSidebar}
//           onMenuClick={handleMenuClick}
//         />

//         <span
//           className="flex tracking-widest text-lg cursor-pointer text-[white] font-bay-tavern space-x-1 group"
//           style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
//           onClick={() => handleMenuClick("landing")}
//         >
//           <SlecIcon className="items-center mt-[3px]  group-hover:fill-[#b8e9ff]" />
//           <span className="text-4xl group-hover:text-[#b8e9ff]">PMS</span>
//         </span>
//         <WindowControl />
//       </div>
//       <div id="main" className="pt-8 ">
//         <MainContent isSidebarOpen={state.isSidebarOpen}>
//           {activeMenu === "landing" && (
//             <LandingPage
//               navigate={navigate}
//               handleLandingPageMenuClick={handleLandingPageMenuClick}
//             />
//           )}

//           <Routes>
//             {activeMenu !== "landing" && (
//               <>
//                 {/* ⁡⁣⁣⁢Students Registration ⁡ */}

//                 <Route
//                   path="/registration/register"
//                   element={
//                     <StudentRegistrationForm
//                       onCancel={handleCancel}
//                       editingStudent={editingStudent}
//                     />
//                   }
//                 />

//                 <Route
//                   path="/registration/upload-students"
//                   element={<UploadStudents onCancel={handleCancel} />}
//                 />

//                 <Route
//                   path="/registration/add-logo"
//                   element={<EntityManagerLogo entityName={"Logo"} />}
//                 />

//                 {/*=== ⁡⁣⁣⁢Student Table⁡ ===*/}

//                 <Route path="/view/student-detail" element={<StudentTable />} />

//                 <Route
//                   path="/define/classes"
//                   element={<EntityManager entityName="Class" />}
//                 />
//                 <Route
//                   path="/define/section"
//                   element={<EntityManagerSection entityName="Section" />}
//                 />
//                 <Route
//                   path="/define/subject"
//                   element={<EntityManagerSubject entityName={"Subject"} />}
//                 />

//                 <Route
//                   path="/define/terms"
//                   element={<EntityManagerTerm entityName={"Term"} />}
//                 />

//                 <Route
//                   path="/define/sessions"
//                   element={<EntityManagerSession entityName={"Session"} />}
//                 />

//                 <Route
//                   path="/examination/create-paper"
//                   element={
//                     <RichSunEditor
//                       saveContentToDatabase={addContentEntity}
//                       onCancel={handleCancel}
//                     />
//                   }
//                 />
//                 <Route
//                   path="/examination/view-paper"
//                   element={
//                     <EntityManagerContent
//                       entityName={"Question Papers"}
//                       onCancel={handleCancel}
//                     />
//                   }
//                 />

//                 <Route
//                   path="/examination/print-paper"
//                   element={<PrintPaper onCancel={handleCancel} />}
//                 />
//               </>
//             )}
//           </Routes>
//         </MainContent>
//       </div>
//     </>
//   );
// };

// const AppWrapper = () => {
//   return (
//     <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
//       <App />
//     </Router>
//   );
// };

// export default AppWrapper;
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState, lazy, Suspense } from "react";
import HamburgerMenu from "./HamburgerMenu";
import WindowControl from "./WindowControl";
import MainContent from "./MainContent";
import StudentRegistrationForm from "./subMenus/StudentRegistrationForm";
import { EditorContentEntity, LogoEntity, StudentData } from "./subMenus/types";
// import StudentTable from "./subMenus/StudentTable";
const StudentTable = lazy(() => import("./subMenus/StudentTable"));
import EntityManager from "./subMenus/EntityManager";
import EntityManagerSection from "./subMenus/EntityManagerSection";
import EntityManagerLogo from "./subMenus/EntityManagerLogo";
import RichSunEditor from "./editor/RichSunEditor";
import EntityManagerContent from "./subMenus/EntityManagerContent";
import PrintPaper from "./editor/PrintPaper";
import EntityManagerSubject from "./subMenus/EntityManagerSubject";
import EntityManagerTerm from "./subMenus/EntityManagerTerm";
import EntityManagerSession from "./subMenus/EntityManagerSession";
import LandingPage from "./subMenus/LandingPage";
import UploadStudents from "./subMenus/UploadStudents";
import {
  useClassStore,
  useStudentStore,
  useEditingStudentStore,
} from "./stores/store";
import SlecIcon from "./SlecIcon";
import Loading from "./Loading";

const App: React.FC = () => {
  const { fetchClasses } = useClassStore();
  const { fetchStudents } = useStudentStore();
  const { editingStudent } = useEditingStudentStore();

  const navigate = useNavigate();
  const [state, setState] = useState({
    isSidebarOpen: false,
    students: [] as StudentData[],
    isFormVisible: false,
    logos: [] as LogoEntity[],
    contents: [] as EditorContentEntity[],
  });

  const [showEditor, setShowEditor] = useState(false);
  const [editorData, setEditorData] = useState<EditorContentEntity[]>([]);
  const [content, setContent] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>("landing");

  useEffect(() => {
    fetchClasses();
    fetchStudents(); // Fetch students with offset and limit

    // Handle initial route
    const initialPath = window.location.hash.replace("#", "") || "/";
    if (initialPath === "/") {
      setActiveMenu("landing");
    }
  }, [fetchClasses, fetchStudents]);

  const handleLandingPageMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const toggleSidebar = () => {
    setState((prev) => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
    setContent(!content);
  };

  const handleCancel = () => {
    setActiveMenu("landing");
    navigate("/");
  };

  useEffect(() => {
    fetchStudents(); // Fetch students with offset and limit
  }, []);

  const addContentEntity = async (contentData: EditorContentEntity) => {
    try {
      const addedContent = await window.api.addEditorContent(contentData);
      setShowEditor(!showEditor);
      loadEditorContentOptions();
    } catch (error) {
      console.error("Failed to add content:", error);
    }
  };

  const loadEditorContentOptions = async () => {
    try {
      const contents = await window.api.getEditorContent();
      const activeContent: EditorContentEntity[] = contents
        .filter((cls: EditorContentEntity) => cls.isActive)
        .map((cls: EditorContentEntity) => ({
          id: cls.id,
          contentName: cls.contentName,
          editorContent: cls.editorContent,
          isActive: cls.isActive,
        }));

      setEditorData(activeContent);
    } catch (error) {
      console.error("Error loading class options:", error);
    }
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    if (menu === "landing") {
      navigate("/");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-evenly px-4 py-2 text-white shadow bg-[#001435] drag z-20 border-b border-[lightgray]">
        <HamburgerMenu
          isOpen={state.isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onMenuClick={handleMenuClick}
        />

        <span
          className="flex tracking-widest text-lg cursor-pointer text-[white] font-bay-tavern space-x-1 group transform transition-transform duration-200 hover:scale-105"
          style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
          onClick={() => handleMenuClick("landing")}
        >
          <SlecIcon className="items-center mt-[3px] group-hover:fill-[#b8e9ff]" />
          <span className="text-4xl group-hover:text-[#b8e9ff]">PMS</span>
        </span>
        <WindowControl />
      </div>
      <div id="main" className="pt-8">
        <MainContent isSidebarOpen={state.isSidebarOpen}>
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  navigate={navigate}
                  handleLandingPageMenuClick={handleLandingPageMenuClick}
                />
              }
            />

            {/* Student Registration */}
            <Route
              path="/registration/register"
              element={
                <StudentRegistrationForm
                  onCancel={handleCancel}
                  editingStudent={editingStudent}
                />
              }
            />

            <Route
              path="/registration/upload-students"
              element={<UploadStudents onCancel={handleCancel} />}
            />

            <Route
              path="/registration/add-logo"
              element={<EntityManagerLogo entityName={"Logo"} />}
            />

            {/* Student Table */}
            <Route
              path="/view/student-detail"
              element={
                <Suspense fallback={<Loading />}>
                  <StudentTable />
                </Suspense>
              }
            />

            {/* Define Entities */}
            <Route
              path="/define/classes"
              element={<EntityManager entityName="Class" />}
            />
            <Route
              path="/define/section"
              element={<EntityManagerSection entityName="Section" />}
            />
            <Route
              path="/define/subject"
              element={<EntityManagerSubject entityName={"Subject"} />}
            />
            <Route
              path="/define/terms"
              element={<EntityManagerTerm entityName={"Term"} />}
            />
            <Route
              path="/define/sessions"
              element={<EntityManagerSession entityName={"Session"} />}
            />

            {/* Examination */}
            <Route
              path="/examination/create-paper"
              element={
                <RichSunEditor
                  saveContentToDatabase={addContentEntity}
                  onCancel={handleCancel}
                />
              }
            />
            <Route
              path="/examination/view-paper"
              element={
                <EntityManagerContent
                  entityName={"Question Papers"}
                  onCancel={handleCancel}
                />
              }
            />
            <Route
              path="/examination/print-paper"
              element={<PrintPaper onCancel={handleCancel} />}
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainContent>
      </div>
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      basename="/"
    >
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppWrapper;