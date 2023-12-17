/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/pagination";
import LoadingSpinner from "../../components/BeatLoader";
import { fetchStudents } from "../../redux/actions/Admin/adminStudent";
import { setSortOption } from "../../redux/slices/Admin/adminStudent";
import CreateAssignmentForm from "./CreateAssignmentForm";
import StudentSearch from "../../components/search";
import Sidebar from "./sidebar";

const LecturerStudent = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const isLoading = useSelector((state) => state.student.isLoading);
  const sortOption = useSelector((state) => state.student.sortOption);

  const [showDialog, setShowDialog] = useState(false);
  const [blurPage, setBlurPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleCreateAssignment = () => {
    setShowDialog(true);
    setBlurPage(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setBlurPage(false);
  };

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  const handleSearch = (searchTerm) => {
    if (searchTerm !== "") {
      const filtered = students.filter((student) =>
        `${student.name} ${student.email} ${student.student_id}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
      setCurrentPage(1);
    } else {
      setFilteredStudents(students);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    const sortedStudents = [...filteredStudents];

    if (sortOption === "Name") {
      sortedStudents.sort((a, b) =>
        `${a.firstname} ${a.lastname}`.localeCompare(`${b.name}`)
      );
    } else if (sortOption === "Email") {
      sortedStudents.sort((a, b) => a.email.localeCompare(b.email));
    } else if (sortOption === "Id") {
      sortedStudents.sort((a, b) => a.student_id.localeCompare(b.student_id));
    }

    setFilteredStudents(sortedStudents);
  }, [sortOption]);

  useEffect(() => {
    setFilteredStudents(students);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);

  const paginatedData = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    dispatch(setSortOption(event.target.value));
  };

  return (
    <div className={`xl:flex w-full ${blurPage ? "blur-background" : ""}`} data-testid="blur-div">
      <div className="xl:w-1/6">
        <Sidebar />
      </div>

      <div className="w-full">
        <div className="xl:flex justify-between w-full px-4 py-2">
          <StudentSearch
            students={students}
            onSearch={handleSearch}
            data-testid="your-search-input-test-id"
          />
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
                value={sortOption}
                onChange={handleSortChange}
                className="block h-10 mt-1 w-full rounded-lg border border-gray-300 text-center focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Id">Student Id</option>
                <option value="Name">Name</option>
                <option value="Email">Email</option>
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

        <h3 className="font-bold text-3xl  mb-5 text-[#31394E] ml-5">All Students</h3>

        <div className="xl:flex justify-around  overflow-x-auto">
          <table className="w-full xl:max-w-5xl h-36 table-auto">
            <thead>
              <tr className="border-b-2">
                <th className=" px-12 py-4 w-1/3 text-left text-xl whitespace-nowrap font-work-sans text-[#797676]">
                  Student ID
                </th>
                <th className="px-6 py-4 w-1/3 text-left text-xl font-work-sans text-[#797676]">
                  Name
                </th>
                <th className="px-6 py-4 w-1/3 text-left text-xl font-work-sans text-[#797676]">
                  Email
                </th>
              </tr>
            </thead>
            {isLoading ? (
              <div className="fixed inset-0 flex justify-center items-center">
                <LoadingSpinner color="#170E7D" />
              </div>
            ) : (
              <tbody>
                {paginatedData.length === 0 ? (
                  <p className=" text-center">No result found</p>
                ) : (
                  paginatedData.map((item) => (
                    <tr className="border-b" key={item.id}>
                      <td className="px-12 py-4 w-1/3 text-[#797676] font-work-sans whitespace-nowrap">
                        {item.student_id}
                      </td>
                      <td className="px-6 py-4 w-1/3 text-[#797676] font-work-sans whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 w-1/3 text-[#797676] font-work-sans whitespace-nowrap">
                        {item.email}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>

        <Pagination
          totalItems={students.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        {showDialog && <CreateAssignmentForm onClose={handleDialogClose} />}
      </div>
    </div>
  );
};

export default LecturerStudent;
