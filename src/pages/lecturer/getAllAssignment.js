import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AssignmentSearch from "../../components/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../components/BeatLoader";
import Sidebar from "./sidebar";
import {
  setSortBy,
  setSearchTerm,
  setFilteredAssignments
} from "../../redux/slices/lecturer/getAllAssignment";
import { fetchAssignments } from "../../redux/actions/lecturer/getAllAssignment";
import CreateAssignmentForm from "./CreateAssignmentForm";
import { FaClone } from "react-icons/fa";
/* eslint-disable */

import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import DeleteAssignmentForm from "./deletePublishedAssignment";
import EditAssignmentForm from "./editAssignment";
import EditStudentForm from "./addStudentToPublished";
import ReactHtmlParser from "html-react-parser";

const lecturerDashboard = () => {
  const dispatch = useDispatch();
  const { assignments, sortBy, filteredAssignments, loading } = useSelector(
    (state) => state.allAssignment
  );

  const [showDialog, setShowDialog] = useState(false);
  const [blurPage, setBlurPage] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showEditStudentDialog, setShowEditStudentDialog] = useState(false);
  const [editAssignmentId, setEditAssignmentId] = useState(null);
  const [editStudentAssignmentId, setStudentEditAssignmentId] = useState(null);

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

  const handleDeleteAssignment = (assignmentId, assignmentTitle) => {
    setAssignmentToDelete({ id: assignmentId, title: assignmentTitle });
    setShowDeleteDialog(true);
  };

  const handleEditAssignment = (assignmentId) => {
    setEditAssignmentId(assignmentId);
    setShowEditDialog(true);
    setBlurPage(true);
  };

  const handleEditStudentAssignment = (assignmentId) => {
    setStudentEditAssignmentId(assignmentId);
    setShowEditStudentDialog(true);
    setBlurPage(true);
  };

  const handleCloseDeleteDialog = () => {
    setAssignmentToDelete(null);
    setShowDeleteDialog(false);
  };

  const deleteDialog = assignmentToDelete && (
    <DeleteAssignmentForm
      onClose={handleCloseDeleteDialog}
      assignmentId={assignmentToDelete.id}
      assignmentTitle={assignmentToDelete.title}
    />
  );

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

  const handleCopyCode = (assignmentCode) => {
    navigator.clipboard.writeText(assignmentCode);
    toast.info("Copied", { autoClose: 3000 });
  };

  return (
    <div className={`xl:flex w-full ${blurPage ? "blur-background" : ""}`} data-testid="blur-div">
      <div className="xl:">
        <Sidebar />
      </div>

      <div className="xl:w-11/12 xl:ml-4 xl:mr-4">
        <div className="xl:flex justify-between w-full px-4 py-2">
          <AssignmentSearch onSearch={handleSearch} />
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
                className="grid h-10 mt-1 mb-1 w-full rounded-lg border border-gray-300 text-center focus:ring-indigo-500 focus:border-indigo-500"
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
              className="font-semibold h-10 font-work-sans text-base xl:text-base cursor-pointer border border-indigo-950 px-3 py-2 rounded-lg gradient text-white xl:m-4"
              onClick={handleCreateAssignment}
              data-testid="add-lecturer-button"
            >
              Assignment +
            </button>
          </div>
        </div>

        <h3 className="font-bold text-3xl mt-3 mb-5 text-[#31394E] text-center xl:text-left">
          Assignment
        </h3>

        <div className="xl:flex justify-between xl:ml-2 overflow-x-auto xl:grid grid-cols-3 gap-0.5 h-[65vh] xl:overflow-y-auto ">
          {loading ? (
            <div
              className="fixed top-0 right-0 w-full h-full ml-24 flex items-center justify-center"
              data-testid="loading-spinner"
            >
              <LoadingSpinner color="#170E7D" />
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div className="text-gray-600 text-center w-full mt-4">No Assignment Found</div>
          ) : (
            filteredAssignments.map((assignment) => (
              <div
                className="xl:w-[349px] h-64 rounded-lg border-[1px] m-[2px] hover:shadow-xl"
                key={assignment.id}
              >
                <Link
                  to={`/lecturer/assignment/${assignment.assignment_id}`}
                  className="no-underline text-white"
                >
                  <h3
                    className="text-center uppercase font-semibold text-sm xl:text-base cursor-pointer border border-indigo-950 px-2 py-1 xl:px-2 py-3 gradient2 text-white"
                    data-testid="assignment-title"
                  >
                    {assignment.title}
                  </h3>
                </Link>
                <h4 className="mt-3 font-normal mb-2 ml-2">Description</h4>

                <p className="mb-3 text-[#9F9F9F] text-sm font-light ml-3 mr-2 overflow-hidden h-[35px]">
                  {assignment.assignment_description}
                </p>

                <div className="flex justify-between">
                  <h3 className="text-[#FF3131] ml-3" data-testid="formatted-date">
                    {formatDate(assignment.deadline)}
                  </h3>
                  <div className="flex mr-2">
                    <h3
                      className="mr-2 Edit text-[#3E3693] text-lg cursor-pointer"
                      onClick={() => handleEditAssignment(assignment.assignment_id)}
                      data-testid="Edit"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} data-testid="Edit" />
                    </h3>
                    <h3
                      className="mr-2 Delete text-[#3E3693] cursor-pointer text-lg"
                      onClick={() => handleDeleteAssignment(assignment.assignment_id, assignment.title)}
                      data-testid="Delete"
                    >
                      <FontAwesomeIcon icon={faTrashCan} data-testid="Delete" />
                    </h3>
                    <h3
                      className="mr-2 Edit text-[#3E3693] text-lg cursor-pointer"
                      onClick={() => handleEditStudentAssignment(assignment.assignment_id)}
                      data-testid="EditStudent"
                    >
                      <FontAwesomeIcon icon={faUserPlus} />
                    </h3>
                  </div>
                </div>

                <div className="flex justify-between mb-4 mr-4 ml-2 mt-6 bg-[#F7F9FB] px-2 py-1 xl:px-2 py-3 rounded-lg">
                  <h3>Unique Code</h3>
                  <div className="flex">
                    <h3 className="mr-2 text-[#3E3693] font-bold">{assignment.assignment_id}</h3>
                    <h3
                      className="mr-2 text-[#3E3693] font-bold cursor-pointer text-lg"
                      onClick={() => handleCopyCode(assignment.assignment_id)}
                      data-testid="Code"
                    >
                      <FaClone />
                    </h3>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showDialog && <CreateAssignmentForm onClose={handleDialogClose} />}
      {showDeleteDialog && deleteDialog}
      {showEditDialog && (
        <EditAssignmentForm
          onClose={() => {
            setShowEditDialog(false);
            setBlurPage(false);
          }}
          assignmentId={editAssignmentId}
          assignment={
            filteredAssignments.find((assignment) => assignment.id === editAssignmentId) || {}
          }
          data-testid="edit-assignment-form"
        />
      )}
      {showEditStudentDialog && (
        <EditStudentForm
          onClose={() => {
            setShowEditStudentDialog(false);
            setBlurPage(false);
          }}
          assignmentId={editStudentAssignmentId}
          assignment={
            filteredAssignments.find((assignment) => assignment.id === editStudentAssignmentId) ||
            {}
          }
          data-testid="edit-assignment-form"
        />
      )}
    </div>
  );
};

export default lecturerDashboard;
