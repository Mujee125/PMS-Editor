// import React from "react";


// interface PaperHeaderProps {
//   logoSrc: string; // URL or path to the school logo
//   schoolName: string;
//   campusName: string;
//   term: string;
//   studentPhotoSrc: string; // URL or path to the student's photo
//   studentName: string;
//   subjectName: string;
//   className: string;
//   date: string;
//   totalMarks: string;
//   totalTime: string;
//   studentId: string;
//   section: string; // Section of the student
// }

// const PaperHeader: React.FC<PaperHeaderProps> = ({
//   logoSrc,
//   schoolName,
//   campusName,
//   term,
//   studentPhotoSrc,
//   studentName,
//   subjectName,
//   className,
//   date,
//   totalMarks,
//   totalTime,
//   studentId,
//   section,
// }) => {
//   return (
//     <div className="text-[#000]  text-lg bg-[#fff]  ">
//       {/* Top Row: Logo and School Information */}
//       <div className="flex justify-between">
//         {/* School Logo */}
//         <div className="flex gap-2">
//           <img
//             src={logoSrc}
//             alt="Please Upload Logo or Active Logo"
//             className="justify-start w-24 h-24 object-cover"
//           />
        

//           {/* School Details */}
//           <div className="flex flex-col justify-center gap-y-0.5">
//             <p className="-mb-0.5 font-bay-tavern uppercase tracking-widest">
//               {schoolName}
//             </p>
//             <p className="-mb-0.5">{campusName}</p>
//             <p className="font-corsiva">( A Partner of SLEC )</p>
//           </div>
//         </div>
//         <div className="">
//           <p className="mt-6 text-start mr-80">
//             ( <span className="font-paypalBold font-extralight">Term: </span>
//             <span className="font-paypalRegular font-thin">{term}</span> )
//           </p>
//         </div>
//         <div>
//           <img
//             src={studentPhotoSrc}
//             alt="Student"
//             className="justify-end w-24 h-24"
//           />
//         </div>
//       </div>

//       {/* Student and Exam Details */}
//       <div className="flex ml-[250px] justify-between -mt-6">
//         <p className="flex-1">
//           <span className="font-paypalBold font-extralight">Name:</span>{" "}
//           <span className=" font-paypalRegular font-thin">{studentName}</span>
//         </p>
//         <p className=" mr-[5px]">
//           <span className="font-paypalBold font-extralight">Section:</span>{" "}
//           <span className="font-paypalRegular font-thin">{section}</span>
//         </p>
//         <p className="pl-2 mr-[110px]">
//           <span className="font-paypalBold font-extralight">Reg. No:</span>{" "}
//           <span className="font-paypalRegular font-thin">{studentId}</span>
//         </p>
//       </div>

//       {/* Exam Info */}

