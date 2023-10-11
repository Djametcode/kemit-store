import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./layout/authLayout";
import { LoginComponent } from "./components/login";
import { RegistComponent } from "./components/register";
import { LandingLayout } from "./layout/landingLayout";
import { LandingComponent } from "./components/landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
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
    element: <LandingLayout />,
    children: [
      {
        path: "home",
        element: <LandingComponent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
