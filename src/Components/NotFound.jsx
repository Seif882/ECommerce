import React from "react";
import errorImage from "../assets/404.avif";
export default function NotFound() {
  return (
    <div className="mt-36 flex justify-center flex-wrap">
      <p className="text-green-700 text-4xl font-semibold my-10 w-full">
        Page Not Found
      </p>
      <img src={errorImage} />
    </div>
  );
}
