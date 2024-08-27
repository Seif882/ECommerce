import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  let [displayedProducts, setDisplayedProducts] = useState([]);
  let x = [];

  //? Api Call Function ?//
  function productsAPICall() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  //? Server State Management ?//
  let { data } = useQuery({ queryKey: ["items"], queryFn: productsAPICall });

  //? Function Used To Handle The Search ?//
  function handleInput(e) {
    if (e.target.value !== "") {
      data.data.data.forEach((element) => {
        if (element.title.includes(e.target.value)) x.push(element);
      });
      setDisplayedProducts(x);
    } else setDisplayedProducts([]);
  }

  return (
    <div className="mt-28">
      <input
        type="text"
        className="shadow-lg appearance-none rounded w-3/4 text-lg py-2 px-3 border-2 border-gray-500 text-gray-700 focus:outline-green-700 focus:shadow-outline "
        placeholder="Search..."
        onChange={handleInput}
      />

      <div className="container flex flex-wrap justify-center mt-10">
        {displayedProducts.map((ele) => (
          <Item key={ele._id} props={["home", ele]}></Item>
        ))}
      </div>
    </div>
  );
}
