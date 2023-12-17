/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./sidebar";
import AssignmentSearch from "../../components/search";
import folder from "../../assets/folder.png";
import LoadingSpinner from "../../components/BeatLoader";
import {
  setSortBy,
  setSearchTerm,
  setFilteredAssignments
} from "../../redux/slices/lecturer/getAllAssignment";
import { fetchAssignments } from "../../redux/actions/lecturer/getAllAssignment";
import { Link } from "react-router-dom";
import CreateAssignmentForm from "./CreateAssignmentForm";

const submission = () => {
  const dispatch = useDispatch();
  const { assignments, sortBy, filteredAssignments, loading } = useSelector(
    (state) => state.allAssignment
  );

  const [showDialog, setShowDialog] = useState(false);
  const [blurPage, setBlurPage] = useState(false);

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  const handleDialogClose = () => {
    setShowDialog(false);
    setBlurPage(false);
  };

  const handleCreateAssignment = () => {
    setShowDialog(true);
    setBlurPage(true);
  };

  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;
    dispatch(setSortBy(selectedSortBy));

    const sortedAndFilteredAssignments = [...filteredAssignments].sort((a, b) => {
      if (selectedSortBy === "createdAt") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (selectedSortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (selectedSortBy === "deadline") {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return 0;
    });

    dispatch(setFilteredAssignments(sortedAndFilteredAssignments));
  };

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

  return (
    <div className={`xl:flex w-full ${blurPage ? "blur-background" : ""}`} data-testid="blur-div">
      <div className="xl:w-1/6">
        <Sidebar />
      </div>

      <div className="xl:w-5/6">
        <div className="xl:flex justify-between w-full px-4 py-2">
          <AssignmentSearch onSearch={handleSearch} data-testid="your-search-input-test-id" />
          <div className="xl:flex px-2 py-1 xl:px-2 py-3 rounded-lg ">
            <div>
              <label
                htmlFor="sortBy"
                className="grid text-base mt-4 px-2 py-2 h-10  rounded-lg font-medium border border-gray-300 text-center text-gray-700"
              >
                Sort By:
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="block h-10 mt-1 rounded-lg w-full border border-gray-300 text-center focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleSortChange}
                value={sortBy}
                data-testid="sorting-dropdown"
              >
                <option value="createdAt">Date</option>
                <option value="title">Title</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>
            <button
              className="font-semibold h-10 font-work-sans text-base xl:text-base cursor-pointer border border-indigo-950 px-3 py-2 rounded-lg gradient text-white m-4"
              onClick={handleCreateAssignment}
              data-testid="add-lecturer-button"
            >
              Assignment +
            </button>
          </div>
        </div>

        <div className=" h-[65vh] mt-12 xl:overflow-y-auto">
          <div
            className=" xl:grid grid-cols-3 gap-0.5 "
            // className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-5"
            // style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
          >
            {loading ? (
              <div
                className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
                data-testid="loading-spinner"
              >
                <LoadingSpinner color="#170E7D" />
              </div>
            ) : filteredAssignments.length === 0 ? (
              <div className="text-gray-600 text-center w-full mt-4">No Submission Found</div>
            ) : (
              filteredAssignments.map((assignment) => (
                <div
                  className="xl:w-[300px]  h-32 rounded-lg border-[1px] flex  pt-6 mt-2 ml-2 mr-2 pr-6 pl-6"
                  key={assignment.id}
                >
                  <Link
                    to={`/lecturer/submission/${assignment.id}`}
                    className="no-underline text-white flex"
                  >
                    <img src={folder} className="w-16 h-16 cursor-pointer" />
                    <div className="pt-4 ml-4">
                      <h3 className="text-[#31394E] uppercase whitespace-nowrap  text-xl">
                        {assignment.title.length > 10
                          ? `${assignment.title.substring(0, 10)}...`
                          : assignment.title}
                      </h3>
                      <h3 className="text-[#1A9E27] font-bold text-sm">
                        {" "}
                        {assignment.submissions?.length || 0} submissions
                      </h3>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {showDialog && <CreateAssignmentForm onClose={handleDialogClose} />}
    </div>
  );
};

export default submission;
