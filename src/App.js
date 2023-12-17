/* eslint-disable no-console */
import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./routes";
import "./App.css";

const App = () => {


  return (
    <div className="app" data-testid="App">
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;