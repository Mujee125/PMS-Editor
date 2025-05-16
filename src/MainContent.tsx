import React, { ReactNode } from "react";

interface MainContentProps {
  isSidebarOpen: boolean;
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({
  isSidebarOpen,
  children,
}) => {
  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? "ml-[30%]  lg:ml-[20%] " : "ml-0"
      } my-9 rounded-md  h-[100%] `}
    >
      {children}
    </div>
  );
};

export default MainContent;
