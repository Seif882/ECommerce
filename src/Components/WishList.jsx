import React, { useEffect, useState } from "react";
import { getWishList, removeWishListItem } from "./APIS/wishListApiCalls";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { addToCart } from "./APIS/cartAPICalls";

export default function WishList() {
  let { data, isLoading } = useQuery({
    queryKey: ["userWishList"],
    queryFn: getWishList,
    refetchInterval: 500,
  });
  let [wishList, setWishList] = useState([]);

  useEffect(() => {
    setWishList(data?.data);
  }, [data]);

  if (isLoading) return <Loading></Loading>;

  return (
    <>
      <div className="mt-36">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xl text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>

              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                remove
              </th>
              <th scope="col" className="px-6 py-3">
                Add To Cart
              </th>
            </tr>
          </thead>

          <tbody>
            {wishList?.data?.map((element) => (
              <tr
                key={element?._id}
                className="bg-white border-b hover:bg-gray-50 "
              >
                {/* Item Image */}
                <td className="p-4">
                  <img
                    src={element?.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                  />
                </td>

                {/* Item Name */}
                <td className="px-6 py-4 font-semibold text-gray-900 text-lg">
                  {element?.title.split(" ").slice(0, 5).join(" ")}
                </td>

                {/* Item Price */}
                <td className="px-6 py-4 font-semibold text-gray-900 text-lg">
                  {element?.price} EGP
                </td>

                {/* Remove Item */}
                <td className="px-6 py-4">
                  <a
                    href="#"
                    onClick={() => {
                      removeWishListItem(element?._id);
                    }}
                    className="font-semibold text-red-600 text-lg hover:underline"
                  >
                    Remove
                  </a>
                </td>
                {/* Add Item */}
                <td className="px-6 py-4">
                  <a
                    href="#"
                    onClick={() => {
                      addToCart(element?._id);
                    }}
                    className="font-semibold text-green-700 text-lg hover:underline"
                  >
                    Add To Cart
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
