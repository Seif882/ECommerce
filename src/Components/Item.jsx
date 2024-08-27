import { faClose, faHeartBroken, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart } from "./APIS/cartAPICalls";
import {
  addToWishList,
  getWishList,
  removeWishListItem,
} from "./APIS/wishListApiCalls";

export default function Item(props) {
  let itemData = props?.props[1];

  //? Item Component For The Home Page Or The Details Page ?//
  if (props.props[0] === "home" || props.props[0] === "related") {
    let { mutate: mutateCart } = useMutation({ mutationFn: addToCart });
    //? Logic To Add And Remove Items From The User's With List ?//
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

    return (
      <>
        <div className="lg:w-1/4 md:w-1/2 p-2">
          <div className="flex flex-col flex-wrap gap-y-2 p-4 overflow-hidden border lg:border-transparent hover:border-green-500 lg:shadow-none shadow-2xl hover:shadow-2xl transition duration-500 cursor-pointer rounded group">
            <Link to={`/itemdetails/${itemData._id}`}>
              {/* Item Image */}
              <img src={itemData.imageCover} className="w-full" />

              {/* Item Category */}
              <p className="text-green-500 font-semibold text-left text-xl">
                {itemData.category.name}
              </p>

              {/* Item Name */}
              <p className="font-semibold text-left text-xl">
                {itemData.title.split(" ").slice(0, 2).join(" ")}
              </p>

              {/* Item Price And Rating */}
              <div className="flex justify-between w-full text-xl">
                {/* Item Price */}
                <p>Price: {itemData.price} EGP</p>

                {/* Item Rating */}
                <p>
                  <FontAwesomeIcon
                    icon={fas.faStar}
                    className="text-yellow-300 "
                  />
                  {itemData.ratingsAverage} ({itemData.ratingsQuantity})
                </p>
              </div>
            </Link>
            {/* Item Buttons */}
            <div className="flex justify-between w-full lg:translate-y-[100px] group-hover:translate-y-0 transition duration-300 flex-wrap">
              <button
                className="bg-green-700 rounded text-white px-4 py-2 mb-1 hover:bg-green-600 transition w-full"
                onClick={() => {
                  mutateCart(itemData._id);
                }}
              >
                + Add to cart
              </button>

              <button
                className={`${
                  added
                    ? `bg-white  text-blue-600 hover:bg-white `
                    : `bg-blue-700  text-white px-1 hover:bg-blue-600`
                } rounded transition w-full px-4 py-2`}
                onClick={() => {
                  wishList(itemData._id);
                }}
              >
                <FontAwesomeIcon
                  icon={added ? fas.faHeartBroken : fas.faHeart}
                />
                {added ? `Remove from ` : `Add to `} wishlist
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  //? Item Component For The Categories ?//
  if (props.props[0] === "categories") {
    return (
      <>
        <div className="w-full lg:w-1/3 md:w-1/2 p-4 rounded">
          <Link to={`/subcategory/${itemData._id}/${itemData.name}`}>
            <div className="rounded border-4 lg:border-grey-500 hover:border-green-500 hover:border-opacity-50 lg:shadow-none  hover:shadow-2xl transition duration-500 cursor-pointer overflow-hidden">
              <img
                src={itemData.image}
                className="w-full rounded-t h-72 object-cover scale-105"
              />
              <p className="py-8 text-green-700 text-4xl font-semibold">
                {itemData.name}
              </p>
            </div>
          </Link>
        </div>
      </>
    );
  }

  //? Item Component For The Brands ?//
  if (props.props[0] === "brands") {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <div
          onClick={handleOpen}
          className="w-full lg:w-1/4 md:w-1/2 p-4 rounded border-0"
        >
          <div className="rounded border-4 lg:border-grey-500 hover:border-green-500 hover:border-opacity-50 lg:shadow-none hover:shadow-2xl transition duration-500">
            <img src={itemData.image} className="w-full" />
            <p className="py-8 text-green-700 text-2xl font-semibold">
              {itemData.name}
            </p>
          </div>
        </div>
        {/* Modal */}
        <Modal open={open} onClose={handleClose}>
          <div className="rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white pt-10 pb-14 ">
            <FontAwesomeIcon
              icon={faClose}
              className="absolute top-2 right-5 text-2xl cursor-pointer text-gray-500"
              onClick={handleClose}
            />
            <div className="flex justify-between items-center w-full border-y border-gray-500 px-4">
              <div className="flex flex-col gap-3">
                <p className="text-green-700 text-3xl font-semibold">
                  {itemData.name}
                </p>

                <p className="text-xl">{itemData.slug}</p>
              </div>
              <img src={itemData.image} className="w-1/2" />
            </div>

            <button
              className="bg-gray-500 rounded border-gray-500 px-2 py-1 text-white text-xl absolute bottom-2 right-5"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Modal>
      </>
    );
  }
  return <div>Item</div>;
}
