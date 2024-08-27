import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Item from "./Item";

export default function SubCategory() {
  let { id, name } = useParams();
  let [subCategories, setSubCategories] = useState([]);
  let [apiStatus, setAPIStatus] = useState(true);
  let [displayedProducts, setDisplayedProducts] = useState([]);
  let x = [];

  async function subCategoriesApiCall() {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    setSubCategories(res?.data?.data);

    let productsRes = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );

    productsRes?.data?.data.forEach((element) => {
      if (element?.category?.name === name) x.push(element);
    });
    setDisplayedProducts(x);

    setAPIStatus(false);
  }

  useEffect(() => {
    subCategoriesApiCall();
    window.scrollTo(0, 0);
  }, []);

  if (apiStatus) return <Loading></Loading>;

  if (subCategories.length > 2) {
    return (
      <>
        <div className="flex flex-col mt-36">
          <h2 className="text-4xl text-green-700 font-semibold">
            {name}'s subcategories
          </h2>

          <div className="flex w-full flex-wrap justify-center">
            {subCategories.map((sub) => (
              <div key={sub._id} className="p-4 w-full lg:w-1/3">
                <div
                  key={sub._id}
                  className="border border-gray-500 rounded text-2xl hover:shadow-xl"
                >
                  <p>{sub.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-4xl text-green-700 font-semibold mt-10">
          {name}'s products
        </h2>
        <div className="container flex flex-wrap justify-center mt-10">
          {displayedProducts.map((ele) => (
            <Item key={ele._id} props={["home", ele]}></Item>
          ))}
        </div>
      </>
    );
  }

  if (subCategories.length > 0 && subCategories.length < 3) {
    return (
      <>
        <div className="flex flex-col mt-36">
          <h2 className="text-4xl text-green-700 font-semibold">
            {name}'s subcategories
          </h2>
          <div className="flex w-full flex-wrap">
            {subCategories.map((sub) => (
              <div key={sub._id} className="p-4 w-full lg:w-1/2">
                <div
                  key={sub._id}
                  className="border border-gray-500 rounded text-2xl hover:shadow-xl"
                >
                  <p>{sub.name}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-4xl text-green-700 font-semibold mt-10">
            {name}'s products
          </h2>
          <div className="container flex flex-wrap justify-center mt-10">
            {displayedProducts.map((ele) => (
              <Item key={ele._id} props={["home", ele]}></Item>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col mt-28">
        <h2 className="text-4xl text-green-700 font-semibold">
          {name}'s subcategories
        </h2>

        <p className="text-3xl">This category has no subcategories</p>

        <h2 className="text-4xl text-green-700 font-semibold mt-10">
          {name}'s products
        </h2>
        <div className="container flex flex-wrap justify-center mt-10">
          {displayedProducts.map((ele) => (
            <Item key={ele._id} props={["home", ele]}></Item>
          ))}
        </div>
      </div>
    </>
  );
}
