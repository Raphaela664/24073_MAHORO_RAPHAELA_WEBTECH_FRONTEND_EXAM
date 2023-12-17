import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import laptop from "../../assets/laptop.png";
import { login } from "../../redux/actions/Login";
import { ValidateEmailorID, ValidatePassword } from "../../utils/validations";
import LoadingSpinner from "../BeatLoader";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [authData, setAuthData] = useState({
    email: "",
    password: ""
  });
  const { error, pending } = useSelector((state) => state.user);

  const handleValidationEmailorID = () => {
    setErrors(ValidateEmailorID(authData));
  };

  const handleValidationPassword = () => {
    setErrors(ValidatePassword(authData));
  };
  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErrors = ValidateEmailorID(authData);
    const passwordErrors = ValidatePassword(authData);
    if (Object.keys(emailErrors).length > 0) {
      return setErrors(emailErrors);
    } else if (Object.keys(passwordErrors).length > 0) {
      return setErrors(passwordErrors);
    } else {
      login(authData, dispatch, navigate, setAuthData);
    }
  };

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className="login-page min-h-screen items-center flex-col md:flex-row
    justify-center"
      >
        <div className=" min-h-screen flex flex-1">
          <div
            className="right-side flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-indigo-950 items-center justify-center hidden md:block"
            style={{ flex: "0 0 33%" }}
          >
            <div className="h-full flex flex-col justify-between">
              <div className="mt-auto mx-4">
                <h3 className="text-white font-bold mt-16 mb-4 mt-4 text-4xl">
                  A Git-Inspired Assignment submission system
                </h3>
                <p className="text-customWhite text-xs">
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                  velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos.
                </p>
              </div>
              <div className="mt-auto">
                <img className="h-auto max-w-full h-auto" src={laptop} alt="image description" />
              </div>
            </div>
          </div>
          <div
            className="left-side  shadow-md rounded px-4 md:px-8 flex flex-col justify-center items-center bg-indigo-950 md:bg-white"
            style={{ flex: "1" }}
          >
            <div className="items-center  md:max-w-md justify-center w-11/12 md:hidden text-center">
              <h3 className="text-white font-bold mt-16 mb-4 mt-4 text-4xl">
                A Git-Inspired Assignment submission system
              </h3>
            </div>
            <form className=" box items-center w-full md:max-w-md justify-center mx-auto bg-white rounded-lg md:rounded-none ">
              <div className="mx-10 my-12 mx-w-xl">
                <h3 className="font-bold mb-4 text-customGray text-2xl text-center">
                  Welcome Back,
                  <br className="md:hidden" /> Log in
                </h3>

                {error.condition && (
                  <div
                    className=" border  text-errorColor shadow-md px-4 py-3 rounded relative text-center"
                    role="alert"
                  >
                    <span className="block sm:inline ">{error.message}</span>
                  </div>
                )}

                <div className="mb-4">
                  <label className="font-bold text-customGray mb-2">Email/Staff ID</label>
                  <input
                    name="email"
                    placeholder="Enter your email or staff ID"
                    value={authData.email}
                    onChange={handleChange}
                    onKeyUp={handleValidationEmailorID}
                    data-testid="input-email"
                    className={`${
                      errors.email || error.condition ? "border-errorColor" : "border-inherit"
                    }  email-class shadow appearance-none border mt-2
                rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 md:pr-16 bg-white`}
                    required
                  />
                  {errors.email && (
                    <div
                      className=" border shadow-md  text-errorColor px-4 py-3 mt-2 rounded relative text-center w-4/5"
                      role="alert"
                      data-testid="errors-email"
                    >
                      <span className="block sm:inline font-bold ">{errors.email}</span>
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <label className="font-bold text-customGray">Password</label>
                  <div className="relative">
                    <div className="w-full">
                      <input
                        type={open === false ? "password" : "text"}
                        name="password"
                        placeholder="Enter your password"
                        value={authData.password}
                        onChange={handleChange}
                        data-testid="input-password"
                        onKeyUp={handleValidationPassword}
                        className={`${
                          errors.password || error.condition
                            ? "border-errorColor"
                            : "border-inherit"
                        }  shadow appearance-none mt-2
                 border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10 md:pr-16`}
                        required
                      />
                      {errors.password && (
                        <div
                          className=" border shadow-lg text-errorColor px-4 py-3  w-4/5 rounded relative text-center"
                          role="alert"
                          data-testid="errors-password"
                        >
                          <span className="block sm:inline font-bold ">{errors.password}</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-7 right-5 transform -translate-y-1/2 text-2xl ">
                      {open === false ? (
                        <AiOutlineEye onClick={toggle} data-testid="toggle-password-visible" />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={toggle}
                          data-testid="toggle-password-invisible"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded w-full justify-center"
                  onClick={handleSubmit}
                  data-testid="login-button"
                >
                  {pending ? <LoadingSpinner /> : "Log in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
