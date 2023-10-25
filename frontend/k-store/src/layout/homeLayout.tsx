import { Outlet } from "react-router-dom";
import { NavbarComponent } from "../components/navbar";
import { ProfileComponent } from "../components/profile";

export const HomeLayout = () => {
  return (
    <div className=" text-white w-full h-full relative">
      <div className=" fixed top-0 w-full text-black">
        <NavbarComponent />
      </div>
      <div className=" fixed w-[350px] h-full top-[58px]">
        <ProfileComponent />
      </div>
      <div className=" w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};