//       <table className="min-w-full -mt-2.5 text-black ">
//         <thead>
//           <tr>
//             <th className="border-2 p-0 border-[#000]" colSpan={3}>
//               <span className="font-paypalBold font-extralight">Subject: </span>
//               <span className="font-paypalRegular font-thin">
//                 {subjectName}
//               </span>
//             </th>
//             <th className="border-2 p-0 border-[#000]" colSpan={3}>
//               <span className="font-paypalBold font-extralight">Class: </span>
//               <span className="font-paypalRegular font-thin">{className}</span>
//             </th>
//             <th className="border-2 p-0 border-[#000]" colSpan={3}>
//               <span className="font-paypalBold font-extralight">Date: </span>
//               <span className="font-paypalRegular font-thin">{date}</span>
//             </th>
//             <th className="border-2 py-0 px-0.5 border-[#000]" rowSpan={2}>
//               <span className="font-paypalRegular font-thin">Total Marks</span>
//             </th>
//             <th className="border-2 py-0 px-0.5 border-[#000]" rowSpan={2}>
//               <span className="font-paypalRegular font-thin">
//                 Obtained Marks
//               </span>
//             </th>
//             <th className="border-2 py-0 px-0.5 border-[#000]" rowSpan={2}>
//               <span className="font-paypalRegular font-thin">
//                 Checker Signature
//               </span>
//             </th>
//             <th
//               className="border-2 py-0  px-0.5 border-[#000]"
//               rowSpan={2}
//               colSpan={2}
//             >
//               <span className="font-paypalRegular font-thin">
//                 ReChecker Signature
//               </span>
//             </th>
//             <th className="border-2 p-0 border-[#000]" rowSpan={2} colSpan={2}>
//               <span className=" font-paypalRegular font-thin px-3 flex justify-center items-center text-center">
//                 Time Allowed
//               </span>
//             </th>
//           </tr>
//           <tr>
//             <th
//               className={`border-2 p-0 border-[#000] ${
//                 subjectName.length > 10 ? "px-8" : "px-5"
//               } col-span-1`}
//             >
//               <span className="font-paypalRegular font-thin text-black ">
//                 01{" "}
//               </span>
//             </th>
//             <th
//               className={`border-2 p-0 border-[#000] ${
//                 subjectName.length > 10 ? "px-8" : "px-5"
//               } `}
//             >
//               <span className="font-paypalRegular font-thin text-black">
//                 02{" "}
//               </span>
//             </th>
//             <th
//               className={`border-2 p-0 border-[#000] ${
//                 subjectName.length > 10 ? "px-8" : "px-5"
//               } `}
//             >
//               <span className="font-paypalRegular font-thin text-black">
//                 03{" "}
//               </span>
//             </th>
//             <th className="border-2 p-0 border-[#000] px-5">
//               <span className="font-paypalRegular font-thin text-black">
//                 04{" "}
//               </span>
//             </th>
//             <th className="border-2 p-0 border-[#000] px-5">
//               <span className="font-paypalRegular font-thin text-black">
//                 05{" "}
//               </span>
//             </th>
//             <th className="border-2 p-0 border-[#000] px-5">
//               <span className="font-paypalRegular font-thin text-black">
//                 06{" "}
//               </span>
//             </th>
//             <th className="border-2 p-0 border-[#000] px-5">
//               <span className="font-paypalRegular font-thin text-black">
//                 07{" "}
//               </span>
//             </th>
//             <th className="border-2 p-0 border-[#000] px-5">
//               <span className="font-paypalRegular font-thin text-black">
//                 08{" "}
//               </span>
//             </th>
//             <th className="border-2 p-0 border-[#000] px-5">
//               <span className="font-paypalRegular font-thin text-black">
//                 09{" "}
//               </span>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border-2 p-0  border-[#000] opacity-0">01</td>
//             <td className="border-2 p-0 border-[#000] opacity-0">01</td>
//             <td className="border-2 p-0 border-[#000] opacity-0">01</td>
//             <td className="border-2 p-0 border-[#000] opacity-0">01</td>
//             <td className="border-2 p-0 border-[#000] opacity-0">01</td>
//             <td className="border-2 p-0 border-[#000] opacity-0">01</td>
//             <td className="border-2 p-0 border-[#000] opacity-0">01</td>
//             <td className="border-2 p-0 border-[#000] opacity-0">01</td>
//             <td className="border-2 p-0 border-[#000] opacity-0">01</td>
//             <td className="border-2 p-0 border-[#000] text-center font-normal">
//               {totalMarks}
//             </td>
//             <td className="border-2 p-0 opacity-0 border-[#000]">01</td>
//             <td className="border-2 p-0 border-[#000] opacity-0 ">01</td>
//             <td className="border-2 p-0 border-[#000] opacity-0 px-5">01</td>

//             <td
//               className="border-2 p-0 border-[#000] text-center font-normal"
//               colSpan={3}
//             >
//               {totalTime}-Hrs
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PaperHeader;

import React from "react";

interface PaperHeaderProps {
  logoSrc: string; // URL or path to the school logo
  schoolName: string;
  campusName: string;
  term: string;
  studentPhotoSrc: string; // URL or path to the student's photo
  studentName: string;
  subjectName: string[] | string;
  className: string;
  date: string;
  totalMarks: string;
  totalTime: string;
  studentId: string;
  section: string; // Section of the student
}

