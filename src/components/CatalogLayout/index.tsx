import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useCatalog } from "../../context";
import { IUseCatalogPath, useCatalogPath } from "../../hooks/useCatalogPath";
import { Loading } from "../Loading";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "../Breadcrumbs";

export type CatalogOutletContextType = { catalogPath: IUseCatalogPath };

export const CatalogLayout = () => {
  // const { product } = useCatalog();
  // console.log(useCatalog());
  const catalogPath = useCatalogPath();
  // const { pathname } = useLocation();
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
          <Breadcrumbs catalogPath={catalogPath} />
          <Outlet
            context={{ catalogPath } satisfies CatalogOutletContextType}
          />
        </>
      )}
    </>
  );
};
