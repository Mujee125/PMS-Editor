

// import { app, BrowserWindow, ipcMain } from "electron";

// import {
//   addStudent,
//   getAllStudents,
//   deleteStudentById,
//   addClass,
//   getClasses,
//   updateClass,
//   deleteClass,
//   toggleClassStatus,
//   addSection,
//   getSections,
//   deleteSection,
//   updateSection,
//   toggleSectionStatus,
//   addLogo,
//   getLogo,
//   updateLogo,
//   deleteLogo,
//   toggleLogoStatus,
//   addEditorContent,
//   getEditorContent,
//   deleteEditorContent,
//   toggleEditorContentStatus,
//   updateEditorContent,
//   getEditorContentById,
//   addSubject,
//   getSubjects,
//   updateSubject,
//   deleteSubject,
//   toggleSubjectStatus,
//   addTerm,
//   addSession,
//   getTerms,
//   getSessions,
//   updateTerm,
//   updateSession,
//   deleteTerm,
//   deleteSession,
//   toggleTermStatus,
//   toggleSessionStatus,
//   updateStudent,
//   toggleStudentStatus,
 
// } from "./database";

// declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
// declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;


// if (require("electron-squirrel-startup")) {
//   app.quit();
// }

// const createWindow = (): void => {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 1170,
//     height: 1123,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      
//     },
//     frame: false,
//   });
  
//   mainWindow.setMenu(null);

//   // mainWindow.webContents.openDevTools();
//   // and load the index.html of the app.
//   mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
//   ipcMain.on("window-minimize", () => mainWindow?.minimize());
//   ipcMain.on("window-maximize", () => {
//     if (mainWindow?.isMaximized()) {
//       mainWindow.unmaximize();
//     } else {
//       mainWindow?.maximize();
//     }
//   });
//   ipcMain.on("window-close", () => mainWindow?.close());
// };

// // IPC handlers for window controls

// app.on("ready", createWindow);




// // ⁡⁣⁣⁢new method start ⁡


// const printOptions = {
//   silent: false,
//   printBackground: false,
//   color: true,
//   margin: {
//     marginType: "printableArea",
//   },
//   landscape: false,
//   pagesPerSheet: 1,
//   collate: false,
//   copies: 1,
//   header: "Page header",
//   footer: "Developed by LEarn-TOgether Team",
// };

// //handle preview
// ipcMain.handle('previewComponent', (event, url) => {
//  let win: BrowserWindow | null = new BrowserWindow({ title: "Print Preview", show: false, autoHideMenuBar: true });


//   if (win) {
//     win.loadURL(url);
//   }


//  win.webContents.once('did-finish-load', () => {
//   win?.webContents.printToPDF(printOptions).then((data) => {
//     const  buf = Buffer.from(data);
//     const base64Data = buf.toString('base64');
//     const  url = 'data:application/pdf;base64,' + base64Data;

//     if (win) {
//       win.once('ready-to-show', () => {
//         if (win) {
//           win.show();
//         }
//         if (win) {
//           win.setTitle('Print Preview');
//         }
//       });
//     }
//     if (win) {
//       win.once('closed', () => {
//         win = null;
//       });
//     }
//      if (win) {
//        win.loadURL(url);
//      }
   

//    })
//    .catch((error) => {
//     console.log(error);
//    });
//  });
//  return 'shown preview window';
// });



// // ⁡⁣⁣⁢new method end⁡ 



// // Handle add student request
// ipcMain.handle("add-student", async (event, student) => {
//   return addStudent(student);
// });


// ipcMain.handle("update-student", async (_, id, studentData) => {
//   try {
//     await updateStudent(id, studentData);
//     return { success: true };
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Failed to update student", error);
//       return { success: false, error: error.message };
//     } else {
//       console.log("An unknown error occurred");
//     }
//   }
// });

// ipcMain.handle("get-all-students", async () => {
//   return getAllStudents();
// });

// ipcMain.handle("delete-by-id", async (event, id: number) => {
//   try {
//     const result = deleteStudentById(id); // Call the function and get the result
//     return result; // Return the result to the renderer process
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Failed to delete student", error);
//       return { success: false, error: error.message };
//     } else {
//       console.log("An unknown error occurred");
//       return { success: false, error: "An unknown error occurred" };
//     }
//   }
// });



// ipcMain.handle("add-class", async (_, className) => {
//   if (!className) {
//     console.error("className is null or undefined in ipcMain handler");
//     throw new Error("className cannot be empty");
//   }

//   return addClass(className);
// });

// ipcMain.handle("add-section", async (_, section) => {
//   if (!section) {
//     console.error("className is null or undefined in ipcMain handler");
//     throw new Error("className cannot be empty");
//   }
//   return addSection(section);
// });