const PaperHeader: React.FC<PaperHeaderProps> = ({
  logoSrc,
  schoolName,
  campusName,
  term,
  studentPhotoSrc,
  studentName,
  subjectName = [],
  className,
  date,
  totalMarks,
  totalTime,
  studentId,
  section,
}) => {
  const subjectNames = Array.isArray(subjectName) ? subjectName : [subjectName];
  return (
    <div className="text-[#000]  text-lg bg-[#fff]  ">
      {/* Top Row: Logo and School Information */}
      <div className="flex justify-between">
        {/* School Logo */}
        <div className="flex gap-2">
          <img
            src={logoSrc}
            alt="Please Upload Logo or Active Logo"
            className="justify-start w-24 h-24 object-cover"
          />

          {/* School Details */}
          <div className="flex flex-col justify-center gap-y-0.5">
            <p className="-mb-0.5 font-bay-tavern uppercase tracking-widest">
              {schoolName}
            </p>
            <p className="-mb-0.5">{campusName}</p>
            <p className="font-corsiva">( A Partner of SLEC )</p>
          </div>
        </div>
        <div className="">
          <p className="mt-6 text-start mr-80">
            ( <span className="font-paypalBold font-extralight">Term: </span>
            <span className="font-paypalRegular font-thin">{term}</span> )
          </p>
        </div>
        <div>
          <img
            src={studentPhotoSrc}
            alt="Student"
            className="justify-end w-24 h-24"
          />
        </div>
      </div>

      {/* Student and Exam Details */}
      <div className="flex ml-[250px] justify-between -mt-6">
        <p className="flex-1">
          <span className="font-paypalBold font-extralight">Name:</span>{" "}
          <span className=" font-paypalRegular font-thin">{studentName}</span>
        </p>
        <p className=" mr-[5px]">
          <span className="font-paypalBold font-extralight">Section:</span>{" "}
          <span className="font-paypalRegular font-thin">{section}</span>
        </p>
        <p className="pl-2 mr-[110px]">
          <span className="font-paypalBold font-extralight">Reg. No:</span>{" "}
          <span className="font-paypalRegular font-thin">{studentId}</span>
        </p>
      </div>

      {/* Exam Info */}

      <table className="min-w-full -mt-2.5 text-black ">
        <thead>
          <tr>
            <th className="border-2 p-0 border-[#000]" colSpan={3}>
              <span className="font-paypalBold font-extralight">Subject: </span>
              <span className="font-paypalRegular font-thin">
                {subjectNames}
              </span>
            </th>
            <th className="border-2 p-0 border-[#000]" colSpan={3}>
              <span className="font-paypalBold font-extralight">Class: </span>
              <span className="font-paypalRegular font-thin">{className}</span>
            </th>
            <th className="border-2 p-0 border-[#000]" colSpan={3}>
              <span className="font-paypalBold font-extralight">Date: </span>
              <span className="font-paypalRegular font-thin">{date}</span>
            </th>
            <th className="border-2 py-0 px-0.5 border-[#000]" rowSpan={2}>
              <span className="font-paypalRegular font-thin">Total Marks</span>
            </th>
            <th className="border-2 py-0 px-0.5 border-[#000]" rowSpan={2}>
              <span className="font-paypalRegular font-thin">
                Obtained Marks
              </span>
            </th>
            <th className="border-2 py-0 px-0.5 border-[#000]" rowSpan={2}>
              <span className="font-paypalRegular font-thin">
                Checker Signature
              </span>
            </th>
            <th
              className="border-2 py-0  px-0.5 border-[#000]"
              rowSpan={2}
              colSpan={2}
            >
              <span className="font-paypalRegular font-thin">
                ReChecker Signature
              </span>
            </th>
            <th className="border-2 p-0 border-r-4 border-[#000]" rowSpan={2} colSpan={2}>
              <span className=" font-paypalRegular font-thin px-3 flex justify-center items-center text-center">
                Time Allowed
              </span>
            </th>
          </tr>
          <tr>
            <th
              className={`border-2 p-0 border-[#000] ${
                subjectName.length > 10 ? "px-8" : "px-5"
              } col-span-1`}
            >
              <span className="font-paypalRegular font-thin text-black ">
                01{" "}
              </span>
            </th>
            <th
              className={`border-2 p-0 border-[#000] ${
                subjectName.length > 10 ? "px-8" : "px-5"
              } `}
            >
              <span className="font-paypalRegular font-thin text-black">
                02{" "}
              </span>
            </th>
            <th
              className={`border-2 p-0 border-[#000] ${
                subjectName.length > 10 ? "px-8" : "px-5"
              } `}
            >
              <span className="font-paypalRegular font-thin text-black">
                03{" "}
              </span>
            </th>
            <th className="border-2 p-0 border-[#000] px-5">
              <span className="font-paypalRegular font-thin text-black">
                04{" "}
              </span>
            </th>
            <th className="border-2 p-0 border-[#000] px-5">
              <span className="font-paypalRegular font-thin text-black">
                05{" "}
              </span>
            </th>
            <th className="border-2 p-0 border-[#000] px-5">
              <span className="font-paypalRegular font-thin text-black">
                06{" "}
              </span>
            </th>
            <th className="border-2 p-0 border-[#000] px-5">
              <span className="font-paypalRegular font-thin text-black">
                07{" "}
              </span>
            </th>
            <th className="border-2 p-0 border-[#000] px-5">
              <span className="font-paypalRegular font-thin text-black">
                08{" "}
              </span>
            </th>
            <th className="border-2 p-0 border-[#000] px-5">
              <span className="font-paypalRegular font-thin text-black">
                09{" "}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2 p-0  border-[#000] opacity-0">01</td>
            <td className="border-2 p-0 border-[#000] opacity-0">01</td>
            <td className="border-2 p-0 border-[#000] opacity-0">01</td>
            <td className="border-2 p-0 border-[#000] opacity-0">01</td>
            <td className="border-2 p-0 border-[#000] opacity-0">01</td>
            <td className="border-2 p-0 border-[#000] opacity-0">01</td>
            <td className="border-2 p-0 border-[#000] opacity-0">01</td>
            <td className="border-2 p-0 border-[#000] opacity-0">01</td>
            <td className="border-2 p-0 border-[#000] opacity-0">01</td>
            <td className="border-2 p-0 border-[#000] text-center font-normal">
              {totalMarks}
            </td>
            <td className="border-2 p-0 opacity-0 border-[#000]">01</td>
            <td className="border-2 p-0 border-[#000] opacity-0 ">01</td>
            <td className="border-2 p-0 border-[#000] opacity-0 px-5">01</td>

            <td
              className="border-2 p-0 border-r-4 border-[#000] text-center font-normal"
              colSpan={3}
            >
              {totalTime}-Hrs
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaperHeader;
