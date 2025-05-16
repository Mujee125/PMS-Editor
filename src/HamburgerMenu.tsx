// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import classNames from "classnames";
// import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
// type MenuItem = {
//   title: string;
//   path?: string;
  
//   subMenu?: {
//     title: string;
//     path: string;
  
//   }[];
// };

// interface HamburgerMenuProps {
//   isOpen: boolean;
//   toggleSidebar: () => void;
//   onMenuClick: (menu: string) => void;
// }

// const menuItems: MenuItem[] = [
//   {
//     title: "Data Portal",

//     subMenu: [
//       {
//         title: "Define Classes",
//         path: "/define/classes",
//       },
//       {
//         title: "Define Section",
//         path: "/define/section",
//       },
//       {
//         title: "Define Subject",
//         path: "/define/subject",
//       },
//       {
//         title: "Define Terms",
//         path: "/define/terms",
//       },
//       {
//         title: "Add Logo",
//         path: "/registration/add-logo",
//       },
//       // {
//       //   title: "Define Sessions",
//       //   path: "/define/sessions",
//       // },
//     ],
//   },
//   {
//     title: "Registration",

//     subMenu: [
//       {
//         title: "Register Student",
//         path: "/registration/register",
//       },
//       {
//         title: "Register CSV File",
//         path: "/registration/upload-students",
//       },
//     ],
//   },
//   {
//     title: "View Students",

//     subMenu: [
//       {
//         title: "Student Detail",
//         path: "/view/student-detail",
//       },
//     ],
//   },
//   {
//     title: "Examination",

//     subMenu: [
//       {
//         title: "Create Paper",
//         path: "/examination/create-paper",
//       },
//       {
//         title: "View Paper",
//         path: "/examination/view-paper",
//       },
//       {
//         title: "Print Paper",
//         path: "/examination/print-paper",
//       },
//     ],
//   },
// ];

// const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
//   isOpen,
//   toggleSidebar,
//   onMenuClick,
// }) => {
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);

//   const toggleSubMenu = (menuTitle: string) => {
//     setActiveMenu(activeMenu === menuTitle ? null : menuTitle);
//   };

//   const renderSubMenu = (
//     subMenu?: {
//       title: string;
//       path: string;
//     }[]
//   ) => {
//     return subMenu?.map((subItem, subIndex) => (
//       <div className="py-2 mx-2 border-b border-[#e6e0d9]">
//         <Link
//           key={subIndex}
//           to={subItem.path}
//           className={`block text-lg  font-paypalRegular  w-full px-2 py-3 text-left hover:font-paypalBold hover:text-[#0070e0]  hover:border hover:border-[#e6e0d9] hover:rounded-xl hover:py-[11px] hover:px-[7px]   text-[#001c64]   transition hover:animate-pulse-border-once`}
//           onClick={() => {
//             onMenuClick(subItem.title);
//             toggleSidebar();
//           }}
//         >
//           {subItem.title}
//         </Link>
//       </div>
//     ));
//   };

//   const renderMenuItem = (menu: MenuItem) => {
//     if (menu.path) {
//       return (
//         <Link
//           to={menu.path}
//           className="block w-full px-4 py-3 mt text-left text-[#001c64] hover:text-[#0070e0] hover:border  font-paypalBold
//           text-lg   transition border-b border-[#e6e0d9] "
//           onClick={() => {
//             onMenuClick(menu.title);
//             toggleSidebar(); // Close the sidebar
//           }}
//         >
//           {menu.title}
//         </Link>
//       );
//     } else {
//       return (
//         <div className="my-3 py-3 mx-2">
//           <button
//             onClick={() => toggleSubMenu(menu.title)}
//             className={`flex justify-between w-full px-4 py-3 font-paypalBold text-[#001c64] text-xl text-left  hover:text-[#0070e0] hover:bg-[#fff] hover:border hover:border-[#e6e0d9] hover:rounded-xl hover:py-[11px] hover:px-[15px] hover:animate-pulse-border-once `}
//           >
//             <span className={activeMenu === menu.title ? "text-[#0070e0] " : ""}>
//               {menu.title}
//             </span>
//             {activeMenu === menu.title ? (
//               <IoIosArrowDown className="w-6 h-6 mt-1 text-[#0070e0]" />
//             ) : (
//               <IoIosArrowForward className="w-6 h-6 mt-1" />
//             )}
//           </button>
//         </div>
//       );
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={toggleSidebar}
//         className=" fixed no-drag  p-1 top-[14px] left-2 focus:outline-none  hover:text-Downriver-900
//         hover:bg-white  rounded-full bg-[#001435] "
//       >
//         {isOpen ? (
//           <XMarkIcon className="h-[24px] w-[24px] text-white hover:text-Downriver-900 " />
//         ) : (
//           <Bars3Icon className="h-[24px] w-[24px] text-white hover:text-Downriver-900  " />
//         )}
//       </button>