// ipcMain.handle("add-term", async (_, term) => {
//   if (!term) {
//     console.error("term is null or undefined in ipcMain handler");
//     throw new Error("term cannot be empty");
//   }
//   return addTerm(term);
// });

// ipcMain.handle("add-session", async (_, session) => {
//   if (!session) {
//     console.error("session is null or undefined in ipcMain handler");
//     throw new Error("session cannot be empty");
//   }
//   return addSession(session);
// });

// ipcMain.handle("add-subject", async (_, subject) => {
//   if (!subject) {
//     console.error("subject is null or undefined in ipcMain handler");
//     throw new Error("subject cannot be empty");
//   }
//   return addSubject(subject);
// });

// ipcMain.handle("add-logo", async (_, logoData) => {
//   if (!logoData.logoPhoto) {
//     console.error("logoPhoto is null or undefined in ipcMain handler");
//     throw new Error("logoPhoto cannot be empty");
//   }

//   return addLogo(logoData);
// });

// ipcMain.handle("add-editor-content", (_, contentData) => {
//   console.log("success in add-editor-content in main");
//   console.log(contentData);
//   return addEditorContent(contentData);
// });

// // ⁡⁣⁣⁢GET ALL ENTRIES FUNCTIONS⁡

// ipcMain.handle("get-classes", getClasses);

// ipcMain.handle("get-sections", getSections);

// ipcMain.handle("get-terms", async () => {
//   return getTerms();
// });

// ipcMain.handle("get-sessions", async () => {
//   return getSessions();
// });

// ipcMain.handle("get-subjects", async () => {
//   return getSubjects();
// });

// ipcMain.handle("get-logo", getLogo);

// ipcMain.handle("get-editor-content", getEditorContent);

// ipcMain.handle("get-editor-content-by-id", async (_, id) =>
//   getEditorContentById(id)
// );
// // ⁡⁣⁣⁡⁣⁣⁢UPDATE ALL ENTRIES FUNCTIONS⁡



// ipcMain.handle("update-class", (_, id, className) =>
//   updateClass(id, className)
// );

// ipcMain.handle("update-section", (_, id, section) =>
//   updateSection(id, section)
// );

// ipcMain.handle("update-term", (_, id, term) => updateTerm(id, term));

// ipcMain.handle("update-session", (_, id, session) =>
//   updateSession(id, session)
// );

// ipcMain.handle("update-subject", async (_, id, subject) => {
//   updateSubject(id, subject);
// });

// ipcMain.handle("update-logo", (_, id, name) => updateLogo(id, name));

// ipcMain.handle("update-editor-content", (_, id, editorContent) =>
//   updateEditorContent(id, editorContent)
// );

// // ⁡⁣⁡⁣⁣⁢DELETE ENTRIES FUNCTIONS⁡

// ipcMain.handle("delete-class", (_, id) => deleteClass(id));

// ipcMain.handle("delete-section", (_, id) => deleteSection(id));

// ipcMain.handle("delete-subject", (_, id) => deleteSubject(id));

// ipcMain.handle("delete-logo", (_, id) => deleteLogo(id));

// ipcMain.handle("delete-term", (_, id) => deleteTerm(id));

// ipcMain.handle("delete-session", (_, id) => deleteSession(id));

// ipcMain.handle("delete-editor-content", async (_, id) =>
//   deleteEditorContent(id)
// );

// // ⁡⁣⁣⁢TOGGLE ENTRIES FUNCTIONS⁡

// ipcMain.handle("toggle-student-status", (_, id) => toggleStudentStatus(id));

// ipcMain.handle("toggle-class-status", (_, id) => toggleClassStatus(id));

// ipcMain.handle("toggle-section-status", (_, id) => toggleSectionStatus(id));

// ipcMain.handle("toggle-term-status", (_, id) => toggleTermStatus(id));

// ipcMain.handle("toggle-session-status", (_, id) => toggleSessionStatus(id));

// ipcMain.handle("toggle-subject-status", (_, id) => toggleSubjectStatus(id));

// ipcMain.handle("toggle-logo-status", (_, id) => toggleLogoStatus(id));

// ipcMain.handle("toggle-editor-content-status", (_, id) =>
//   toggleEditorContentStatus(id)
// );



// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });




