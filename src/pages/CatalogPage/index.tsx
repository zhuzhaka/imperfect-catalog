import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../store";

import "./CatalogPage.scss";

export const CatalogPage = () => {
  const categories = useSelector(
    (state: RootState) => state.catalog.categories
  );

  const rootCategories = categories.filter((item) => !item.parent && item.id);

  return (
    <>
      <h1>Каталог</h1>
      <div className="categories-list__wrapper">
        {rootCategories.map((item) => (
          <Link key={item.id} to={item.slug}>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};
