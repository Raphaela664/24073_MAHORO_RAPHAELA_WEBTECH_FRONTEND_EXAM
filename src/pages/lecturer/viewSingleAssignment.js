/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FaClone } from "react-icons/fa";
/* eslint-disable */
import GetSingleAssignment from "../../redux/actions/lecturer/viewSingleAssignment";
import Sidebar from "./sidebar";
import { formatDate } from "../../utils/formatDate";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/BeatLoader";
import ReactHtmlParser from "html-react-parser";

const singleAssignment = () => {
  const [assignment, setAssignment] = useState([]);
  const [loading, setLoading] = useState(true);
  const { assignmentId } = useParams();

  useEffect(() => {
    const ViewAssignment = async () => {
      try {
        const retrievedAssignment = await GetSingleAssignment(assignmentId);
        if (retrievedAssignment) {
          setAssignment(retrievedAssignment.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    ViewAssignment();
  }, [assignmentId]);

  // const createMarkup = (content) => {
  //   return { __html: content };
  // };

  const handleCopyCode = (assignmentCode) => {
    navigator.clipboard.writeText(assignmentCode);
    toast.info("Copied", { autoClose: 3000 });
  };
  const studentsCount = assignment.AssignmentToUser?.length || 0;

  return (
    <div className="xl:flex w-full ">
      <div className="xl:w-1/6">
        <Sidebar />
      </div>

      <div className="xl:w-5/6">
        <Link to="/lecturer/dashboard">
          <h4 className="mb-2 mt-2 text-xl">
            <FontAwesomeIcon icon={faArrowLeft} />
          </h4>
        </Link>
        <h3 className="font-bold text-3xl  mb-5 text-[#31394E]">Assignment</h3>

        {loading ? (
          <div className="flex justify-center items-center" data-testid="loading-spinner">
            <LoadingSpinner color="#170E7D" />
          </div>
        ) : (
          <div key={assignment.id}>
            <div className="border border-black-[2px] xl:ml-4 xl:mr-16">
              <div className="xl:flex justify-between w-full">
                <div className="flex gradient2 xl:w-3/4 h-12 ">
                  <h3
                    className="font-semibold ml-9 mt-2 mr-8 text-sm xl:text-2xl uppercase cursor-pointer text-white"
                    data-testid="title"
                  >
                    {assignment.title}
                  </h3>
                  {/* <h3 className="mr-2 text-white cursor-pointer text-lg mt-3">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </h3> */}
                </div>
                <div className="flex bg-[#F7F9FB] px-2 py-1 xl:px-2 py-3 xl:w-1/4 justify-around h-12">
                  <h3>Unique Code</h3>
                  <div className="flex ">
                    <h3 className="mr-1 text-[#5C34EC] font-semibold">
                      {assignment.assignmentCode}
                    </h3>
                    <h3
                      className="text-[#5C34EC] cursor-pointer font-semibold text-lg"
                      onClick={() => handleCopyCode(assignment.assignmentCode)}
                    >
                      <FaClone />
                    </h3>
                  </div>
                </div>
              </div>
              <div className=" flex justify-between">
                <h4 className="mt-3 font-semibold text-[#31394E] mb-2 ml-6">Description</h4>
                <h3 className="text-[#FF3131] mt-3 mr-14 ml-3">
                  {formatDate(assignment.deadline)}
                </h3>
              </div>
              <p className="mb-3 text-base text-[#9F9F9F] h-[26vh] overflow-y-auto ml-3 md:mr-12">
                <span className="ql-editor">{ReactHtmlParser(assignment.description)}</span>
              </p>
            </div>

            <div className=" flex justify-between border-b-[4px] xl:mr-16 ">
              <h3 className="font-bold text-3xl mb-3 mt-3 text-[#31394E] ">Students</h3>
              <div className="justify-between flex mt-3 mb-3 mr-4">
                <h3 className="mr-3 text-xl text-[#5C34EC] font-bold">{studentsCount} Students</h3>
                {/* <h3 className="text-xl text-[#5C34EC] cursor-pointer">
                  <FontAwesomeIcon icon={faUserPlus} />
                </h3> */}
              </div>
            </div>

            <div className="xl:mr-16 h-[30vh] overflow-y-auto">
              {assignment.AssignmentToUser?.map((user) => (
                <div className="flex xl:pl-20 border-b-[2px] p-4" key={user.user.id}>
                  <h3 className="flex items-center bg-gray-600 h-10 w-10 rounded-full text-white text-2xl justify-center">
                    <FontAwesomeIcon icon={faUser} style={{ color: "#f4f5f5" }} />
                  </h3>
                  <h3 className="pt-2 pl-2">{user.user.email}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default singleAssignment;
