/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "../../components/EditorToolbar";
import { fetchStudents } from "../../redux/actions/Admin/adminStudent";
import { setFormData } from "../../redux/slices/lecturer/createAssignment";
import {
  createAssignment,
} from "../../redux/actions/lecturer/createAssignment";
import LoadingSpinner from "../../components/BeatLoader";
import StudentSearch from "../../components/search";

const CreateAssignmentForm = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dialogRef = useRef(null);

  const dispatch = useDispatch();
  const students = useSelector((state) => state.student);
  const isLoading = useSelector((state) => state.student.isLoading);
  const formData = useSelector((state) => state.assignment.formData);
  const isCreatingPublish = useSelector((state) => state.assignment.isCreatingPublish);


  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  

  const closeSweetAlert = () => {
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const resetForm = () => {
    dispatch(setFormData({ title: "", assignment_description: "", deadline: "" }));
  };

  useEffect(() => {
    setFilteredStudents(students.students);
  }, [students]);

  const handleSearch = (searchTerm) => {
    if (searchTerm !== "") {
      const filtered = students.students.filter((student) =>
        `${student.name} ${student.email} ${student.student_id}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
   
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students.students);
    }
  };

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  const handleChange = (name, value) => {
    if (name === "student_id") {
      setSelectedStudentIds((prevSelectedIds) => {
        if (prevSelectedIds.includes(value)) {
          return prevSelectedIds.filter((student_id) => student_id !== value);
        } else {
          return [...prevSelectedIds, value];
        }
      });

      dispatch(setFormData({ ...formData, studentIds: selectedStudentIds }));
    } else {
      dispatch(setFormData({ ...formData, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    
      await dispatch(
        createAssignment({
          ...formData,
          studentIds: selectedStudentIds
        })
      );
      resetForm();
      closeSweetAlert();
    } catch (error) {
      // Handle error
    }
  };


  const backgroundColors = ["#FFA9A9", "#A9EAFF", "#E9A9FF"];
  const isFormValid = formData.title && formData.deadline && formData.assignment_description;
  const isStudentsSelected = selectedStudentIds.length > 0;

  return (
    <>
      {isOpen && (
        <div className="custom-modal fixed inset-0 flex  items-center justify-center mt-10 mb-10 z-40 ">
          <div
            data-testid="custom-modal"
            className="modal-content bg-white xl:w-10/12 xl:p-6 pt-8 h-[90vh] rounded-lg overflow-y-auto shadow-xl relative"
            onClick={handleDialogClick}
            ref={dialogRef}
          >
            <button
              className="close-button absolute top-5 right-7 text-gray-500 hover:text-gray-700"
              onClick={closeSweetAlert}
              aria-label="Close"
              data-testid="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="xl:flex h-full">
              <div className="xl:w-1/2 ml-9 pr-12 border-r-[2px]">
                <h3 className="mb-3 text-2xl text-[#31394E] font-bold text-center tracking-wide">
                  Create New Assignment
                </h3>
                <label htmlFor="title" className="block ml-4 mb-1 text-[#666666]">
                  Title:
                </label>
                <input
                  type="text"
                  className="w-full mb-2 h-10 cursor-pointer border border-black-950 px-2 py-2 rounded-lg"
                  placeholder="eg: Javascript"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
                <label htmlFor="deadline" className="block ml-4 mb-1 text-[#666666]">
                  Deadline:
                </label>
                <input
                  type="date"
                  className="w-full mb-2 h-10 cursor-pointer border border-black-950 px-2 py-2 rounded-lg text-[#666666]"
                  min={new Date().toISOString().split("T")[0]}
                  name="deadline"
                  value={formData.deadline}
                  onChange={(e) => handleChange("deadline", e.target.value)}
                  required
                />
                <label htmlFor="assignment_description" className="block  mb-1 ml-4 text-[#666666]">
                  Assignment description:
                </label>
                <div>
                  <EditorToolbar />
                  <ReactQuill
                    className=" h-24 overflow-y "
                    theme="snow"
                    value={formData.assignment_description}
                    onChange={(value) => handleChange("assignment_description", value)}
                    modules={modules}
                    formats={formats}
                    required
                  />
                </div>
                <div className="flex mt-24">
                  <button
                    className="bg-[#170E7D] text-white font-bold  m-6 pr-8 pl-8 rounded-lg block mx-auto"
                    onClick={handleSubmit}
                    disabled={isCreatingPublish || !isFormValid || !isStudentsSelected }
                    data-testid="SaveAndPublish"
                  >
                    {isCreatingPublish ? <LoadingSpinner /> : " Save and Publish"}
                  </button>

                
                </div>
              </div>

              <div className="xl:ml-6 xl:w-1/2 xl:mr-7">
                <h3 className="mb-3 text-2xl text-[#31394E] font-bold text-center tracking-wide">
                  Invite Student
                </h3>

                <div className="ml-4 ">
                  <StudentSearch students={students} onSearch={handleSearch} />
                </div>

                {isLoading ? (
                  <div className="inset-0 flex justify-center items-center">
                    <LoadingSpinner color="#170E7D" />
                  </div>
                ) : (
                  <div className="h-[70vh] overflow-y-auto  text-[#666666]">
                    {filteredStudents.length === 0 ? (
                      <p className="text-center">No students found</p>
                    ) : (
                      filteredStudents.map((item, index) => (
                        <div className="flex start mt-4 ml-4 w-10/12" key={item.student_id}>
                          <button
                            className="bg-[#170E7D] text-[#000] uppercase rounded-full mt-1 block h-12 w-12"
                            style={{
                              backgroundColor: backgroundColors[index % backgroundColors.length]
                            }}
                          >
                            {item.name.charAt(0)}
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
                            onChange={() => handleChange("student_id", item.student_id)}
                            checked={selectedStudentIds.includes(item.student_id)}
                          />
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAssignmentForm;
