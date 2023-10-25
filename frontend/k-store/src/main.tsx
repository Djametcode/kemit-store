import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router-dom";
import { AuthLayout } from "./layout/authLayout";
import { LoginComponent } from "./components/login";
import { RegistComponent } from "./components/register";
import { ProductComponent } from "./components/allProduct";
import { HomeLayout } from "./layout/homeLayout";
import { getCurrentUser } from "./handler/getCurrentUser";
import { ProductDetailComponent } from "./components/productDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <LoginComponent />,
      },
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "signUp",
        element: <RegistComponent />,
      },
    ],
  },
  {
    path: "/landing",
    loader: () => getCurrentUser(),
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: (
          <div className=" w-full h-full mt-14">
            <ProductComponent />
          </div>
        ),
      },
      {
        path: "detail/:productId",
        element: (
          <div className=" w-full h-full mt-14">
            <ProductDetailComponent />
          </div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
