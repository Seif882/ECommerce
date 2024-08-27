import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {
  let [loading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  let navigator = useNavigate();

  let validator = Yup.object({
    newPassword: Yup.string()
      .matches(
        /^[A-Za-z][A-Za-z0-9]{6,9}$/,
        `Your password must:
      - Start with a letter
      - Be between 6 and 9 characters
      - Contains only letters and numbers`
      )
      .required("This field is required!"),
  });

  let formik = useFormik({
    initialValues: { email: "", newPassword: "" },
    onSubmit: handleSubmit,
    validationSchema: validator,
  });

  function handleSubmit(values) {
    setLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((data) => {
        setLoading(false);
        navigator("/login");
      })
      .catch(() => {
        setLoading(false);
        setErrorMsg(`Invalid Reset Code`);
      });
  }

  return (
    <div className="mt-36">
      <p className="text-2xl text-green-700 font-semibold">
        Enter your email and a new password
      </p>

      <div
        className={`text-lg font-semibold text-red-700 bg-red-300 border-gray-200 border-2 rounded py-2 my-4 ${
          !errorMsg ? "hidden" : "block"
        }`}
      >
        {errorMsg}
      </div>

      <form className="w-full mt-10" onSubmit={formik.handleSubmit}>
        {/* Email Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            id="email"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        {/* Password Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            id="newPassword"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
        </div>

        {/* Password Error */}
        <div
          className={`text-lg font-semibold text-red-700 bg-red-300 border-gray-200 border-2 rounded py-2 my-4 ${
            formik?.errors?.newPassword && formik?.touched?.newPassword
              ? "block"
              : "hidden"
          }`}
        >
          {formik?.errors?.newPassword}
        </div>

        <button
          type={
            Object.keys(formik.errors).length === 0 && formik.touched.name
              ? "submit"
              : "button"
          }
          className={`text-white bg-green-700 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center ${
            Object.keys(formik.errors).length === 0 &&
            formik.touched.newPassword
              ? `hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300`
              : `cursor-not-allowed`
          } `}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}
