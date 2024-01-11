import React, { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard";
import { ProductAPI } from "../../http";
import { IProduct } from "../../types";
import { Loading } from "../Loading";

import "./ProductList.scss";

export const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(products);

  useEffect(() => {
    if (isLoading) {
      (async function fetchProducts() {
        try {
          const data = await ProductAPI.findAll();

          setProducts(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="product-list__wrapper">
          {products && products.length ? (
            products.map((item) => <ProductCard key={item.id} product={item} />)
          ) : (
            <h2>Ничего не найдено</h2>
          )}
        </div>
      )}
    </>
  );
};
