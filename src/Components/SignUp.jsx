import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SignUp() {
  let [loading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  let navigator = useNavigate();

  async function handleSubmit(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        setLoading(false);
        setErrorMsg("");
        navigator("/login");
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.response.data.message);
      });
  }

  let validator = Yup.object({
    name: Yup.string()
      .min(3, "Name must contain more than 3 characters!")
      .required("This field is required!"),

    email: Yup.string()
      .email("Enter a valid email!")
      .required("This field is required!"),

    password: Yup.string()
      .matches(
        /^[A-Za-z][A-Za-z0-9]{6,9}$/,
        `Your password must:
      - Start with a letter
      - Be between 6 and 9 characters
      - Contains only letters and numbers`
      )
      .required("This field is required!"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Both passwords must match")
      .required("This field is required!"),

    phone: Yup.string()
      .matches(/^01[0-5][0-9]{8}$/, "Enter a valid phone number")
      .required("This field is required!"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validator,
  });

  return (
    <>
      <div className="w-full mt-28">
        <div
          className={`text-lg font-semibold text-red-700 bg-red-300 border-gray-200 border-2 rounded py-2 my-4 ${
            errorMsg === "" ? "hidden" : "block"
          }`}
        >
          {errorMsg}
        </div>

        <form className="w-full" onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="name"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>

          {/* Name Error */}
          <div
            className={`text-lg font-semibold text-red-700 bg-red-300 border-gray-200 border-2 rounded py-2 my-4 ${
              formik?.errors?.name && formik?.touched?.name ? "block" : "hidden"
            }`}
          >
            {formik?.errors?.name}
          </div>

          {/* Email Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="email"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          {/* Email Error */}
          <div
            className={`text-lg font-semibold text-red-700 bg-red-300 border-gray-200 border-2 rounded py-2 my-4 ${
              formik?.errors?.email && formik?.touched?.email
                ? "block"
                : "hidden"
            }`}
          >
            {formik?.errors?.email}
          </div>

          {/* Password Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="password"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          {/* Password Error */}
          <div
            className={`text-lg font-semibold text-red-700 bg-red-300 border-gray-200 border-2 rounded py-2 my-4 ${
              formik?.errors?.password && formik?.touched?.password
                ? "block"
                : "hidden"
            }`}
          >
            {formik?.errors?.password}
          </div>

          {/* RePassword Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="floating_rePassword"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm your password
            </label>
          </div>

          {/* RePassword Error */}
          <div
            className={`text-lg font-semibold text-red-700 bg-red-300 border-gray-200 border-2 rounded py-2 my-4 ${
              formik?.errors?.rePassword && formik?.touched?.rePassword
                ? "block"
                : "hidden"
            }`}
          >
            {formik?.errors?.rePassword}
          </div>

          {/* Phone Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              id="phone"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>

          {/* Phone Error */}
          <div
            className={`text-lg font-semibold text-red-700 bg-red-300 border-gray-200 border-2 rounded py-2 my-4 ${
              formik?.errors?.phone && formik?.touched?.phone
                ? "block"
                : "hidden"
            }`}
          >
            {formik?.errors?.phone}
          </div>

          <button
            type={
              Object.keys(formik.errors).length === 0 && formik.touched.name
                ? "submit"
                : "button"
            }
            className={`text-white bg-green-700 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center ${
              Object.keys(formik.errors).length === 0 && formik.touched.name
                ? `hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300`
                : `cursor-not-allowed`
            } `}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spinPulse />
            ) : (
              "Submit"
            )}
          </button>

          <p className="text-xl mt-2 ">
            Already have an account?
            <Link to={"/login"} className="text-green-700 mx-1">
              log in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
