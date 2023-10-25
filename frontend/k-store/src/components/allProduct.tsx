import { useEffect, useState } from "react";
import { getAllProductHandler } from "../handler/getAllProduct";
import { Link } from "react-router-dom";

export interface IPRODUCT {
  image: string[];
  productName: string;
  price: number;
  _id: string;
}

export const ProductComponent = () => {
  const [product, setProduct] = useState<IPRODUCT[]>([]);
  const getAllProduct = async () => {
    try {
      const response = await getAllProductHandler();
      console.log(response);
      setProduct(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <div className=" ml-[350px] basis-3/4 text-black m-7 font-figtree gap-10 justify-items-center grid grid-cols-4">
      {product.map((item) => {
        return (
          <Link
            to={`/landing/detail/${item._id}`}
            className=" flex flex-col gap-3 border rounded-3xl items-center justify-center"
          >
            <div className=" w-[250px] h-[225px] overflow-scroll">
              <img
                className=" w-full h-full object-cover rounded-3xl rounded-br-none rounded-bl-none"
                src={item.image[0]}
                alt=""
              />
            </div>
            <div className=" p-3">
              <p className=" text-sm">
                {item.price.toLocaleString("ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
              <h1 className=" text-xs">{item.productName}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
