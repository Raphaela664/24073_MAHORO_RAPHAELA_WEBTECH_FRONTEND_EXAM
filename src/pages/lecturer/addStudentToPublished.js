/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../components/BeatLoader";
import GetSingleAssignment from "../../redux/actions/lecturer/viewSingleAssignment";
import { updateAssignment } from "../../redux/actions/lecturer/editAssignedStudent";
import { fetchStudents } from "../../redux/actions/Admin/adminStudent";
import StudentSearch from "../../components/search";

const EditAssignmentForm = ({ onClose, assignmentId, assignment }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    assignedStudents: assignment.AssignmentToUser.map((atUser) => atUser.userId)
  });

  const allStudents = useSelector((state) => state.student.students);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  useEffect(() => {
    dispatch(fetchStudents());

    const fetchAssignmentData = async () => {
      try {
        const response = await GetSingleAssignment(assignmentId);
        const { data } = response.data;
        setFormData({
          assignedStudents: data.AssignmentToUser.map((atUser) => atUser.userId)
        });
      } catch (error) {
        // Handle error
      }
    };
    fetchAssignmentData();
  }, [assignmentId, dispatch]);

  useEffect(() => {
    setFilteredStudents(allStudents);
  }, [allStudents]);

  const closeSweetAlert = () => {
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleChange = (event, userId) => {
    const { checked } = event.target;

    setSelectedStudentIds((prevSelectedIds) => {
      if (checked) {
        return [...prevSelectedIds, userId];
      } else {
        return prevSelectedIds.filter((id) => id !== userId);
      }
    });
  };

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(
        updateAssignment(assignmentId, {
          studentIds: selectedStudentIds
        })
      );

      setIsLoading(false);

      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm !== "") {
      const filtered = allStudents.filter((student) =>
        `${student.name} ${student.email} ${student.student_id}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(allStudents);
    }
  };

  const backgroundColors = ["#FFA9A9", "#A9EAFF", "#E9A9FF"];

  return (
    <>
      {isOpen && (
        <div className="custom-modal fixed inset-0 flex items-center justify-center mt-10 mb-10">
          <div
            data-testid="custom-modal"
            className="modal-content bg-white xl:w-1/2 xl:p-6 h-full rounded-lg shadow-xl relative"
            onClick={handleDialogClick}
            ref={dialogRef}
          >
            <button
              className="close-button absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeSweetAlert}
              aria-label="Close"
              data-testid="times"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div>
              <h3 className="text-2xl text-[#31394E] font-bold text-center tracking-wide">
                Update Students
              </h3>
              <div className="ml-36">
                <StudentSearch students={allStudents} onSearch={handleSearch} />
              </div>

              <div className="assigned-students h-[62vh] overflow-y-auto ">
                <div className="text-[#666666]">
                  {filteredStudents.map((item, index) => (
                    <div className="flex start mt-4 ml-16 w-11/12" key={item.student_id}>
                      <button
                        className="bg-[#170E7D] text-[#000] uppercase rounded-full mt-1 block h-12 w-12"
                        style={{
                          backgroundColor: backgroundColors[index % backgroundColors.length]
                        }}
                      >
                        {item.lastname.charAt(0)}
                      </button>
                      <div className="w-2/3 ml-10">
                        <h3>
                          {item.name}
                        </h3>
                        <h3>{item.student_id}</h3>
                        <h3>{item.email}</h3>
                      </div>
                      <input
                        type="checkbox"
                        className="cursor-pointer center items-center mt-5 h-6 w-6"
                        onChange={(event) => handleChange(event, item.student_id)}
                        checked={selectedStudentIds.includes(item.student_id)}
                        disabled={formData.assignedStudents.includes(item.student_id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex ">
                <button
                  className="bg-[#170E7D] text-white font-bold py-2 px-4 m-6 rounded block mx-auto relative"
                  onClick={handleSubmit}
                  data-testid="update"
                  disabled={selectedStudentIds.length === 0}
                >
                  {isLoading ? <LoadingSpinner /> : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAssignmentForm;
