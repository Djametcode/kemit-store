import { useEffect, useState } from "react";
import { getAllProductHandler } from "../handler/getAllProduct";
import { LuShoppingCart } from "react-icons/lu";

interface IProduct {
  image: string;
  price: number;
  productName: string;
  rating: [];
  stock: number;
  variant: [];
}

export const LandingComponent = () => {
  const [product, setProduct] = useState([]);
  const getAllProduct = async () => {
    try {
      const response = await getAllProductHandler();
      console.log(response);
      setProduct(response.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <div>
      <div className=" pt-16 pl-16">
        <h1 className=" text-xl">Featured Product :</h1>
      </div>
      <div className=" flex p-16 gap-8">
        {product.map((item: IProduct) => {
          return (
            <div className=" w-[400px] h-[400px] relative shadow-lg rounded-3xl">
              <img
                className="w-full h-full rounded-3xl object-cover"
                src={item.image}
                alt=""
              />
              <div className=" absolute bottom-4 left-5 font-figtree font-extrabold text-xl text-white">
                {/* <p className=" absolute text-xl bottom-5 left-5 font-extrabold font-figtree">
              {item.price.toLocaleString("ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p> */}
                <p>{item.productName}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" pt-16 pl-16 font-figtree text-xl">
        <h1>For You :</h1>
      </div>
      <div className=" pl-16 pt-16 flex gap-7">
        {product.map((item: IProduct) => {
          return (
            <div className=" w-[300px] h-[350px] p-6 bg-slate-100">
              <img
                className=" w-full h-[250px] object-cover"
                src={item.image}
                alt=""
              />
              <div className=" pt-3 flex">
                <div className=" flex flex-col gap-2 basis-1/2">
                  <p className=" text-sm">{item.productName}</p>
                  <p className=" text-sm">
                    {item.price.toLocaleString("ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
                <div className=" basis-1/2 flex justify-center items-center">
                  <LuShoppingCart size={25} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
