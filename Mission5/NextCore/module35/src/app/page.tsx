import ProductCard from "@/components/ProductCard";
import React from "react";
export interface IProduct {
  id: number;
  productName: string;
  price: number;
  category: string;
  image: string;
  brand: string;
}
const HomePage = async () => {
  const res = await fetch("http://localhost:3001/products", {
    next: {
      revalidate: 1,
    },
  });
  const data = await res.json();
  // console.log(data);
  return (
    <div className="container mx-auto">
      <h1 className="text-center mt-5 text-3xl font-bold">Home Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.slice(0, 3).map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
