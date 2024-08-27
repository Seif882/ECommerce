import axios from "axios";
import React, { useEffect } from "react";
import Item from "./Item";
import Loading from "./Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img_1 from "../assets/img_1.jpg";
import img_2 from "../assets/img_2.jpg";
import babyseat from "../assets/babyseat.jpg";
import bag from "../assets/bag.jpg";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function Home() {
  //? Show The User's Name ?//
  let { name } = useSelector((data) => data.userData);
  let temp = "";
  if (localStorage.getItem("name")) {
    temp = localStorage.getItem("name").split("");
  } else if (name) {
    temp = name.split("");
  }
  temp[0] = temp[0]?.toUpperCase();
  let userName = temp.join("");

  //? Carousel Settings ?//
  const categoriesCarouselSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    customPaging: () => (
      <div className="w-4 h-2 bg-gray-500 rounded hover:bg-gray-600"></div>
    ),
  };

  const imagesCarouselSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: () => (
      <div className="w-4 h-2 bg-gray-500 rounded hover:bg-gray-600"></div>
    ),
  };

  //? API Call Functions ?//
  function homeItemsAPICall() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  function homeCategoriesAPICall() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  //? Server State Management ?//
  let items = useQuery({ queryKey: ["items"], queryFn: homeItemsAPICall });

  let categories = useQuery({
    queryKey: ["categories"],
    queryFn: homeCategoriesAPICall,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //? Show Loading If The API Is Still Loading ?//
  if (items.isLoading && categories.isLoading) return <Loading></Loading>;

  return (
    <>
      <div className="flex mt-28 items-center w-full flex-col flex-wrap">
        <h1 className="text-green-700 text-5xl font-bold mb-8">
          Welcome Back {userName}!
        </h1>

        <div className="w-1/2 hidden lg:flex ">
          <div className="py-1 w-1/2">
            <Slider {...imagesCarouselSettings}>
              <div className="my-10 w-full h-80 overflow-hidden">
                <img src={babyseat} className="w-full h-80 object-contain" />
              </div>

              <div className="my-10 w-full h-80">
                <img src={bag} className="w-full h-80 object-contain" />
              </div>
            </Slider>
          </div>

          <div className="w-1/2 flex flex-col">
            <img src={img_1} className="w-full" />
            <img src={img_2} className="w-full" />
          </div>
        </div>

        <div className="w-full hidden lg:block">
          <Slider {...categoriesCarouselSettings}>
            {categories?.data?.data?.data?.map((cat) => (
              <div key={cat._id} className="mt-10 overflow-hidden">
                <div className="w-full h-40 overflow-hidden">
                  <img src={cat.image} className="w-full object-contain" />
                </div>
                <p className="text-xl font-semibold my-1">{cat.name}</p>
              </div>
            ))}
          </Slider>
        </div>

        <div className="container flex flex-wrap justify-center mt-10">
          {items?.data?.data?.data?.map((ele) => (
            <Item key={ele._id} props={["home", ele]}></Item>
          ))}
        </div>
      </div>
    </>
  );
}
