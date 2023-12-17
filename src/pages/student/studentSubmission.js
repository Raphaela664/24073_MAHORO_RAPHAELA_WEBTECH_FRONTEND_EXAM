/* eslint-disable */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarStudent from "./NavbarStudent";
import { fetchAssignments } from "../../redux/actions/lecturer/getAllAssignment";
import {
  setSearchTerm,
  setFilteredAssignments,
  setSortBy
} from "../../redux/slices/lecturer/getAllAssignment";
import { formatDate } from "../../utils/formatDate";
import LoadingSpinner from "../../components/BeatLoader";
import AssignmentSearch from "../../components/search";
import { Link } from "react-router-dom";
import studentBoard from "../../assets/studentBoard2.png";
import ReactHtmlParser from "html-react-parser";

const studentSubmission = () => {
  const dispatch = useDispatch();
  const { assignments, sortBy, filteredAssignments, loading } = useSelector(
    (state) => state.allAssignment
  );

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  const handleSearch = (searchValue) => {
    dispatch(setSearchTerm(searchValue));

    if (searchValue !== "") {
      const filteredAssignments = assignments.filter((assignment) =>
        assignment.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      dispatch(setFilteredAssignments(filteredAssignments));
    } else {
      dispatch(setFilteredAssignments(assignments));
    }
  };

  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;
    dispatch(setSortBy(selectedSortBy));

    const sortedAndFilteredAssignments = [...filteredAssignments].sort((a, b) => {
      if (selectedSortBy === "deadline-asc") {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (selectedSortBy === "deadline-desc") {
        return new Date(b.deadline) - new Date(a.deadline);
      }
      return 0;
    });

    dispatch(setFilteredAssignments(sortedAndFilteredAssignments));
  };

  const noFilteredAssignment = filteredAssignments.length === 0;
  const noAssignments = assignments.length === 0;

  return (
    <>
      <NavBarStudent />
      <div className="p-3 xl:ml-3 xl:flex ">
        <div className="w-full">
          <div className=" p-4 ">
            <div className="flex justify-end xl:mr-12">
              <div>
                <label
                  htmlFor="sortBy"
                  className="grid text-sm mb-1 px-2 py-2 w-36 h-10  rounded-lg font-medium border border-gray-300 text-center text-gray-700"
                >
                  Filter by Deadline:
                </label>
                <select
                  id="sortBy"
                  name="sortBy"
                  className="block h-10 mr-8 rounded-lg border border-gray-300 text-center focus:ring-indigo-500 focus:border-indigo-500 "
                  onChange={handleSortChange}
                  value={sortBy}
                  data-testid="sorting-dropdown"
                >
                  <option value="deadline-asc">Ascending</option>
                  <option value="deadline-desc">Descending</option>
                </select>
              </div>
            </div>

            <div className="  xl:flex justify-between xl:w-3/5 mb-4">
              <h3 className="text-[#31394E] text-3xl font-bold ">All Assignment</h3>
              <AssignmentSearch onSearch={handleSearch} />
            </div>

            <div className=" h-[63vh] xl:flex justify-around overflow-x-auto xl:overflow-y-auto">
              {noAssignments ? (
                <div className="text-gray-600 grid justify-center items-center mt-4">
                  <img className="h-[50vh] w-[50vh] mb-4" src={studentBoard} alt="No assignments" />
                  <p className="text-center text-xl ">
                    No Assignment yet. Kindly contact your lecturer
                  </p>
                </div>
              ) : (
                <table className="xl:w-full xl:ml-20 xl:mr-20 h-36 table-fixed">
                  <thead className="bg-[#5136F5]">
                    <tr className="border-b-2">
                      <th className="px-12 py-4 w-44 text-left text-xl whitespace-nowrap font-work-sans text-[#FFF]">
                        Title
                      </th>
                      <th className="px-6 py-4 w-44 text-left text-xl whitespace-nowrap font-work-sans text-[#FFF]">
                        Status
                      </th>
                      <th className="px-6 py-4 w-56 text-left text-xl font-work-sans text-[#FFF]">
                        Description
                      </th>
                      <th className="px-6 py-4 md:w-1/5 text-right text-xl font-work-sans text-[#FFF]">
                        Deadline
                      </th>
                    </tr>
                  </thead>
                  {loading ? (
                    <div className="fixed inset-0 flex justify-center items-center">
                      <LoadingSpinner color="#170E7D" />
                    </div>
                  ) : (
                    <tbody>
                      {noFilteredAssignment ? (
                        <div className="text-gray-600 fixed inset-0 flex justify-center items-center mt-4">
                          <p>No Assignment Found</p>
                        </div>
                      ) : (
                        filteredAssignments.map((assignment) => (
                          <tr className="border-b w-full" key={assignment.id}>
                            <Link
                              to={`/student/single/assignment/${assignment.id}`}
                              className="no-underline text-[#797676]"
                            >
                              <td className="px-12 py-4 w-56 font-work-sans whitespace-nowrap ">
                                {assignment.title}
                              </td>
                            </Link>

                            <td className="w-44 pb-4 font-work-sans ">
                              <Link
                                to={`/student/single/assignment/${assignment.id}`}
                                className="no-underline text-[#797676]"
                              >
                                <h3
                                  className={`w-32 pl-2 ${
                                    assignment.submissions.length === 0
                                      ? "bg-red-500"
                                      : "bg-[#B7EFC0]"
                                  }`}
                                >
                                  {assignment.submissions.length === 0
                                    ? "Not Submitted"
                                    : "Submitted"}
                                </h3>
                              </Link>
                            </td>

                            <td className="px-2 pb-4 w-56 pt-2 font-work-sans ">
                              <Link
                                to={`/student/single/assignment/${assignment.id}`}
                                className="no-underline text-[#797676]"
                              >
                                <span>
                                  {ReactHtmlParser(assignment.description.substring(0, 50))}
                                </span>
                              </Link>
                            </td>

                            <Link
                              to={`/student/single/assignment/${assignment.id}`}
                              className="no-underline text-[#FF3131]"
                            >
                              <td className="px-4 py-4 xl:w-1/5 whitespace-nowrap text-end font-work-sans">
                                {formatDate(assignment.deadline)}
                              </td>
                            </Link>
                          </tr>
                        ))
                      )}
                    </tbody>
                  )}
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default studentSubmission;
