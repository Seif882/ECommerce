import {
  faBars,
  faClose,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import { removeData } from "../libs/Slices/userDataSlice";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Layout() {
  //? Variable Used To Change The Status OF The Nav Menu ?//
  let [btnState, setBtnState] = useState(false);

  //? Variable Used To Log Out ?//
  let dispatch = useDispatch();

  //? Variables Used To Get The Cart Items Number ?//
  let { token } = useSelector((data) => data.userData);
  let localToken = localStorage.getItem("token");

  //? Functions Used To Get The Cart Items Number ?//
  function getCartNum() {
    if (localToken) {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localToken },
      });
    }
    if (token) {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      });
    }
  }

  //? Server State Management ?//
  let { data } = useQuery({
    queryKey: ["userCart"],
    queryFn: getCartNum,
    refetchOnWindowFocus: false,
    refetchInterval: 1000,
  });

  return (
    <>
      <nav
        className={`fixed left-0 top-0 w-screen py-4 items-center justify-between px-6 flex-wrap h-fit bg-white z-10 shadow-md ${
          token || localToken ? "flex" : "hidden"
        }`}
      >
        {/* Logo */}
        <Link to={"./Home"}>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-green-700 text-4xl"
            />
            <span className="text-black text-4xl font-semibold">
              Fresh Cart
            </span>
          </div>
        </Link>

        <button className="lg:hidden border border-1 border-gray-400 w-[50px] h-[50px] rounded">
          <FontAwesomeIcon
            icon={btnState ? faClose : faBars}
            className="text-4xl text-gray-700"
            onClick={() => {
              setBtnState(!btnState);
            }}
          />
        </button>

        {/* Nav Links */}
        <ul
          className={`${
            btnState ? "block w-full my-2" : "hidden"
          } lg:flex gap-1`}
        >
          <li
            className={` text-xl ${btnState ? "my-2" : ""}`}
            onClick={() => {
              setBtnState(false);
            }}
          >
            <NavLink to={"./Home"}>Home</NavLink>
          </li>
          <li
            className={` text-xl ${btnState ? "my-2" : ""}`}
            onClick={() => {
              setBtnState(false);
            }}
          >
            <NavLink to={"./WishList"}>WishList</NavLink>
          </li>
          <li
            className={` text-xl ${btnState ? "my-2" : ""}`}
            onClick={() => {
              setBtnState(false);
            }}
          >
            <NavLink to={"./Products"}>Products</NavLink>
          </li>
          <li
            className={` text-xl ${btnState ? "my-2" : ""}`}
            onClick={() => {
              setBtnState(false);
            }}
          >
            <NavLink to={"./Categories"}>Categories</NavLink>
          </li>
          <li
            className={` text-xl ${btnState ? "my-2" : ""}`}
            onClick={() => {
              setBtnState(false);
            }}
          >
            <NavLink to={"./Brands"}>Brands</NavLink>
          </li>
        </ul>

        {/* Cart + Log Out */}
        <div
          className={`${
            btnState ? "block w-full my-5" : "hidden"
          } lg:flex gap-4`}
        >
          {/* Cart */}
          <Link to={"./cart"} className="relative">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-gray-700 text-3xl"
            />
            <div className="absolute text-white bg-green-700 top-[-15px] right-[-10px] px-2 rounded">
              {data?.data?.numOfCartItems}
            </div>
          </Link>

          {/* Log Out */}
          <Link
            to={"./login"}
            className={`text-xl ${btnState ? "block my-5" : ""}`}
            onClick={() => {
              dispatch(removeData());
            }}
          >
            Log Out
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
