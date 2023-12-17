/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NavBarStudent from "./NavbarStudent";
import GetSingleAssignment from "../../redux/actions/lecturer/viewSingleAssignment";
import LoadingSpinner from "../../components/BeatLoader";
import Stop from "../../assets/ant-design_stop-filled.png";
import ReactHtmlParser from "html-react-parser";
import { Link } from "react-router-dom";

const StudentSingleAssignment = () => {
  const [assignment, setAssignment] = useState([]);
  const [loading, setLoading] = useState(true);
  const { assignmentId } = useParams();

  useEffect(() => {
    const ViewAssignment = async () => {
      try {
        const retrievedAssignment = await GetSingleAssignment(assignmentId);
        console.log(retrievedAssignment)
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

  return (
    <div>
      <NavBarStudent />

      <Link to="/student/dashboard">
        <h4 className="mt-4 ml-9 text-xl">
          <FontAwesomeIcon icon={faArrowLeft} />
        </h4>
      </Link>

      <h3 className="text-[#31394E] text-3xl font-bold ml-9 mb-9 mt-4">All Assignment</h3>

      <div className="w-5/6 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center" data-testid="loading-spinner">
            <LoadingSpinner color="#170E7D" />
          </div>
        ) : (
          <div key={assignment.assignment_id}>
            <div className="bg-[#5136F5] h-20 md:flex justify-between">
              <div className="ml-12 items-center justify-center flex text-[#FFF]">
                <h3 className="text-2xl mr-8">{assignment.title}</h3>
                <div>
                  {/* {assignment.submissions.length === 0 ? (
                    <div className="flex items-center">
                      <img src={Stop} alt="Not Submitted" className="mr-2" />
                      <h3 className="text-xs text-red-500">Not Submitted</h3>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      <h3 className="text-xs text-green-500">Submitted</h3>
                    </div>
                  )} */}
                </div>
              </div>

              <div className="flex xl:mr-4 mt-4 md:mt-0 items-center justify-center text-sm text-[#FFF]">
                <h3 className="mr-6">Due on</h3>
                <h3>{formatDate(assignment.deadline)}</h3>
              </div>
            </div>

            <div className="mt-8 text-[#767676] pl-12 pr-12">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p>
                <span className="ql-editor">{assignment.assignment_description}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSingleAssignment;
