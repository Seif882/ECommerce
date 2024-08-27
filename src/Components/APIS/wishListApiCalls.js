import axios from "axios";
import { toast } from "react-toastify";

const baseURL = `https://ecommerce.routemisr.com/api/v1/wishlist`;

export function addToWishList(productId) {
  let token = localStorage.getItem("token");
  axios
    .post(baseURL, { productId }, { headers: { token } })
    .then(() => {
      toast.success("Item Was Successfully Added To Your Wish List");
    })
    .catch(() => {
      toast.error("Something Went Wrong! Please Try Again");
    });
}

export function getWishList() {
  let token = localStorage.getItem("token");
  return axios.get(baseURL, { headers: { token } });
}

export function removeWishListItem(id) {
  let token = localStorage.getItem("token");
  axios
    .delete(`${baseURL}/${id}`, { headers: { token } })
    .then(() =>
      toast.success("Item Was Successfully Removed From Your Wish List")
    )
    .catch(() => {
      toast.error("Something Went Wrong! Please Try Again");
    });
}
