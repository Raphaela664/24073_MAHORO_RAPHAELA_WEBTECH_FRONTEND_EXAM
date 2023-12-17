/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faCloudArrowUp,
  faPen,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import CustomSweetAlert from "./createLecturer";
import Pagination from "../../components/pagination";
import LoadingSpinner from "../../components/BeatLoader";
import { fetchLecturers } from "../../redux/actions/Admin/adminLecturer";
import StudentSearch from "../../components/search";
import DeleteUserForm from "./deleteLecturer";
import EditUserForm from "./editLecturer";

const AdminLecturer = () => {
  const dispatch = useDispatch();
  const lecturers = useSelector((state) => state.lecturer.lecturers);
  const isLoading = useSelector((state) => state.lecturer.isLoading);

  const [showDialog, setShowDialog] = useState(false);
  const [blurPage, setBlurPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userToDelete, setuserToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const itemsPerPage = 7;

  useEffect(() => {
    dispatch(fetchLecturers());
  }, [dispatch]);

  const handleAddStudentClick = () => {
    setShowDialog(true);
    setBlurPage(true);
  };


  const handleDialogClose = () => {
    setShowDialog(false);
    setBlurPage(false);
  };

  const handleDeleteUser = (userId, firstName, lastName) => {
    setuserToDelete({ id: userId, firstname: firstName, lastname: lastName });
    setShowDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setuserToDelete(null);
    setShowDeleteDialog(false);
  };

  const handleEditUser = (userId) => {
    setEditUserId(userId);
    setShowEditDialog(true);
    setBlurPage(true);
  };

  useEffect(() => {
    setFilteredStudents(lecturers);
  }, [lecturers]);

  const handleSearch = (searchTerm) => {
    if (searchTerm !== "") {
      const filtered = lecturers.filter((lecturer) =>
        `${lecturer.firstname} ${lecturer.lastname} ${lecturer.email} ${lecturer.userId}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
      setCurrentPage(1);
    } else {
      setFilteredStudents(lecturers);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    setFilteredStudents(lecturers);
  }, []);

  const deleteDialog = userToDelete && (
    <DeleteUserForm
      onClose={handleCloseDeleteDialog}
      userId={userToDelete.id}
      firstName={userToDelete.firstname}
      lastName={userToDelete.lastname}
    />
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);

  const paginatedData = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={blurPage ? "blur-background" : ""} data-testid="blur-div">
      <div className="xl:flex justify-around p-9">
        <h3 className="items-center text-2xl font-work-sans text-center mt-[20px] font-bold text-[#31394E]">
          Lecturers
        </h3>
        <div className="mt-4">
          <StudentSearch
            students={lecturers}
            onSearch={handleSearch}
            data-testid="your-search-input-test-id"
          />
        </div>
        <div className="flex items-center justify-between">
          <h3
            className="add-lecturer-button font-semibold font-work-sans text-sm xl:text-base cursor-pointer border border-indigo-950 px-2 py-1 xl:px-2 py-3  rounded-lg gradient text-white"
            onClick={handleAddStudentClick}
            data-testid="add-lecturer-button"
          >
            Add new Lecturer
            <FontAwesomeIcon icon={faUserGraduate} className="ml-3" />
          </h3>
          
        </div>
      </div>

      <div className="xl:flex justify-around overflow-x-auto">
        <table className="w-full max-w-5xl h-36 table-auto">
          <thead>
            <tr className="border-b-2">
              <th className="px-12 py-4 w-1/3 text-left text-xl whitespace-nowrap font-work-sans text-[#797676]">
                Staff ID
              </th>
              <th className="px-6 py-4 w-1/3 text-left text-xl font-work-sans text-[#797676]">
                Name
              </th>
              <th className="px-6 py-4 w-1/3 text-left text-xl font-work-sans text-[#797676]">
                Email
              </th>
              <th className="px-6 py-4 w-1/3 text-left text-xl font-work-sans text-[#797676]">
                Action
              </th>
            </tr>
          </thead>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="py-6 text-center text-[#797676] font-work-sans">
                <LoadingSpinner color="#170E7D" />
              </td>
            </tr>
          ) : (
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-[#797676] font-work-sans">
                    No result found
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr className="border-b h-8" key={item.id}>
                    <td className="px-10 py-4 w-1/3 text-[#797676] font-work-sans whitespace-nowrap">
                      {item.lecturer_id}
                    </td>
                    <td className="px-4 py-4 w-1/3 text-[#797676] font-work-sans whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-4 py-4 w-1/3 text-[#797676] font-work-sans whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className=" flex items-center justify-center h-full cursor-pointer w-1/3 text-[#797676] font-work-sans whitespace-nowrap">
                      <h3
                        className="mr-2 Edit text-lg cursor-pointer"
                        onClick={() => handleEditUser(item.id)}
                        data-testid="Edit"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </h3>
                      <h3
                        className="ml-4"
                        onClick={() => handleDeleteUser(item.id, item.firstname, item.lastname)}
                        data-testid="Delete"
                      >
                        <FontAwesomeIcon icon={faTrashCan} data-testid="Delete" />
                      </h3>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          )}
        </table>
      </div>

      <Pagination
        totalItems={lecturers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {showDialog && <CustomSweetAlert onClose={handleDialogClose} />}
      {showDeleteDialog && deleteDialog}
      {showEditDialog && (
        <EditUserForm
          onClose={() => {
            setShowEditDialog(false);
            setBlurPage(false);
          }}
          userId={editUserId}
          user={filteredStudents.find((item) => item.id === editUserId) || {}}
          data-testid="edit-assignment-form"
        />
      )}
    </div>
  );
};

export default AdminLecturer;
