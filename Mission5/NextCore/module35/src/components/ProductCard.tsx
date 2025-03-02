import { IProduct } from "@/app/page";
import Image from "next/image";
import React from "react";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div
      key={product.id}
      className="bg-white shadow-md rounded-lg overflow-hidden"
    >
      <Image
        width={200}
        height={300}
        src={product.image}
        alt={product.productName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.productName}</h2>
        <h3 className="text-lg text-gray-700">${product.price}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-sm text-gray-500">{product.brand}</p>
      </div>
    </div>
  );
};

export default ProductCard;
