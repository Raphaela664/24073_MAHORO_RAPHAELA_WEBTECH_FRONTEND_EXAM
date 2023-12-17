/* eslint-disable */
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../components/BeatLoader";
import { createUser } from "../../redux/actions/Admin/createAccount";
import { closeAlert, setLoading, openAlert } from "../../redux/slices/Admin/createAccount";

const CustomSweetAlert = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isOpen, isLoading } = useSelector((state) => state.customAlert);
  const dialogRef = useRef(null);

  const closeSweetAlert = () => {
    dispatch(closeAlert());
    onClose();
  };

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));

    const { email, firstname, lastname, role } = event.target.elements;

    const userData = {
      email: email.value,
      name: firstname.value+ " "+lastname.value,
      role: role.value
    };

    await dispatch(createUser(userData));
    dispatch(setLoading(false));
  };

  if (!isOpen) {
    dispatch(openAlert());
  }

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
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <h3 data-testid="student" className="mb-3 text-xl font-bold text-center">
              Tell us a little about the <br /> lecturer you are adding
            </h3>
            <h3 className="mb-8 text-base  text-center">
              Please fill the following details to get started
            </h3>
            <form onSubmit={handleSubmit} className="m-4">
              <input
                type="email"
                className="w-full mb-6 h-9 cursor-pointer border border-black-950 px-2 py-2 rounded-lg"
                placeholder="Email"
                name="email"
                required
              />
              <input
                type="text"
                className="w-full mb-6 h-9 cursor-pointer border border-black-950 px-2 py-2 rounded-lg"
                placeholder="First Name"
                name="firstname"
                required
              />
              <input
                type="text"
                className="w-full  mb-6 h-9 cursor-pointer border border-black-950 px-2 py-2 rounded-lg"
                placeholder="Last Name"
                name="lastname"
                required
              />
              <input
                type="text"
                className="w-full h-9 cursor-pointer border border-black-950 px-2 py-2 rounded-lg"
                value="LECTURER"
                name="role"
                readOnly
                hidden
              />
              <button
                type="submit"
                className="gradient text-white font-bold py-2 px-6  mb-20 rounded-lg block mx-auto"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomSweetAlert;
