import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ICategory } from "./types";
import { Route, Routes } from "react-router";
import { Loading } from "./components/Loading";
import { CatalogPage } from "./pages/CatalogPage";
import { RoutingExample } from "./pages/TestPage";
import { CatalogLayout } from "./components/CatalogLayout";
import { CategoryApi, LaminatedChipboardApi } from "./http";
import { setCategories, setLaminatedChipboards } from "./store/catalogSlice";

import "./scss/style.scss";
import { CatalogContent } from "./pages/CatalogContent";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const CATALOG_CATEGORY: ICategory = {
      id: 0,
      name: "Каталог",
      slug: "catalog",
      parent: null,
      link: "/catalog",
    };

    Promise.all([
      CategoryApi.findAll().then((data) =>
        dispatch(setCategories([CATALOG_CATEGORY, ...data]))
      ),
      LaminatedChipboardApi.findAll().then((data) =>
        dispatch(setLaminatedChipboards(data))
      ),
    ]).then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/*" element={<RoutingExample />} />
      <Route path="/catalog/*" element={<CatalogLayout />}>
        <Route index element={<CatalogPage />} />
        <Route path=":slug/*" element={<CatalogContent />} />
      </Route>
    </Routes>
  );
}

export default App;
