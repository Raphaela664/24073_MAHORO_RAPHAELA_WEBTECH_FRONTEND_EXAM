/* eslint-disable */

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/upload_ogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import LogoutAlert from "../../components/Logout";

const Sidebar = () => {
  const location = useLocation();
  const [isLogout, setIsLogout] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const Name = localStorage.getItem("firstName");

  const Menus = [
    { title: "Dashboard", path: "/lecturer/dashboard" },
    { title: "Student", path: "/lecturer/view-students" },
    { title: "Submission", path: "/lecturer/submission" },
    { title: "Draft", path: "/lecturer/draft" }
  ];

  const toggleLogout = () => {
    setIsLogout((prevIsLogout) => !prevIsLogout);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <aside className=" xl:w-48 sidebar flex flex-col justify-between gradient ">
      <div className=" flex xl:grid  pb-4 pt-4 xl:h-screen justify-between xl:justify-center">
        <div className="xl:grid flex xl:h-96">
          <div className="xl:mt-4 w-full  xl:mb-12 justify-start ml-8 flex">
            <img src={Logo} className="h-14 xl:w-14 hidden xl:block mr-2 p-2 bg-white" alt="logo" />
            <div className="flex">
              <h3 className="text-white xl:text-xl hidden xl:block">Assign</h3>
              <h3 className="text-white xl:text-xl pt-3 hidden xl:block">IT</h3>
            </div>
          </div>

          <div className="xl:hidden">
            <button
              className="text-white font-work-sans mr-8 text-2xl"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              Menu
            </button>
          </div>

          <div className="Menus xl:w-full flex ">
            <div
              className={`${
                isMenuOpen ? "block" : "hide"
              }  w-full xl:flex flex-col colo list-none pt-6 mt-[45px] transition-all ease-in-out duration-300   xl:static xl:h-auto xl:bg-transparent  xl:mt-0 xl:ml-0`}
            >
              {Menus.map((menu, index) => (
                <Link
                  to={menu.path}
                  key={index}
                  className="no-underline"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  <li
                    className={`text-normal cursor-pointer p-3 pl-8 hover:bg-[#382dbc] w-full  justify-center ${
                      location.pathname.includes(menu.path) ? "bg-[#382dbc]" : ""
                    }  `}
                  >
                    <span className="text-white">{menu.title}</span>
                  </li>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:flex  flex-col h-2 xl:mt-16 xl:ml-8">
          <div className="Account flex items-center xl:mb-5">
            <img
              src="https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg"
              className="h-14 w-14 rounded-full hidden xl:block"
              alt="user avatar"
            />
            <p className="text-white hidden xl:block ml-4">{Name}</p>
          </div>
          <div className="Logout flex xl:mb-12 cursor-pointer">
            <h3 className="text-white cursor-pointer  px-2 py-2 " onClick={toggleLogout}>
              Logout
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="mr-2 ml-2 "
                style={{ color: "#f7f7f8" }}
              />
            </h3>
          </div>
        </div>
      </div>
      {isLogout && <LogoutAlert onClose={toggleLogout} />}
    </aside>
  );
};

export default Sidebar;
