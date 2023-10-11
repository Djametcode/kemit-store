import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className=" w-full h-full flex">
      <div className=" h-full basis-1/2 flex items-start justify-center pt-20">
        <Outlet />
      </div>
      <div className=" basis-1/2 bg-black"></div>
    </div>
  );
};
