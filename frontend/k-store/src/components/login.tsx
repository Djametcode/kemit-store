import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { loginHandler } from "../handler/loginHandler";
import React, { useState } from "react";

export const LoginComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const date = new Date().getFullYear();

  const data = {
    email: email,
    password: password,
  };

  console.log(data);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginHandler({ email: email, password: password });
      console.log(response);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" font-figtree w-[350px] flex flex-col gap-16">
      <div className=" flex flex-col justify-start gap-2">
        <h1 className=" text-5xl font-extrabold">Kemit Store</h1>
        <p className=" text-sm">Discover amazing product</p>
      </div>
      <div className=" flex flex-col gap-5">
        <div className=" flex items-center gap-3 border rounded-3xl p-2 justify-center">
          <FcGoogle size={25} />
          <p className=" text-sm font-extrabold">Sign In With Google</p>
        </div>
        <div className=" flex justify-center items-center gap-2">
          <hr className=" w-full h-2" />
          <p className=" w-full text-center text-xs text-gray-500 whitespace-nowrap -translate-y-1">
            or SignIn With Email
          </p>
          <hr className=" w-full h-2" />
        </div>
        <div>
          <form className=" flex flex-col gap-5">
            <div className=" flex flex-col gap-2">
              <label className=" text-sm">Email*</label>
              <input
                type="email"
                className=" p-2 pl-6 border rounded-3xl placeholder:text-sm"
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
                className=" p-2 pl-6 border rounded-3xl placeholder:text-sm"
                placeholder="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <div className=" flex justify-between">
              <div className=" flex items-center gap-2">
                <input type="checkbox" name="" id="remember" />
                <label className=" text-sm" htmlFor="remember">
                  Remember Me
                </label>
              </div>
              <div>
                <h1 className=" text-sm text-blue-700">Forgot password</h1>
              </div>
            </div>
            <button
              onClick={loginUser}
              className=" text-sm w-full p-2 bg-blue-700 rounded-3xl text-white"
            >
              Login
            </button>
            <div className=" flex gap-2 text-sm">
              <p>Not registered yet ?</p>
              <Link to={"/signUp"} className=" text-blue-700">
                Create an Account
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
