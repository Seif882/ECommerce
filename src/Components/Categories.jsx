import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "./Item";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
  //? Api Call Function ?//
  function categoriesAPICall() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  //? Server State Management ?//
  let { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesAPICall,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //? Show Loading If The API Is Still Loading ?//
  if (isLoading) return <Loading></Loading>;

  return (
    <>
      <div className="mt-36 flex flex-wrap justify-center flex-col">
        <h2 className="text-green-700 text-4xl font-semibold mb-8">
          Top Categories
        </h2>
        <div className="flex flex-wrap justify-center">
          {data.data.data?.map((cat) => (
            <Item key={cat._id} props={["categories", cat]}></Item>
          ))}
        </div>
      </div>
    </>
  );
}
