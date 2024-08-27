import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { payCash, payOnline } from "./APIS/paymentAPICalls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ cartId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let navigator = useNavigate();

  let { mutate: onlineMutate, data: onlineData } = useMutation({
    mutationFn: payOnline,
  });
  let { mutate: cashMutate, data: cashData } = useMutation({
    mutationFn: payCash,
  });
  let [flag, setFlag] = React.useState("");

  function handleSubmit(shippingAddress) {
    if (flag === "online") {
      onlineMutate({ cartId, shippingAddress });
      if (onlineData?.data?.status === "success")
        window.location.href = onlineData?.data?.session?.url;
    }
    if (flag === "cash") {
      cashMutate({ cartId, shippingAddress });
      if (cashData?.data?.status === "success") {
        toast.success(`Your Order Was Successfully Placed!`);
        navigator("/home");
      }
    }
  }
  if (flag === "online" && onlineData?.data?.status === "success")
    window.location.href = onlineData?.data?.session?.url;

  if (flag === "cash" && cashData?.data?.status === "success") {
    toast.success(`Your Order Was Successfully Placed!`);
    navigator("/home");
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        sx={{ mx: "10px" }}
        onClick={() => {
          handleOpen();
          setFlag("online");
        }}
      >
        Pay Online
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={() => {
          handleOpen();
          setFlag("cash");
        }}
      >
        Pay On Delivery
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
            {/* Details */}
            <div className="mb-5">
              <label
                htmlFor="details"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your details
              </label>
              <input
                type="text"
                id="details"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                value={formik.values.details}
                onChange={formik.handleChange}
              />
            </div>

            {/* City */}
            <div className="mb-5">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your City
              </label>

              <input
                type="text"
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
