import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { IUseCatalogPath } from "../../hooks/useCatalogPath";
import { RootState } from "../../store";

type BreadcrumbsProps = {
  catalogPath: IUseCatalogPath;
};

export const Breadcrumbs = ({ catalogPath }: BreadcrumbsProps) => {
  const { currentProduct: product } = useSelector(
    (state: RootState) => state.catalog
  );
  const { pathname } = useLocation();

  return (
    <div className="catalog-page__breadcrumbs">
      <nav style={{ display: "flex" }}>
        <NavLink to={"/"}>Главная</NavLink>
        {catalogPath.breadcrumbs.map((path) => (
          <div key={path.category.id}>
            <span style={{ padding: "0 15px" }}>/</span>
            <NavLink to={path.fullPath}>{path.category.name}</NavLink>
          </div>
        ))}

        {product && (
          <>
            <span style={{ padding: "0 15px" }}>/</span>
            <NavLink key={product.id} to={pathname}>
              {product.title}
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};
