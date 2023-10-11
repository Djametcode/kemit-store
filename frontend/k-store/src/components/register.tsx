import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { signUpHandler } from "../handler/signUpHandler";

export const RegistComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const date = new Date().getFullYear();

  const registAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUpHandler({
        username: username,
        email: email,
        password: password,
      });
      console.log(response);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" font-figtree w-[350px] flex flex-col gap-10">
      <div className=" flex flex-col justify-start gap-2">
        <h1 className=" text-5xl font-extrabold">SignUp</h1>
        <p className=" text-sm">Discover amazing product</p>
      </div>
      <div className=" flex flex-col gap-5">
        <div className=" flex items-center gap-3 border rounded-3xl p-2 justify-center">
          <FcGoogle size={25} />
          <p className=" text-sm font-extrabold">SignUp With Google</p>
        </div>
        <div className=" flex justify-center items-center gap-2">
          <hr className=" w-full h-2" />
          <p className=" w-full text-xs text-gray-500 whitespace-nowrap -translate-y-1">
            or SignUp With Email
          </p>
          <hr className=" w-full h-2" />
        </div>
        <div>
          <form className=" flex flex-col gap-5">
            <div className=" flex flex-col gap-2">
              <label className=" text-sm">Username*</label>
              <input
                type="text"
                className=" text-sm p-2 pl-6 border rounded-3xl placeholder:text-sm"
                placeholder="Sempakuda"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label className=" text-sm">Email*</label>
              <input
                type="email"
                className=" text-sm p-2 border rounded-3xl placeholder:text-sm pl-6"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label className=" text-sm">Password*</label>
              <input
                type="password"
                className=" text-sm p-2 border rounded-3xl placeholder:text-sm pl-6"
                placeholder="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <button
              onClick={registAccount}
              className=" text-sm w-full p-2 bg-blue-700 rounded-3xl text-white"
            >
              Create Account
            </button>
            <div className=" flex gap-2 text-sm">
              <p>Already Have Account?</p>
              <Link to={"/login"} className=" text-blue-700">
                Login Page
              </Link>
            </div>
          </form>
          <div className=" absolute bottom-14">
            <p className=" text-sm text-gray-500">
              &copy; {date} djamet coder all right reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
