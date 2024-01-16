import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ProductAPI } from "../../http";
import { IProduct } from "../../types";

export const ProductHistory = () => {
  const [products, setProducts] = useState<IProduct[]>(null);
  const laminatedChipboards = useSelector(
    (state: RootState) => state.catalog.laminatedChipboards
  );

  const history: string[] = JSON.parse(localStorage.getItem("product_history"));

  useEffect(() => {
    if (history) {
      (async function fetchData() {
        const data = await ProductAPI.findAll({ include: history.join(",") });
        setProducts(data);
      })();
    }
  }, []);

  if (!products) {
    return <></>;
  }

  return (
    <div className="product-history__wrapper">
      <h3>Ранее вы смотрели</h3>
      <section>
        {products.map((item) => (
          <div key={item.id}>
            <span>{item.title}</span>
            <span>
              {
                laminatedChipboards.find(
                  (ldps) => ldps.id === item.um_laminated_chipboard_id
                ).name
              }
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};