import { app, BrowserWindow, ipcMain } from "electron";
import {
  default as installExtension,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import fs from "fs";
import {
  addStudent,
  getAllStudents,
  deleteStudentById,
  addClass,
  getClasses,
  updateClass,
  deleteClass,
  toggleClassStatus,
  addSection,
  getSections,
  deleteSection,
  updateSection,
  toggleSectionStatus,
  addLogo,
  getLogo,
  updateLogo,
  deleteLogo,
  toggleLogoStatus,
  addEditorContent,
  getEditorContent,
  deleteEditorContent,
  toggleEditorContentStatus,
  updateEditorContent,
  getEditorContentById,
  addSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  toggleSubjectStatus,
  addTerm,
  addSession,
  getTerms,
  getSessions,
  updateTerm,
  updateSession,
  deleteTerm,
  deleteSession,
  toggleTermStatus,
  toggleSessionStatus,
  updateStudent,
  toggleStudentStatus,
  closeDatabase,
} from "./database";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

// Ensure the database directory exists
const dbDir = app.getPath("userData");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1170,
    height: 1123,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, 
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    frame: false,
  });

  mainWindow.setMenu(null);

  // mainWindow.webContents.openDevTools();
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  ipcMain.on("window-minimize", () => mainWindow?.minimize());
  ipcMain.on("window-maximize", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.on("window-close", () => mainWindow?.close());
};
// Handle database cleanup on app quit
app.on("before-quit", () => {
  console.log("Performing cleanup before quitting...");
  closeDatabase(); // Close the database connection
});
// IPC handlers for window controls

// app.on("ready", createWindow);

app.on("ready", () => {
   app.commandLine.appendSwitch("js-flags", "--max-old-space-size=4096");
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  createWindow();
});

// session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
//   callback({
//     responseHeaders: {
//       ...details.responseHeaders,
//       "Content-Security-Policy": ["default-src 'none'"],
//     },
//   });
// });

// ⁡⁣⁣⁢new method start ⁡

const printOptions = {
  silent: false,
  printBackground: true,
  color: true,
  margin: {
    marginType: "custom",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pageSize: "A4" as const,
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
};

//handle preview
// ipcMain.handle('previewComponent', (event, url) => {
//  let win: BrowserWindow | null = new BrowserWindow({ width: 1170, height: 1123 ,title: "Print Preview", show: false, autoHideMenuBar: true });

//   if (win) {
//     win.loadURL(url);
//   }

//  win.webContents.once('did-finish-load', () => {
//   win?.webContents.printToPDF(printOptions).then((data) => {
//     const  buf = Buffer.from(data);
//     const base64Data = buf.toString('base64');
//     const  url = 'data:application/pdf;base64,' + base64Data;

//     if (win) {
//       win.once('ready-to-show', () => {
//         if (win) {
//           win.show();
//         }
//         if (win) {
//           win.setTitle('Print Preview');
//         }
//       });
//     }
//     if (win) {
//       win.once('closed', () => {
//         win = null;
//       });
//     }
//      if (win) {
//        win.loadURL(url);
//      }

//    })
//    .catch((error) => {
//     console.log(error);
//    });
//  });
//  return 'shown preview window';
// });

ipcMain.handle("previewComponent", async (event, url, totalFiles) => {
  let win: BrowserWindow | null = new BrowserWindow({
    width: 1170,
    height: 1123,
    title: "Print Preview",
    show: false,
    autoHideMenuBar: true,
  });
  win.setTitle("Print Preview"); // Set the title initially

  // Prevent title update when the URL changes
  win.on("page-title-updated", (event) => {
    event.preventDefault();
  });

  win.loadURL(url);

  win.webContents.once("did-finish-load", async () => {
    try {
      const data = await win?.webContents.printToPDF(printOptions);
      if (!data) {
        throw new Error("Failed to generate PDF data");
      }
      const buf = Buffer.from(data);
      const base64Data = buf.toString("base64");
      const pdfUrl = "data:application/pdf;base64," + base64Data;

      if (win) {
        win.once("ready-to-show", () => {
          if (win) {
            win.show();
            win.setTitle(`Print Preview ${totalFiles}`); // Reset title after loading PDF
          }
        });

        win.once("closed", () => {
          win = null;
        });

        win.loadURL(pdfUrl);
      }
    } catch (error) {
      console.log("Error generating PDF:", error);
    }
  });

  return "shown preview window";
});

ipcMain.handle("add-student", async (event, student) => {
  return addStudent(student);
});

ipcMain.handle("update-student", async (_, id, studentData) => {
  try {
    await updateStudent(id, studentData);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to update student", error);
      return { success: false, error: error.message };
    } else {
      console.log("An unknown error occurred");
    }
  }
});

ipcMain.handle("get-all-students", async () => {
  return getAllStudents();
});

// ipcMain.handle("get-all-students", async (_, offset = 0, limit = 500) => {
//   return getAllStudents(offset, limit);
// });


