import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { IUseCatalogPath } from "../../hooks/useCatalogPath";
import { RootState } from "../../store";

import "./Breadcrumbs.scss";

type BreadcrumbsProps = {
  catalogPath: IUseCatalogPath;
};

export const Breadcrumbs = ({ catalogPath }: BreadcrumbsProps) => {
  const { currentProduct: product } = useSelector(
    (state: RootState) => state.catalog
  );
  const { pathname } = useLocation();

  const [prevPathname, setPrevPathname] = useState("");
  const [currentPathname, setCurrentPathname] = useState(
    localStorage.getItem("prev-pathname") || ""
  );

  useEffect(() => {
    if (currentPathname !== pathname) {
      setPrevPathname(currentPathname);
      setCurrentPathname(pathname);
      localStorage.setItem("prev-pathname", currentPathname);
    }
  }, [catalogPath]);

  return (
    <nav className="catalog-page__breadcrumbs">
      <ul className="breadcrumbs__list">
        {prevPathname && (
          <li className="breadcrumbs__item breadcrumbs__go-back">
            <NavLink to={prevPathname}>
              <span>Назад</span>
            </NavLink>
          </li>
        )}
        <li className="breadcrumbs__item">
          <NavLink to={"/"}>
            <span>Главная</span>
          </NavLink>
        </li>
        {catalogPath.breadcrumbs.map((path) => (
          <li key={path.category.id} className="breadcrumbs__item">
            <NavLink to={path.fullPath}>
              <span>{path.category.name}</span>
            </NavLink>
          </li>
        ))}

        {product && (
          <li className="breadcrumbs__item">
            <NavLink key={product.id} to={pathname}>
              {product.title}
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
