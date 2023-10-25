import { useEffect, useState } from "react";
import { IPRODUCT } from "./allProduct";
import { getProductById } from "../handler/getSingleProduct";
import { useParams } from "react-router-dom";

export const ProductDetailComponent = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<IPRODUCT[]>([]);
  console.log(product);

  const getSingleProduct = async (productId: string | undefined) => {
    try {
      const response = await getProductById(productId);
      console.log(response);
      setProduct([response]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct(productId);
  }, [productId]);
  return (
    <div className=" ml-[350px] flex justify-center">
      {product.map((item) => {
        return (
          <div>
            <h1 className=" text-black">{item.productName}</h1>
            <div>
              <img src={item.image[0]} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
