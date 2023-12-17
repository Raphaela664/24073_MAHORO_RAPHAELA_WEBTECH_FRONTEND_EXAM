/* eslint-disable */
import React from "react";

const AssignmentStatus = () => {
  return (
    <div className="bg-[#F7F9FB] p-4 rounded md:mr-5">
      <h3 className="font-bold mb-2">Assignment status</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-left text-color ">
            <tr>
              <th className="w-1/3 font-normal">Students</th>
              <th className="w-1/3 font-normal">Due date</th>
              <th className="w-1/3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="mr-2">
            <tr>
              <td data-testid="user">Koray Okumus</td>
              <td data-testid="assignment-dueDate">Jun 24, 2022</td>
              <td className="flex items-center text-[#b4b6e6]" data-testid="user-progress">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                In Progress
              </td>
            </tr>
            <tr>
              <td>Natali Craig</td>
              <td>Mar 10, 2022</td>
              <td className="flex items-center text-[#a8d3c5]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                Competed
              </td>
            </tr>
            <tr>
              <td>Olivia Rhye</td>
              <td>Nov 10, 2022</td>
              <td className="flex items-center text-[#a8d3c5]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                Competed
              </td>
            </tr>
            <tr>
              <td>Orlando Diggs</td>
              <td>Dec 20, 2022</td>
              <td className="flex items-center text-[#b4b6e6]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                In Progress
              </td>
            </tr>
            <tr>
              <td>Kate Morrison</td>
              <td>Jul 25, 2022</td>
              <td className="flex items-center text-[#a8d3c5]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                Competed
              </td>
            </tr>
            <tr>
              <td>Olivia Rhye</td>
              <td>Nov 10, 2022</td>
              <td className="flex items-center text-[#a8d3c5]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                Competed
              </td>
            </tr>
            <tr>
              <td>Orlando Diggs</td>
              <td>Dec 20, 2022</td>
              <td className="flex items-center text-[#b4b6e6]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                In Progress
              </td>
            </tr>
            <tr>
              <td>Kate Morrison</td>
              <td>Jul 25, 2022</td>
              <td className="flex items-center text-[#a8d3c5]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                Competed
              </td>
            </tr>
            <tr>
              <td>Koray Okumus</td>
              <td>Jun 24, 2022</td>
              <td className="flex items-center text-[#b4b6e6]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                In Progress
              </td>
            </tr>
            <tr>
              <td>Natali Craig</td>
              <td>Mar 10, 2022</td>
              <td className="flex items-center text-[#a8d3c5]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                Competed
              </td>
            </tr>
            <tr>
              <td>Olivia Rhye</td>
              <td>Nov 10, 2022</td>
              <td className="flex items-center text-[#a8d3c5]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                Competed
              </td>
            </tr>
            <tr>
              <td>Orlando Diggs</td>
              <td>Dec 20, 2022</td>
              <td className="flex items-center text-[#b4b6e6]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                In Progress
              </td>
            </tr>
            <tr>
              <td>Kate Morrison</td>
              <td>Jul 25, 2022</td>
              <td className="flex items-center text-[#a8d3c5]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                Competed
              </td>
            </tr>
            <tr>
              <td>Orlando Diggs</td>
              <td>Dec 20, 2022</td>
              <td className="flex items-center text-[#b4b6e6]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                In Progress
              </td>
            </tr>
            <tr>
              <td>Kate Morrison</td>
              <td>Jul 25, 2022</td>
              <td className="flex items-center text-[#a8d3c5]">
                <div className="h-2 w-2 rounded-full bg-black mr-2" />
                Competed
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentStatus;