//       <aside
//         className={classNames(
//           "fixed top-14 left-0 h-full w-[30%]  lg:w-[20%] bg-[#f1f2f3] text-[#001c64] transition-transform duration-300 z-40",
//           { "-translate-x-full": !isOpen }
//         )}
//       >
//         <nav className="mt-5 ">
//           {menuItems.map((menu, index) => (
//             <div key={index} className="mb-1 border-b border-[#e6e0d9]  ">
//               {renderMenuItem(menu)}

//               <div
//                 className={classNames("pl-6 bg-[#fff] text-lg transition-all", {
//                   "max-h-0 overflow-hidden": activeMenu !== menu.title,
//                   "max-h-96 animate-fade-in-down-once duration-300":
//                     activeMenu === menu.title,
//                 })}
//                 style={{ transition: "max-height 0.9s ease" }} // Add transition for smooth opening
//               >
//                 {renderSubMenu(menu.subMenu)}
//               </div>
//             </div>
//           ))}
//         </nav>
//       </aside>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black  opacity-50 z-30" // Adjust z-index
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default HamburgerMenu;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
type MenuItem = {
  title: string;
  path?: string;

  subMenu?: {
    title: string;
    path: string;
  }[];
};

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onMenuClick: (menu: string) => void;
}

const menuItems: MenuItem[] = [
  {
    title: "Data Portal",

    subMenu: [
      {
        title: "Define Classes",
        path: "/define/classes",
      },
      {
        title: "Define Section",
        path: "/define/section",
      },
      {
        title: "Define Subject",
        path: "/define/subject",
      },
      {
        title: "Define Terms",
        path: "/define/terms",
      },
      {
        title: "Add Logo",
        path: "/registration/add-logo",
      },
      // {
      //   title: "Define Sessions",
      //   path: "/define/sessions",
      // },
    ],
  },
  {
    title: "Registration",

    subMenu: [
      {
        title: "Register Student",
        path: "/registration/register",
      },
      {
        title: "Register CSV File",
        path: "/registration/upload-students",
      },
    ],
  },
  {
    title: "View Students",

    subMenu: [
      {
        title: "Student Detail",
        path: "/view/student-detail",
      },
    ],
  },
  {
    title: "Examination",

    subMenu: [
      {
        title: "Create Paper",
        path: "/examination/create-paper",
      },
      {
        title: "View Paper",
        path: "/examination/view-paper",
      },
      {
        title: "Print Paper",
        path: "/examination/print-paper",
      },
    ],
  },
];

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  toggleSidebar,
  onMenuClick,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleSubMenu = (menuTitle: string) => {
    setActiveMenu(activeMenu === menuTitle ? null : menuTitle);
  };

  // const renderSubMenu = (
  //   subMenu?: {
  //     title: string;
  //     path: string;
  //   }[]
  // ) => {
  //   return subMenu?.map((subItem, subIndex) => (
  //     <div className="py-2 mx-2 border-b border-[#e6e0d9]">
  //       <Link
  //         key={subIndex}
  //         to={subItem.path}
  //         className={`block text-lg  font-paypalRegular  w-full px-2 py-3 text-left hover:font-paypalBold hover:text-[#0070e0]  hover:border hover:border-[#e6e0d9] hover:rounded-xl hover:py-[11px] hover:px-[7px]   text-[#001c64]   transition hover:animate-pulse-border-once`}
  //         onClick={() => {
  //           onMenuClick(subItem.title);
  //           toggleSidebar();
  //         }}
  //       >
  //         {subItem.title}
  //       </Link>
  //     </div>
  //   ));
  // };

  const renderSubMenu = (subMenu?: { title: string; path: string }[]) => {
    return subMenu?.map((subItem, subIndex) => (
      <div
        key={`subMenu-${subItem.title}-${subIndex}`}
        className="py-2 mx-2 border-b border-[#e6e0d9]"
      >
        <Link
          to={subItem.path}
          className="block text-lg font-paypalRegular w-full px-2 py-3 text-left hover:font-paypalBold hover:text-[#0070e0] hover:border hover:border-[#e6e0d9] hover:rounded-xl hover:py-[11px] hover:px-[7px] text-[#001c64] transition hover:animate-pulse-border-once"
          onClick={() => {
            onMenuClick(subItem.title);
            toggleSidebar();
          }}
        >
          {subItem.title}
        </Link>
      </div>
    ));
  };

  const renderMenuItem = (menu: MenuItem) => {
    if (menu.path) {
      return (
        <Link
          to={menu.path}
          className="block w-full px-4 py-3 mt text-left text-[#001c64] hover:text-[#0070e0] hover:border  font-paypalBold
          text-lg   transition border-b border-[#e6e0d9] "
          onClick={() => {
            onMenuClick(menu.title);
            toggleSidebar(); // Close the sidebar
          }}
        >
          {menu.title}
        </Link>
      );
    } else {
      return (
        <div className="my-3 py-3 mx-2">
          <button
            onClick={() => toggleSubMenu(menu.title)}
            className={`flex justify-between w-full px-4 py-3 font-paypalBold text-[#001c64] text-xl text-left  hover:text-[#0070e0] hover:bg-[#fff] hover:border hover:border-[#e6e0d9] hover:rounded-xl hover:py-[11px] hover:px-[15px] hover:animate-pulse-border-once `}
          >
            <span
              className={activeMenu === menu.title ? "text-[#0070e0] " : ""}
            >
              {menu.title}
            </span>
            {activeMenu === menu.title ? (
              <IoIosArrowDown className="w-6 h-6 mt-1 text-[#0070e0]" />
            ) : (
              <IoIosArrowForward className="w-6 h-6 mt-1" />
            )}
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className=" fixed no-drag  p-1 top-[14px] left-2 focus:outline-none  hover:text-Downriver-900
        hover:bg-white  rounded-full bg-[#001435] "
      >
        {isOpen ? (
          <XMarkIcon className="h-[24px] w-[24px] text-white hover:text-Downriver-900 " />
        ) : (
          <Bars3Icon className="h-[24px] w-[24px] text-white hover:text-Downriver-900  " />
        )}
      </button>

      <aside
        className={classNames(
          "fixed top-14 left-0 h-full w-[30%]  lg:w-[20%] bg-[#f1f2f3] text-[#001c64] transition-transform duration-300 z-40",
          { "-translate-x-full": !isOpen }
        )}
      >
        <nav className="mt-5 ">
          {menuItems.map((menu, index) => (
            <div key={index} className="mb-1 border-b border-[#e6e0d9]  ">
              {renderMenuItem(menu)}

              <div
                className={classNames("pl-6 bg-[#fff] text-lg transition-all", {
                  "max-h-0 overflow-hidden": activeMenu !== menu.title,
                  "max-h-96 animate-fade-in-down-once duration-300":
                    activeMenu === menu.title,
                })}
                style={{ transition: "max-height 0.9s ease" }} // Add transition for smooth opening
              >
                {renderSubMenu(menu.subMenu)}
              </div>
            </div>
          ))}
        </nav>
      </aside>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black  opacity-50 z-30" // Adjust z-index
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default HamburgerMenu;
