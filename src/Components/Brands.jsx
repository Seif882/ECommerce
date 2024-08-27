import axios from "axios";
import React, { useEffect } from "react";
import Loading from "./Loading";
import Item from "./Item";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  //? Api Call Function ?//
  function brandsAPICall() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  //? Server State Management ?//
  let { isLoading, data } = useQuery({
    queryKey: ["brands"],
    queryFn: brandsAPICall,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //? Show Loading If The API Is Still Loading ?//
  if (isLoading) return <Loading></Loading>;

  return (
    <>
      <div className="mt-28 flex flex-wrap justify-center flex-col">
        <h2 className="text-green-700 text-4xl font-semibold mb-8">
          All Brands
        </h2>

        <div className="flex flex-wrap justify-center">
          {data.data.data?.map((brand) => (
            <Item key={brand._id} props={["brands", brand]}></Item>
          ))}
        </div>
      </div>
    </>
  );
}
