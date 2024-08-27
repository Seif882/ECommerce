import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal";

export default function Cart() {
  let navigator = useNavigate();
  //? Variables Used To Get The User's Cart ?//
  let { token } = useSelector((data) => data.userData);
  let localToken = localStorage.getItem("token");

  //? Variable Used To Store The Cart Items ?//
  let [cart, setCart] = useState([]);

  //? Functions Used To Get The User's Cart ?//
  function getUserCart() {
    if (localToken) {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localToken },
      });
    } else if (token) {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      });
    }
  }

  //? Server State Management ?//
  let { data, isLoading } = useQuery({
    queryKey: ["userCart"],
    queryFn: getUserCart,
    refetchOnWindowFocus: false,
  });

  //? Functions Used To Edit The Quantity of Cart Items ?//
  function increaseQuantity(id, num, max) {
    if (num === max) toast.error(`You Can't Add Anymore Of That Item`);
    if (localToken) {
      axios
        .put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          { count: num + 1 },
          {
            headers: { token: localToken },
          }
        )
        .then(() => {
          toast.success(`Item Was Successfully Added To Your Cart`);
        })
        .catch(() => toast.error(`Something Went Wrong! Please Try Again`));
    } else if (token) {
      axios
        .put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          { count: num + 1 },
          {
            headers: { token },
          }
        )
        .then(() => {
          toast.success(`Item Was Successfully Added To Your Cart`);
        })
        .catch(() => toast.error(`Something Went Wrong! Please Try Again`));
    }
  }

  function decreaseQuantity(id, num) {
    if (num === 0) removeItem(id);

    if (localToken) {
      axios
        .put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          { count: num - 1 },
          {
            headers: { token: localToken },
          }
        )
        .then(() => {
          toast.success(`Item Was Successfully Removed From Your Cart`);
        })
        .catch(() => toast.error(`Something Went Wrong! Please Try Again`));
    } else if (token) {
      axios
        .put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          { count: num - 1 },
          {
            headers: { token },
          }
        )
        .then(() => {
          toast.success(`Item Was Successfully Removed From Your Cart`);
        })
        .catch(() => toast.error(`Something Went Wrong! Please Try Again`));
    }
  }

  //? Remove Item Function ?//
  function removeItem(id) {
    if (localToken) {
      axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
          headers: { token: localToken },
        })
        .then((data) => {
          setCart(data?.data);
          toast.success("Item Was Successfully Removed From Your Cart");
        })
        .catch(toast.error(`Something Went Wrong! Please Try Again`));
    } else if (token) {
      axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
          headers: { token },
        })
        .then((data) => {
          setCart(data?.data);
          toast.success("Item Was Successfully Removed From Your Cart");
        })
        .catch(toast.error(`Something Went Wrong! Please Try Again`));
    }
  }

  function clearCart() {
    if (localToken) {
      axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
          headers: { token: localToken },
        })
        .then(() => {
          toast.success(`Your Cart Was Successfully Cleared`);
          navigator("/home");
        })
        .catch(() => {
          toast.error(`Something Went Wrong! Please Try Again`);
        });
    } else if (token) {
      axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
          headers: { token },
        })
        .then(() => {
          toast.success(`Your Cart Was Successfully Cleared`);
        })
        .catch(() => {
          toast.error(`Something Went Wrong! Please Try Again`);
        });
    }
  }

  //? Hook Used To Update The Cart UI After Removing An Item ?//
  useEffect(() => {
    setCart(data?.data);
  }, [data]);

  //? Hook Used To Prevent User From Adding More Than The Stock Of The Product ?//
  useEffect(() => {
    cart?.data?.products?.forEach((element) => {
      if (element?.count >= element?.product?.quantity) {
        decreaseQuantity(element?.product?._id, element?.product?.quantity + 1);
      }
    });
  }, [cart]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //? Show Loading If The API Is Still Loading ?//
  if (isLoading) return <Loading></Loading>;

  if (cart?.data?.products?.length === 0) {
    return (
      <>
        <div className="mt-36">
          <p className="font-semibold text-3xl text-green-700">
            You Don't Have Any Items In Your Cart Yet!
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg mt-36">
        <div className="flex justify-between my-7 ">
          <p className="text-2xl text-green-700 font-semibold flex-wrap">
            Number Of Items In Your Cart: {cart?.numOfCartItems}
          </p>

          <p className="text-2xl text-green-700 font-semibold ">
            Your Cart's Total Price: {cart?.data?.totalCartPrice} EGP
          </p>
        </div>

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
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {cart?.data?.products?.map((element) => (
              <tr
                key={element?.product?._id}
                className="bg-white border-b hover:bg-gray-50 "
              >
                {/* Item Image */}
                <td className="p-4">
                  <img
                    src={element?.product?.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                  />
                </td>

                {/* Item Name */}
                <td className="px-6 py-4 font-semibold text-gray-900 text-lg">
                  {element?.product?.title.split(" ").slice(0, 5).join(" ")}
                </td>

                {/* Item Quantity */}
                <td className="px-6 py-4">
                  <div className="flex items-center text-lg">
                    {/* Decrease Button */}

                    <button
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                      onClick={() => {
                        decreaseQuantity(element.product._id, element?.count);
                      }}
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>

                    {/* Item Quantity */}
                    <div>
                      <span>
                        {element.count >= element?.product?.quantity
                          ? element?.product?.quantity
                          : element.count}
                      </span>
                    </div>

                    {/* Increase Button */}
                    <button
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                      onClick={() => {
                        increaseQuantity(
                          element.product._id,
                          element?.count,
                          element?.product?.quantity
                        );
                      }}
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
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
                      removeItem(element?.product?._id);
                    }}
                    className="font-semibold text-red-600 text-lg hover:underline"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex w-1/2 justify-between m-auto mt-10">
          <button
            className="bg-red-600 rounded text-white px-4 py-2 hover:bg-red-800 transition "
            onClick={clearCart}
          >
            Clear Cart
          </button>

          <PaymentModal cartId={data?.data?.cartId} />
        </div>
      </div>
    </>
  );
}
