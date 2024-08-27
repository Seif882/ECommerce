import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Item from "./Item";
import Loading from "./Loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart, getCart } from "./APIS/cartAPICalls";
import { toast } from "react-toastify";
import {
  addToWishList,
  getWishList,
  removeWishListItem,
} from "./APIS/wishListApiCalls";

export default function ItemDetails() {
  //? Carousel Settings ?//
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: () => (
      <div className="w-4 h-2 bg-gray-500 rounded hover:bg-gray-600"></div>
    ),
  };

  //? The Id Used To Identify The Product ?//
  let { id } = useParams();

  //? Variables Used To Store The Data Received From The API ?//
  let [itemData, setItemData] = useState([]);
  let [categoryData, setCategoryData] = useState([]);

  //? Variables Used To Render The Loading Component ?//
  let [itemAPIStatus, setItemAPIStatus] = useState(true);
  let [categoryAPIStatus, setCategoryAPIStatus] = useState(true);

  //? Function Used To Get The Specific Item's Details ?//
  async function itemDetailsAPICall() {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setItemData(res?.data?.data);
    categoryAPICall(res?.data?.data.category?._id);
    setItemAPIStatus(false);
  }

  //? Function Used To Get The Specific Item's Related Items ?//
  async function categoryAPICall(id) {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
    );
    setCategoryData(res?.data?.data);
    setCategoryAPIStatus(false);
  }

  //? Variable Used For Adding Items To Cart ?//
  let { mutate } = useMutation({ mutationFn: addToCart });

  //? Hook Used To Rerender The Component After Clicking On A Related Item ?//
  useEffect(() => {
    window.scrollTo(0, 0);
    setItemAPIStatus(true);
    setCategoryAPIStatus(true);
    itemDetailsAPICall();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    itemDetailsAPICall();
  }, []);

  let { mutate: mutateWishList } = useMutation({ mutationFn: addToWishList });
  let added = false;

  let userWithList = useQuery({
    queryKey: ["userWishList"],
    queryFn: getWishList,
    refetchInterval: 500,
  });

  userWithList?.data?.data?.data?.forEach((element) => {
    if (element._id === itemData._id) added = true;
  });

  function wishList(id) {
    if (added) removeWishListItem(id);
    if (!added) mutateWishList(id);
  }

  //? Show Loading If The API Is Still Loading ?//
  if (itemAPIStatus || categoryAPIStatus) return <Loading></Loading>;

  return (
    <>
      <div className="flex mt-36 flex-wrap gap-4 lg:gap-0">
        <div className="w-full lg:w-1/4">
          <Slider {...settings}>
            {itemData?.images?.map((img) => (
              <div key={img}>
                <img src={img} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-full flex flex-col gap-5 justify-center items-center lg:w-3/4">
          {/* Item Title */}
          <p className="text-4xl">{itemData.title}</p>

          {/* Item Description */}
          <p className="text-2xl">{itemData.description}</p>

          <div className="flex justify-between w-full text-xl">
            {/* Item Price */}
            <p>Price: {itemData.price} EGP</p>

            {/* Item Rating */}
            <p>
              <FontAwesomeIcon icon={fas.faStar} className="text-yellow-300 " />
              {itemData.ratingsAverage} ({itemData.ratingsQuantity})
            </p>
          </div>

          {/* Item Buttons */}
          <button
            className="bg-green-700 rounded text-xl text-white py-1 hover:bg-green-600 transition w-2/3"
            onClick={() => {
              mutate(itemData._id);
            }}
          >
            + Add to cart
          </button>

          <button
            className={`${
              added
                ? `bg-white text-blue-600 hover:bg-white `
                : `bg-blue-700 text-white px-1 hover:bg-blue-600`
            } rounded text-xl  py-1  transition w-2/3`}
            onClick={() => {
              wishList(itemData._id);
            }}
          >
            <FontAwesomeIcon icon={added ? fas.faHeartBroken : fas.faHeart} />
            {added ? `Remove from ` : `Add to `} wishlist
          </button>
        </div>
      </div>

      {/* Related Items */}
      <div className="mt-10">
        <h2 className="text-3xl font-semibold text-green-700 text-left">
          Related Items:
        </h2>
        <div className="container flex flex-wrap justify-center">
          {categoryData.map((item) => (
            <Item key={item._id} props={["related", item]}></Item>
          ))}
        </div>
      </div>
    </>
  );
}
