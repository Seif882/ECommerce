import axios from "axios";

export function payOnline({ cartId, shippingAddress }) {
  let token = localStorage.getItem("token");

  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
    { shippingAddress },
    { headers: { token } }
  );
}

export function payCash({ cartId, shippingAddress }) {
  let token = localStorage.getItem("token");

  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    { shippingAddress },
    { headers: { token } }
  );
}
