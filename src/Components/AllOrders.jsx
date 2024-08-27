import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
  let navigator = useNavigate();
  useEffect(() => {
    navigator("/home");
  }, []);
  return <div></div>;
}
