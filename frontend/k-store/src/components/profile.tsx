import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import {
  LuShoppingCart,
  LuBellRing,
  LuMail,
  LuUserCircle,
} from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";

interface IUSER {
  avatar: string;
  username: string;
}

export const ProfileComponent = () => {
  const data = useLoaderData() as IUSER;
  const [user, setUser] = useState<IUSER[]>([data]);
  console.log(user);
  return (
    <div className=" w-[300px] border-r h-full bg-slate-50 flex flex-col relative">
      {user.map((item) => {
        return (
          <div className=" flex justify-start gap-5 h-20 pl-7 items-center font-figtree border-b">
            <div className=" w-[50px] h-[50px]">
              <img
                className=" w-full h-full rounded-full object-cover"
                src={item.avatar}
                alt=""
              />
            </div>
            <div className=" flex items-center text-black">
              <h1>{item.username}</h1>
            </div>
          </div>
        );
      })}
      <div className=" text-black p-7 flex flex-col gap-5 font-figtree">
        <div className=" flex gap-3 items-center">
          <LuUserCircle size={23} />
          <Link to={"/"}>Profile</Link>
        </div>
        <div className=" flex gap-3 items-center">
          <LuShoppingCart size={23} />
          <Link to={"/"}>My Cart</Link>
        </div>
        <div className=" flex gap-3 items-center">
          <LuBellRing size={23} />
          <Link to={"/"}>Notification</Link>
        </div>
        <div className=" flex gap-3 items-center">
          <LuMail size={23} />
          <Link to={"/"}>Message</Link>
        </div>
      </div>
      <div className=" absolute bottom-20">
        <div className=" pl-7 flex text-black gap-2 items-center font-figtree">
          <HiOutlineLogout size={23} />
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );
};
