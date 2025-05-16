// src/components/LandingPage.tsx
import React from "react";

import {  PiExam, PiBooks } from "react-icons/pi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import {
  PrinterIcon,
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { AiOutlinePartition } from "react-icons/ai";

interface LandingPageProps {
  navigate: (path: string) => void;
  handleLandingPageMenuClick: (menuName: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  navigate,
  handleLandingPageMenuClick,
}) => {
  const handleLinkClick = (path: string) => {
    navigate(path); // Programmatically navigate to the specified path
  };
  return (
    <div className="  mt-4 text-lg bg-[#f1f2f3]  min-h-screen rounded-md">
      {/* Main Content Section */}

      <main className=" p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {/* Button for Define Classes */}
          <button
            onClick={() => {
              handleLinkClick("/define/classes");
              handleLandingPageMenuClick("Define");
            }}
            className="landingPageButton"
          >
            <h1 className="landingPageHeading   ">Define Classes</h1>
            <div className="flex flex-row font-primary text-lg">
              <SiGoogleclassroom className="h-20 w-20 mr-3 pb-6 text-[#003087] " />
              <p className="text-xl sm:text-lg text-start font-bold">
                Define classes such as Pre-Nursery, Nursery, KG... etc.
              </p>
            </div>
          </button>

          {/* Button for Define Section */}
          <button
            onClick={() => {
              handleLinkClick("/define/section");
              handleLandingPageMenuClick("Define");
            }}
            className="landingPageButton"
          >
            <h1 className="landingPageHeading   ">Define Section</h1>
            <div className="flex flex-row font-primary text-lg">
              <AiOutlinePartition className="h-20 w-20 mr-3 pb-6 text-[#003087] " />
              <p className="text-xl sm:text-lg text-start font-bold">
                Define Sections of a Class such as A, B, C... etc.
              </p>
            </div>
          </button>

          {/* Button for Define Subject */}
          <button
            onClick={() => {
              handleLinkClick("/define/subject");
              handleLandingPageMenuClick("Define");
            }}
            className="landingPageButton"
          >
            <h1 className="landingPageHeading   ">Define Subject</h1>
            <div className="flex flex-row font-primary text-lg">
              <PiBooks className="h-20 w-20 mr-3 pb-6 text-[#003087] " />
              <p className="text-xl sm:text-lg text-start font-bold">
                Define Subjects such as English, Urdu, Science... etc.
              </p>
            </div>
          </button>

          {/* Button for Define Terms */}
          <button
            onClick={() => {
              handleLinkClick("/define/terms");
              handleLandingPageMenuClick("Define");
            }}
            className="landingPageButton"
          >
            <h1 className="landingPageHeading   ">Define Terms</h1>
            <div className="flex flex-row font-primary text-lg">
              <MdOutlineFormatListNumbered className="h-20 w-20 mr-3 pb-6 text-[#003087] " />
              <p className="text-xl sm:text-lg text-start font-bold">
                Define classes, Terms, Sessions,Sections etc.
              </p>
            </div>
          </button>

          {/* Button for Add Student */}
          <button
            onClick={() => {
              handleLinkClick("/registration/register");
              handleLandingPageMenuClick("Registration");
            }}
            className="landingPageButton"
          >
            <h1 className="landingPageHeading ">Add Student</h1>
            <div className="flex flex-row font-primary text-lg">
              <UserPlusIcon className="h-20 w-20 mr-3 pb-6 text-[#003087]" />
              <p className="landingPagePara">
                Add new student details and manage records.
              </p>
            </div>
          </button>

          {/* Button for View Students */}
          <button
            onClick={() => {
              handleLinkClick("/view/student-detail");
              handleLandingPageMenuClick("View");
            }}
            className="landingPageButton"
          >
            <h1 className="landingPageHeading   ">View Students</h1>
            <div className="flex flex-row font-primary text-lg">
              <UserGroupIcon className="h-20 w-20 mr-3 pb-6 text-[#003087] " />
              <p className="text-xl sm:text-lg text-start font-bold">
                View already registered students records.
              </p>
            </div>
          </button>

          {/* Button for Examination */}
          <button
            onClick={() => {
              handleLinkClick("/examination/create-paper");
              handleLandingPageMenuClick("Create Paper");
            }}
            className="landingPageButton"
          >
            <h1 className="landingPageHeading   ">Create Paper</h1>
            <div className="flex flex-row font-primary text-lg">
              <PiExam className="h-20 w-20 mr-3 pb-6  text-[#003087]" />
              <p className="text-xl sm:text-lg text-start font-bold">
                Create and View and edit examination papers.
              </p>
            </div>
          </button>

          {/* Button for Terms */}
          <button
            onClick={() => {
              handleLinkClick("/examination/view-paper");
              handleLandingPageMenuClick("View Paper");
            }}
            className="landingPageButton"
          >
            <h1 className="landingPageHeading   ">View Papers</h1>
            <div className="flex flex-row font-primary text-lg">
              <LiaClipboardListSolid className="h-20 w-20 mr-3 pb-6 text-[#003087] " />
              <p className="text-xl sm:text-lg text-start font-bold">
                View already created Papers and edit them.
              </p>
            </div>
          </button>

          {/* Button for Settings */}
          <button
            onClick={() => {
              handleLinkClick("/examination/print-paper");
              handleLandingPageMenuClick("Print Paper");
            }}
            className="landingPageButton"
          >
            <h1 className="landingPageHeading   ">Print Paper</h1>
            <div className="flex flex-row font-primary text-lg">
              <PrinterIcon className="h-20 w-20 mr-3 pb-6 text-[#003087]" />
              <p className="text-xl sm:text-lg text-start font-bold">
                Select options or content to print on Paper.
              </p>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
