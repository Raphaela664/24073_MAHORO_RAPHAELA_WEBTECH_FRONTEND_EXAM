/* eslint-disable */
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../components/BeatLoader";
import { updateStudent } from "../../redux/actions/Admin/editUser";

const editStudent = ({ onClose, userId, user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef(null);
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email
  });

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

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(updateStudent(userId, formData));

      setIsLoading(false);

      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="custom-modal fixed inset-0 flex items-center justify-center">
          <div
            data-testid="custom-modal"
            className="modal-content bg-white xl:w-5/12 p-6 rounded-lg shadow-xl relative"
            onClick={handleDialogClick}
            ref={dialogRef}
          >
            <button
              className="close-button absolute top-6 right-8 text-gray-500 hover:text-gray-700"
              onClick={closeSweetAlert}
              aria-label="Close"
              data-testid="times"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <h3 data-testid="student" className="mb-3 text-xl font-bold text-center">
              Update User
            </h3>

            <form onSubmit={handleSubmit} className="m-4">
              <input
                id="email"
                type="email"
                className="w-full mb-6 h-9 cursor-pointer border border-black-950 px-2 py-2 rounded-lg"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                data-testid="email"
              />
              <input
                id="firstname"
                type="text"
                className="w-full mb-6 h-9 cursor-pointer border border-black-950 px-2 py-2 rounded-lg"
                placeholder="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                data-testid="firstName"
              />
              <input
                id="lastname"
                type="text"
                className="w-full  mb-6 h-9 cursor-pointer border border-black-950 px-2 py-2 rounded-lg"
                placeholder="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                data-testid="lastName"
              />
              <button
                type="submit"
                className="gradient text-white font-bold py-2 px-6  mb-20 rounded-lg block mx-auto"
                data-testid="update"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : "Update"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default editStudent;