ipcMain.handle("delete-by-id", async (event, id: number) => {
  try {
    const result = deleteStudentById(id); // Call the function and get the result
    return result; // Return the result to the renderer process
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to delete student", error);
      return { success: false, error: error.message };
    } else {
      console.log("An unknown error occurred");
      return { success: false, error: "An unknown error occurred" };
    }
  }
});

ipcMain.handle("add-class", async (_, className) => {
  if (!className) {
    console.error("className is null or undefined in ipcMain handler");
    throw new Error("className cannot be empty");
  }

  return addClass(className);
});

ipcMain.handle("add-section", async (_, section) => {
  if (!section) {
    console.error("className is null or undefined in ipcMain handler");
    throw new Error("className cannot be empty");
  }
  return addSection(section);
});

ipcMain.handle("add-term", async (_, term) => {
  if (!term) {
    console.error("term is null or undefined in ipcMain handler");
    throw new Error("term cannot be empty");
  }
  return addTerm(term);
});

ipcMain.handle("add-session", async (_, session) => {
  if (!session) {
    console.error("session is null or undefined in ipcMain handler");
    throw new Error("session cannot be empty");
  }
  return addSession(session);
});

ipcMain.handle("add-subject", async (_, subject) => {
  if (!subject) {
    console.error("subject is null or undefined in ipcMain handler");
    throw new Error("subject cannot be empty");
  }
  return addSubject(subject);
});

ipcMain.handle("add-logo", async (_, logoData) => {
  if (!logoData.logoPhoto) {
    console.error("logoPhoto is null or undefined in ipcMain handler");
    throw new Error("logoPhoto cannot be empty");
  }

  return addLogo(logoData);
});

ipcMain.handle("add-editor-content", (_, contentData) => {
  console.log("success in add-editor-content in main");
  console.log(contentData);
  return addEditorContent(contentData);
});

// ⁡⁣⁣⁢GET ALL ENTRIES FUNCTIONS⁡

ipcMain.handle("get-classes", getClasses);

ipcMain.handle("get-sections", getSections);

ipcMain.handle("get-terms", async () => {
  return getTerms();
});

ipcMain.handle("get-sessions", async () => {
  return getSessions();
});

ipcMain.handle("get-subjects", async () => {
  return getSubjects();
});

ipcMain.handle("get-logo", getLogo);

ipcMain.handle("get-editor-content", getEditorContent);

ipcMain.handle("get-editor-content-by-id", async (_, id) =>
  getEditorContentById(id)
);
// ⁡⁣⁣⁡⁣⁣⁢UPDATE ALL ENTRIES FUNCTIONS⁡

ipcMain.handle("update-class", (_, id, className) =>
  updateClass(id, className)
);

ipcMain.handle("update-section", (_, id, section) =>
  updateSection(id, section)
);

ipcMain.handle("update-term", (_, id, term) => updateTerm(id, term));

ipcMain.handle("update-session", (_, id, session) =>
  updateSession(id, session)
);

ipcMain.handle("update-subject", async (_, id, subject) => {
  updateSubject(id, subject);
});

ipcMain.handle("update-logo", (_, id, name) => updateLogo(id, name));

ipcMain.handle("update-editor-content", (_, id, editorContent) =>
  updateEditorContent(id, editorContent)
);

// ⁡⁣⁡⁣⁣⁢DELETE ENTRIES FUNCTIONS⁡

ipcMain.handle("delete-class", (_, id) => deleteClass(id));

ipcMain.handle("delete-section", (_, id) => deleteSection(id));

ipcMain.handle("delete-subject", (_, id) => deleteSubject(id));

ipcMain.handle("delete-logo", (_, id) => deleteLogo(id));

ipcMain.handle("delete-term", (_, id) => deleteTerm(id));

ipcMain.handle("delete-session", (_, id) => deleteSession(id));

ipcMain.handle("delete-editor-content", async (_, id) =>
  deleteEditorContent(id)
);

// ⁡⁣⁣⁢TOGGLE ENTRIES FUNCTIONS⁡

ipcMain.handle("toggle-student-status", (_, id) => toggleStudentStatus(id));

ipcMain.handle("toggle-class-status", (_, id) => toggleClassStatus(id));

ipcMain.handle("toggle-section-status", (_, id) => toggleSectionStatus(id));

ipcMain.handle("toggle-term-status", (_, id) => toggleTermStatus(id));

ipcMain.handle("toggle-session-status", (_, id) => toggleSessionStatus(id));

ipcMain.handle("toggle-subject-status", (_, id) => toggleSubjectStatus(id));

ipcMain.handle("toggle-logo-status", (_, id) => toggleLogoStatus(id));

ipcMain.handle("toggle-editor-content-status", (_, id) =>
  toggleEditorContentStatus(id)
);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});




   
   

   
   