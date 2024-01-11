import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useCatalog } from "../../context";
import { IUseCatalogPath, useCatalogPath } from "../../hooks/useCatalogPath";
import { Loading } from "../Loading";
import { NavLink } from "react-router-dom";

export type CatalogOutletContextType = { catalogPath: IUseCatalogPath };

export const CatalogLayout = () => {
  const { product } = useCatalog();
  const catalogPath = useCatalogPath();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log("catalog layout");

  useEffect(() => {
    if (catalogPath) {
      setIsLoading(false);
    }
  }, [catalogPath]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
          <Outlet
            context={{ catalogPath } satisfies CatalogOutletContextType}
          />
        </>
      )}
    </>
  );
};
