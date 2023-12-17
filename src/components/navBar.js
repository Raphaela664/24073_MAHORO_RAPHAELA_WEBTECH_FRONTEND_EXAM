import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/upload_ogo.png";
import LogoutAlert from "./Logout";

const NavBar = () => {
  const adminEmail = localStorage.getItem("email");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };
  const toggleLogout = () => {
    setIsLogout((prevIsLogout) => !prevIsLogout);
  };

  return (
    <nav className="flex items-center justify-between gradient p-4 z-40">
      <div className="flex items-center space-x-9">
        <div className="flex items-center space-x-3">
          <img src={Logo} className="h-14 w-14 ml-4 p-2 bg-white" alt="logo" />
          <div className="flex">
            <h3 className="text-white xl:text-xl hidden xl:block">Assign</h3>
            <h3 className="text-white xl:text-xl pt-3 hidden xl:block">IT</h3>
          </div>
        </div>
      </div>

      <div>
        <div className="xl:hidden">
          <button
            className="text-white font-work-sans text-2xl "
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            Menu
          </button>
        </div>

        <div
          data-testid="menu"
          className={`${
            isMenuOpen ? "block" : "hidden"
          } xl:flex items-center text-white cursor-pointer list-none gradient transition-all ease-in-out duration-300 xl:space-x-4 xl:ml-3 absolute left-0 w-full xl:w-auto xl:static xl:h-auto xl:bg-transparent mt-6 xl:mt-0 xl:ml-0`}
        >
          <li className="y-6 xl:my-0 ml-2 mr-4 my-6">
            <Link
              to="/admin/dashboard"
              className={`my-6 xl:my-0 no-underline text-white ml-2 mr-4 ${
                location.pathname === "/admin/dashboard" ? "border-b-2 pb-2" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li className="y-6 xl:my-0 ml-4 my-8 ">
            <Link
              to="/admin/student"
              className={`my-6 xl:my-0 no-underline text-white mr-4 ${
                location.pathname === "/admin/student" ? "border-b-2 pb-2" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Student
            </Link>
          </li>
          <li className="y-6 xl:my-0  text-white ml-4 mr-4 my-8">
            <Link
              to="/admin/lecturer"
              className={`my-6 no-underline text-white xl:my-0  ${
                location.pathname === "/admin/lecturer" ? "border-b-2 pb-2" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Lecturer
            </Link>
          </li>
        </div>
      </div>

      <div className="flex items-center space-x-4 ml-3">
        <h3
          className="text-white cursor-pointer border border-white px-2 py-2 rounded-lg"
          onClick={toggleLogout}
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="mr-2 ml-2"
            style={{ color: "#f7f7f8" }}
          />
          Logout
        </h3>
        <h3 className="hidden xl:block  text-white">{adminEmail}</h3>
        <img
          src="https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg"
          className="h-14 w-14 rounded-full hidden xl:block"
          alt="user avatar"
        />
      </div>
      {isLogout && <LogoutAlert onClose={toggleLogout} />}
    </nav>
  );
};

export default NavBar;
