import React, { useEffect, useState } from "react";
import axios from "../../utils/api";
import LoadingSpinner from "../../components/BeatLoader";

const RecentAccountsCreated = () => {
  const [recentAccounts, setRecentAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem("access-token"));
        const response = await axios.get("/api/info/dashboard", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const studentsData = response.data.data.students.data;
        const lecturersData = response.data.data.lecturers.data;
        const allAccounts = [...studentsData, ...lecturersData];
        allAccounts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const recentAccounts = allAccounts.slice(0, 20);
        setRecentAccounts(recentAccounts);
        setIsLoading(false);
      } catch (error) {
        //
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full  bg-white md:pl-4 pt-4 pb-4">
      <div className="overflow-y-auto h-[48vh]">
        <h3 className="text-color mb-3">Recent</h3>
        {isLoading ? (
          <div className=" inset-0 flex justify-center items-center" data-testid="loading-spinner">
            <LoadingSpinner color="#170E7D" />
          </div>
        ) : (
          <div data-testid="recent-accounts">
            {recentAccounts.map((account) => (
              <li
                key={account.id}
                className="text-lg flex mb-4 text-center hover:bg-[#F7F9FB] rounded-lg p-2 items-center "
              >
                <div className=" inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-3">
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {account.lastname[0].toUpperCase()}
                  </span>
                </div>
                <p className="text-center mr-3">{`${account.lastname} ${account.firstname}`}</p>

                <p className="text-[#697388] text-lg text-center">
                  {" "}
                  @{account.lastname.toLowerCase()}
                </p>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentAccountsCreated;
