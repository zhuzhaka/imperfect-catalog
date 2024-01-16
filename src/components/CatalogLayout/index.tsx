import React from "react";
import { Outlet } from "react-router";

import { IUseCatalogPath, useCatalogPath } from "../../hooks/useCatalogPath";
import { ProductHistory } from "../ProductHistory";
import { Breadcrumbs } from "../Breadcrumbs";

export type CatalogOutletContextType = { catalogPath: IUseCatalogPath };

export const CatalogLayout = () => {
  const catalogPath = useCatalogPath();

  return (
    <>
      <Breadcrumbs catalogPath={catalogPath} />
      <div className="catalog-page">
        <Outlet context={{ catalogPath } satisfies CatalogOutletContextType} />
      </div>
      <ProductHistory />
    </>
  );
};
