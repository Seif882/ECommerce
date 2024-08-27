import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Brands from "./Components/Brands";
import Cart from "./Components/Cart";
import Categories from "./Components/Categories";
import Products from "./Components/Products";
import WishList from "./Components/WishList";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ItemDetails from "./Components/ItemDetails";
import SubCategory from "./Components/SubCategory";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import ForgetPassword from "./Components/ForgetPassword";
import VerifyCode from "./Components/VerifyCode";
import ResetPassword from "./Components/ResetPassword";
import AllOrders from "./Components/allorders";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands></Brands>
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart></Cart>
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories></Categories>
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <AllOrders></AllOrders>
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products></Products>
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <WishList></WishList>
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login></Login> },
        { path: "/signup", element: <SignUp></SignUp> },
        {
          path: "/itemdetails/:id",
          element: (
            <ProtectedRoute>
              <ItemDetails></ItemDetails>
            </ProtectedRoute>
          ),
        },
        {
          path: "/subcategory/:id/:name",
          element: (
            <ProtectedRoute>
              <SubCategory></SubCategory>
            </ProtectedRoute>
          ),
        },
        {
          path: "/forgetPassword",
          element: <ForgetPassword></ForgetPassword>,
        },
        {
          path: "/verifycode",
          element: <VerifyCode></VerifyCode>,
        },
        {
          path: "/resetpassword",
          element: <ResetPassword></ResetPassword>,
        },
        {
          path: "*",
          element: (
            <ProtectedRoute>
              <NotFound></NotFound>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
