import React from "react";
import Login from "./Login";

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else return <Login></Login>;
}
