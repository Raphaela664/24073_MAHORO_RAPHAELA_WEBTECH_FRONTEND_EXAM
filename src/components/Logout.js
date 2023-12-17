/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/Logout";
import LoadingSpinner from "./BeatLoader";

const LogoutAlert = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.logout.isLoading);

  const navigate = useNavigate();

  const closeSweetAlert = () => {
    setIsOpen(false);
    onClose();
  };

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = async () => {
    try {
      await dispatch(logoutUser());

      localStorage.clear();
      closeSweetAlert();
      navigate("/");
      window.location.reload();
    } catch (error) {
      localStorage.clear();
      window.location.reload();
    }
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

  return (
    <>
      {isOpen && (
        <div className="custom-modal fixed inset-0 flex items-center justify-center">
          <div
            data-testid="custom-modal"
            className="modal-content bg-white xl:w-4/12 p-6 rounded-lg shadow-xl relative"
            onClick={handleDialogClick}
          >
            <h3 data-testid="Confirm-Logout" className="mb-3 text-xl font-semi-bold text-[#797676]">
              Confirm Logout
            </h3>
            <h3 data-testid="Sure" className="mb-3 text-lg">
              Are you sure you want to logout from{" "}
              <span className="font-bold">Assign IT dashboard?</span>
            </h3>
            <div className="flex">
              <button
                className="text-gradient font-bold border-2 border-gradient-700 rounded-lg py-2 px-4 m-6 block mx-auto"
                onClick={() => {
                  closeSweetAlert();
                }}
              >
                Cancel
              </button>
              <button
                className="gradient text-white font-bold py-2 px-4 m-6 rounded block mx-auto"
                onClick={handleSubmit}
              >
                {isLoading ? <LoadingSpinner /> : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutAlert;
