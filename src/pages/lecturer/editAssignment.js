/* eslint-disable */

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "../../components/EditorToolbar";
import LoadingSpinner from "../../components/BeatLoader";
import GetSingleAssignment from "../../redux/actions/lecturer/viewSingleAssignment";
import { updateAssignment } from "../../redux/actions/lecturer/editAssignment";

const EditAssignmentForm = ({ onClose, assignmentId, assignment }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef(null);
  const [formData, setFormData] = useState({
    title: assignment.title,
    deadline: assignment.deadline ? new Date(assignment.deadline).toISOString().split("T")[0] : "",
    description: assignment.description
  });

  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const response = await GetSingleAssignment(assignmentId);
        const { data } = response.data;
        const formattedDeadline = new Date(data.deadline).toISOString().split("T")[0];
        setFormData({
          title: data.title,
          deadline: formattedDeadline,
          description: data.description
        });
      } catch (error) {
        // Handle error
      }
    };
    fetchAssignmentData();
  }, [assignmentId]);

  const closeSweetAlert = () => {
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(updateAssignment(assignmentId, formData));

      setIsLoading(false);

      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const isDescriptionValid = !!(formData.description && formData.description.trim());
  const isFormValid = formData.title && formData.deadline && isDescriptionValid;

  return (
    <>
      {isOpen && (
        <div className="custom-modal fixed inset-0 flex items-center justify-center mt-12">
          <div
            data-testid="custom-modal"
            className="modal-content bg-white xl:w-1/2 xl:p-6 h-3/4 rounded-lg shadow-xl relative"
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
              <div className="w-full ml-9 pr-12 ">
                <h3 className="mb-3 text-2xl text-[#31394E] font-bold text-center tracking-wide">
                  Update Assignment
                </h3>
                <label
                  htmlFor="title"
                  className="block ml-4 mb-1 text-[#666666]"
                  data-testid="title"
                >
                  Title:
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full mb-2 h-10 cursor-pointer border border-black-950 px-2 py-2 rounded-lg text-[#666666]"
                  placeholder="eg: Javascript"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <label
                  htmlFor="deadline"
                  className="block ml-4 mb-1 text-[#666666]"
                  data-testid="deadline"
                >
                  Deadline:
                </label>
                <input
                  id="deadline"
                  type="date"
                  className="w-full mb-2 h-10 cursor-pointer border border-black-950 px-2 py-2 rounded-lg text-[#666666]"
                  min={new Date().toISOString().split("T")[0]}
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                />
                <label
                  htmlFor="description"
                  className="block  mb-1 ml-4 text-[#666666]"
                  data-testid="description"
                >
                  Assignment description:
                </label>
                <div>
                  <EditorToolbar />
                  <ReactQuill
                    className=" h-24 overflow-y "
                    theme="snow"
                    name="description"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    modules={modules}
                    formats={formats}
                  />
                </div>
                <div className="flex m-12">
                  <button
                    className="bg-[#170E7D] text-white font-bold py-2 px-4 m-6 rounded block mx-auto relative"
                    onClick={handleSubmit}
                    data-testid="update"
                    disabled={!isFormValid}
                  >
                    {isLoading ? <LoadingSpinner /> : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAssignmentForm;
