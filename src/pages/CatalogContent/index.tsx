import React from "react";
import { Navigate, useOutletContext } from "react-router";

import { CatalogOutletContextType } from "../../components/CatalogLayout";
import { ProductList } from "../../components/ProductList";
import { ProductPage } from "../ProductPage";

import "./CatalogContent.scss";

export const CatalogContent = () => {
  const { catalogPath } = useOutletContext<CatalogOutletContextType>();
  console.log("catalog");

  if (!catalogPath.isValid) {
    return <Navigate to={"/catalog"} />;
  }

  return (
    <div className="catalog-page">
      <div className="catalog-page__content">
        {catalogPath.isCategory ? (
          <>
            <div className="catalog-page__filters"></div>
            <div className="catalog-page__products">
              <ProductList />
            </div>
          </>
        ) : (
          <ProductPage slug={catalogPath.slug} />
        )}
      </div>
    </div>
  );
};
