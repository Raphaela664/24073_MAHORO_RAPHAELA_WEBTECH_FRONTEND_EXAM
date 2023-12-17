/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LoadingSpinner from "./BeatLoader";

const DashboardChart = () => {
  const [chartData, setChartData] = useState(null);
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
        const months = [...Array(12).keys()].map((month) => month + 1);

        const activeStudents = Array(12).fill(0);
        const inactiveStudents = Array(12).fill(0);
        const activeLecturers = Array(12).fill(0);
        const inactiveLecturers = Array(12).fill(0);

        studentsData.forEach((user) => {
          const createdAt = new Date(user.createdAt);
          const month = createdAt.getMonth();
          if (user.isInviteAccepted) {
            activeStudents[month]++;
          } else {
            inactiveStudents[month]++;
          }
        });

        lecturersData.forEach((user) => {
          const createdAt = new Date(user.createdAt);
          const month = createdAt.getMonth();
          if (user.isInviteAccepted) {
            activeLecturers[month]++;
          } else {
            inactiveLecturers[month]++;
          }
        });

        const chartData = {
          labels: months.map((month) => month.toString()),
          datasets: [
            {
              label: "Active Students",
              data: activeStudents,
              backgroundColor: "#1D157B"
            },
            {
              label: "Inactive Students",
              data: inactiveStudents,
              backgroundColor: "#DB4427"
            },
            {
              label: "Active Lecturers",
              data: activeLecturers,
              backgroundColor: "#1252CF"
            },
            {
              label: "Inactive Lecturers",
              data: inactiveLecturers,
              backgroundColor: "#BDEAF3"
            }
          ]
        };

        setChartData(chartData);
        setIsLoading(false);
      } catch (error) {
        //
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    CategoryScale.id = "category";
    CategoryScale.defaults = CategoryScale.defaults || {};
    CategoryScale.defaults.ticks = CategoryScale.defaults.ticks || {};
    CategoryScale.defaults.ticks.major = {
      enabled: true
    };
    CategoryScale.defaults.ticks.minor = {
      enabled: true
    };
    Chart.register(CategoryScale);
  }, []);

  return (
    <div className="">
      {isLoading ? (
        <div className=" inset-0 flex justify-center items-center" data-testid="loading-spinner">
          <LoadingSpinner color="#170E7D" />
        </div>
      ) : (
        chartData && (
          <Bar
            data-testid="bar-chart"
            w
            data={chartData}
            options={{
              scales: {
                x: {
                  type: "category",
                  title: {
                    display: true,
                    text: "Months"
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: "Number of Users"
                  },
                  min: 0,
                  max: 100,
                  stepSize: 100
                }
              }
            }}
          />
        )
      )}
    </div>
  );
};
export default DashboardChart;
