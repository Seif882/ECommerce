import axios from "axios";
import { toast } from "react-toastify";

const baseURL = `https://ecommerce.routemisr.com/api/v1/cart`;

export function addToCart(productId) {
  let token = localStorage.getItem("token");
  axios
    .post(baseURL, { productId }, { headers: { token } })
    .then(() => {
      toast.success("Item Was Successfully Added To Your Cart");
    })
    .catch(() => {
      toast.error("Something Went Wrong! Please Try Again");
    });
}

export function getCart() {
  let token = localStorage.getItem("token");
  axios
    .get(baseURL, { headers: { token } })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}
