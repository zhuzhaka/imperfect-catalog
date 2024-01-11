import React from "react";
import { IUseCatalogPath } from "../../hooks/useCatalogPath";
import { NavLink, useLocation } from "react-router-dom";
import { useCatalog } from "../../context";

type BreadcrumbsProps = {
  catalogPath: IUseCatalogPath;
};

export const Breadcrumbs = ({ catalogPath }: BreadcrumbsProps) => {
  const { product } = useCatalog();
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
