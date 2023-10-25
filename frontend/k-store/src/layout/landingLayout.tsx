import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export const LandingLayout = () => {
  return (
    <div className=" w-full h-full font-figtree flex flex-col">
      <Outlet />
    </div>
  );
};
