import { GrSearch } from "react-icons/gr";
import {
  LuShoppingCart,
  LuBellRing,
  LuMail,
  LuUserCircle,
} from "react-icons/lu";
import { Link } from "react-router-dom";

export const NavbarComponent = () => {
  return (
    <div className=" flex gap-5 w-full p-3 border items-center bg-slate-100">
      <div className=" w-[150px]">
        <h1 className=" pl-6 text-2xl">K-Store</h1>
      </div>
      <div className=" flex gap-7 w-[450px] items-center h-full">
        <Link className=" underline underline-offset-4" to={"/"}>
          Home
        </Link>
        <Link to={"/"}>Gadget</Link>
        <Link to={"/"}>Digital Stuff</Link>
        <Link to={"/"}>Other</Link>
      </div>
      <div className=" absolute right-7">
        <div className=" w-[700px] h-12 relative">
          <input
            className=" w-full h-full border rounded-3xl pl-6 placeholder:text-sm"
            type="text"
            placeholder="type something"
          />
          <span className=" absolute right-0">
            <div className=" flex gap-3 pl-6 pr-6 text-white font-figtree rounded-3xl bg-blue-500 items-center h-10 m-1">
              <div className=" text-white">
                <GrSearch size={20} />
              </div>
              <p className=" text-sm">Cari Produk</p>
            </div>
          </span>
        </div>
      </div>
      {/* <div className=" absolute right-5">
        <div className=" flex gap-5 items-center">
          <div>
            <LuShoppingCart size={23} />
          </div>
          <div>
            <LuBellRing size={23} />
          </div>
          <div>
            <LuMail size={23} />
          </div>
          <div>
            <hr className=" w-[30px] rotate-90" />
          </div>
          <div>
            <LuUserCircle size={30} />
          </div>
        </div>
      </div> */}
    </div>
  );
};
