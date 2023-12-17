/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/BeatLoader";
import { deleteStudent } from "../../redux/actions/Admin/deleteUser";

const deleteUserForm = ({ onClose, userId, firstName, lastName }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userDelete.isLoading);
  const closeSweetAlert = () => {
    setIsOpen(false);
    onClose();
  };

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("blur-background");
    } else {
      document.body.classList.remove("blur-background");
    }

    return () => {
      document.body.classList.remove("blur-background");
    };
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      const response = await deleteStudent(dispatch, userId);
      if (response) {
        toast.success(response.message);
      }
      onClose();
    } catch (error) {
      //
    }
  };
  return (
    <div className="custom-modal fixed inset-0 flex items-center justify-center">
      <div
        data-testid="custom-modal"
        className="modal-content bg-white md:w-4/12 p-6 rounded-lg shadow-xl relative"
        onClick={handleDialogClick}
      >
        <h3
          data-testid="Confirm-Delete"
          className="mb-3 text-xl font-semi-bold text-center text-[#797676]"
        >
          Delete User
        </h3>
        <h3 data-testid="Sure" className="mb-3 text-center text-lg">
          Are you sure you want to delete
          <span className="font-bold text-center capitalize">
            {" "}
            {firstName} {lastName}?
          </span>
        </h3>
        <div className="flex">
          <button
            data-testid="Cancel"
            className="text-gradient font-bold border-2 border-gradient-700 rounded-lg py-2 px-4 m-6 block mx-auto"
            onClick={() => {
              closeSweetAlert();
            }}
          >
            Cancel
          </button>
          <button
            data-testid="delete"
            type="button"
            className="bg-red-700 text-white font-bold py-2 px-4 m-6 rounded block mx-auto"
            onClick={handleSubmit}
          >
            {isLoading ? <LoadingSpinner /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default deleteUserForm;
