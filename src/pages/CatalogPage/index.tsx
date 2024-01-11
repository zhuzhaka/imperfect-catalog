import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router";

import { ICategory } from "../../types";
import { ProductList } from "../../components/ProductList";
import { ProductPage } from "../ProductPage";
import { useCatalog } from "../../context";

import "./CatalogPage.scss";
import { useCatalogPath } from "../../hooks/useCatalogPath";
import { Loading } from "../../components/Loading";
import { CatalogOutletContextType } from "../../components/CatalogLayout";

export const CatalogPage = () => {
  const { catalogPath } = useOutletContext<CatalogOutletContextType>();
  console.log("catalog");

  return (
    <>
      {catalogPath.isValid ? (
        <CataloPageComponent
          slug={catalogPath.slug}
          isCategory={catalogPath.isCategory}
        />
      ) : (
        <Navigate to={"/catalog"} />
      )}
    </>
  );
};

interface IComponentProps {
  slug: string;
  isCategory: boolean;
}

function CataloPageComponent({ slug, isCategory }: IComponentProps) {
  console.log("component catalog");
  return (
    <>
      {isCategory ? (
        <div className="catalog-page">
          <div className="catalog-page__content">
            <div className="catalog-page__filters"></div>
            <div className="catalog-page__products">
              <ProductList />
            </div>
          </div>
        </div>
      ) : (
        <ProductPage slug={slug} />
      )}
    </>
  );
}
