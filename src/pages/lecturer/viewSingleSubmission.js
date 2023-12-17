/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import GetSingleAssignment from "../../redux/actions/lecturer/viewSingleAssignment";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sidebar";
import folder from "../../assets/folder.png";
import LoadingSpinner from "../../components/BeatLoader";
import StudentSearch from "../../components/search";
import CreateAssignmentForm from "./CreateAssignmentForm";
import File from "./file";

const viewSingleSubmission = () => {
  const [assignment, setAssignment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [blurPage, setBlurPage] = useState(false);
  const [submissionCode, setSubmissionCode] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const { assignmentId } = useParams();

  useEffect(() => {
    const ViewAssignment = async () => {
      try {
        const retrievedAssignment = await GetSingleAssignment(assignmentId);
        if (retrievedAssignment) {
          setAssignment(retrievedAssignment.data.data);
          const sortedStudents = (retrievedAssignment.data.data.submissions || []).sort(
            (a, b) =>
              a.student.firstname.localeCompare(b.student.firstname) ||
              a.student.lastname.localeCompare(b.student.lastname)
          );
          setFilteredStudents(sortedStudents);
          setLoading(false);
          toast.info("Please select a student to progress");
        }
      } catch (error) {
        setLoading(false);
      }
    };
    ViewAssignment();
  }, [assignmentId]);

  const studentsCount = assignment.submissions?.length || 0;

  const handleViewSubmission = (submissionCode, student) => {
    setSubmissionCode(submissionCode);
    setSelectedStudent(student);
  };

  const handleCreateAssignment = () => {
    setShowDialog(true);
    setBlurPage(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setBlurPage(false);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm !== "") {
      const filtered = assignment.submissions?.filter((data) =>
        `${data.student.firstname} ${data.student.lastname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(assignment.submissions);
    }
  };

  return (
    <div className={`xl:flex w-full ${blurPage ? "blur-background" : ""}`}>
      <div className="xl:w-1/6">
        <Sidebar />
      </div>

      <div className="xl:w-5/6" key={assignment.id}>
        <Link to="/lecturer/submission">
          <h4 className="text-xl">
            <FontAwesomeIcon icon={faArrowLeft} />
          </h4>
        </Link>

        <div className="xl:flex justify-between px-2 py-1 xl:px-2 py-3 rounded-lg mr-4 ml-4 ">
          <StudentSearch
            students={filteredStudents}
            onSearch={handleSearch}
            data-testid="your-search-input-test-id"
          />
          <button
            className="font-semibold h-10 font-work-sans mr-2 text-base xl:text-base cursor-pointer border border-indigo-950 px-3 py-2 rounded-lg gradient text-white "
            onClick={handleCreateAssignment}
            data-testid="add-lecturer-button"
          >
            Assignment +
          </button>
        </div>

        <div className="w-[449px] items-center justify-center h-32 rounded-lg  border-[1px] flex mb-4 ">
          <img src={folder} className="w-16 h-16 cursor-pointer" />
          <div className="pt-4 ml-4">
            <h3 className="text-[#31394E] uppercase whitespace-nowrap  text-xl">
              {assignment.title}
            </h3>
            <h3 className="text-[#1A9E27] font-bold text-sm">{studentsCount} submissions</h3>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center" data-testid="loading-spinner">
            <LoadingSpinner color="#170E7D" />
          </div>
        ) : (
          <div className="flex  mr-8 border h-[65vh] box2 ">
            {studentsCount === 0 ? (
              <div className="text-[#31394E] ml-12 mt-6 mb-2">No submissions yet</div>
            ) : (
              <>
                <div className="block overflow-y-auto overflow-x-auto">
                  {filteredStudents.length === 0 ? (
                    <div className="text-[#31394E] ml-8 w-[260px] mt-6 mb-2">No student found</div>
                  ) : (
                    filteredStudents.map((data) => (
                      <div
                        className={`w-[260px] text-base text-[#31394E] overflow-y-auto text-normal capitalize pl-12 cursor-pointer ml-4 mr-4 ${
                          selectedStudent === data.student ? "bg-slate-100 mt-2 rounded-lg" : ""
                        }`}
                        key={data.id}
                      >
                        <h3
                          className="mt-2 mb-2"
                          onClick={() => handleViewSubmission(data.submissionCode, data.student)}
                        >
                          {data.student.firstname} {data.student.lastname}
                        </h3>
                      </div>
                    ))
                  )}
                </div>
                {submissionCode && (
                  <div className="w-[100vh] mr-8 mt-4">
                    <File submissionCode={submissionCode} />
                  </div>
                )}
              </>
            )}
          </div>
        )}
        {showDialog && <CreateAssignmentForm onClose={handleDialogClose} />}
      </div>
    </div>
  );
};

export default viewSingleSubmission;
