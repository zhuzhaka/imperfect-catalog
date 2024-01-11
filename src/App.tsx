import React from "react";

import { CatalogPage } from "./pages/CatalogPage";
import { Route, Routes } from "react-router";
import { AppProvider, CatalogProvider } from "./context";
import { CatalogLayout } from "./components/CatalogLayout";

import "./scss/style.scss";
import { RoutingExample } from "./pages/TestPage";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/*" element={<RoutingExample />} />
        <Route
          path="/catalog/*"
          element={
            <CatalogProvider>
              <CatalogLayout />
            </CatalogProvider>
          }>
          {/* <Route path="*" element={<CatalogPage />} /> */}
          <Route path=":slug/*" element={<CatalogPage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
