/* eslint-disable */
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faBriefcase, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardData } from "../../redux/actions/Admin/adminDashboard";
import board from "../../assets/board.png";
// import AssignmentStatus from "./assignmentStatus";
// import RecentAccounts from "./RecentAccountsCreated";
// import BoardChart from "../../components/boardChart";

const adminDashboard = () => {
  const adminName = localStorage.getItem("firstName");

  const dispatch = useDispatch();
  // const data = useSelector((state) => state.dashboard);

  // useEffect(() => {
  //   dispatch(fetchDashboardData());
  // }, []);

  return (
    <div className="p-3 xl:ml-3 xl:flex">
      <div className="xl:w-2/3">
        <div className="xl:flex p-4 bg-[#F7F9FB]   xl:mt-8">
          <div>
            <h3 className=" text-4xl text-center text-color2 mb-3">Welcome back, {adminName}</h3>
            <p className=" mb-2 text-color xl:ml-3">
              Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
              velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenae.
            </p>
          </div>
          <img className="xl:w-56 xl:ml-3" src={board} />
        </div>

        <h3 className="p-4  text-xl text-[#9F9F9F]">Overview</h3>

        <div className="xl:flex   justify-between">
          <div className="flex bg-[#F7F9FB] p-3 xl:w-1/4 xl:mr-2 mb-2 rounded-lg">
            <FontAwesomeIcon
              icon={faUserGraduate}
              className="m-2 bg-[#E5E3FE] p-4 rounded-full mt-4"
            />
            <div className="pt-4 whitespace-nowrap">
              {/* <h3 className=" head font-bold">{data.lecturers}</h3> */}
              <h4 className="text-color ">Lecturers</h4>
            </div>
          </div>

          <div className="flex bg-[#F7F9FB] p-3 xl:w-1/4 xl:mr-2 mb-2 rounded-lg">
            <FontAwesomeIcon
              icon={faUserGraduate}
              className="m-2 bg-[#E5E3FE] p-4 rounded-full mt-4"
            />
            <div className="pt-4 whitespace-nowrap">
              {/* <h3 className=" head font-bold">{data.students}</h3> */}
              <h4 className="text-color">Students</h4>
            </div>
          </div>

          <div className="flex bg-[#F7F9FB] p-3 xl:w-1/4 xl:mr-2 mb-2 rounded-lg">
            <FontAwesomeIcon
              icon={faClipboardList}
              className="m-1 bg-[#E5E3FE] p-4 rounded-full mt-4"
            />
            <div className="pt-4 whitespace-nowrap">
              {/* <h3 className=" head font-bold">{data.assignments}</h3> */}
              <h4 className="text-color">Assignment Created</h4>
            </div>
          </div>

          <div className="flex bg-[#F7F9FB] p-3 xl:w-1/4 mb-2 rounded-lg">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="m-2 bg-[#E5E3FE] p-4 rounded-full mt-4"
            />
            <div className="pt-4 whitespace-nowrap">
              {/* <h3 className=" head font-bold">{data.submissions}</h3> */}
              <h4 className="text-color">Submission made</h4>
            </div>
          </div>
        </div>
        <h3 className="p-4  text-xl text-[#9F9F9F] ">Activities of Users</h3>
        {/* <BoardChart className="w-full xl:w-full" /> */}
      </div>

      {/* <div className="xl:w-1/3 w-full xl:ml-5 xl:mt-7 rounded">
        <AssignmentStatus data-testid="assignment-status" />
        <RecentAccounts className="p-2" data-testid="recent-accounts" />
      </div> */}
    </div>
  );
};

export default adminDashboard;
