import React, {
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { ICatalogContext, ILaminatedChipboard, IProduct } from "../types";
import { useLaminatedChipboards } from "../hooks/useLaminatedChipboards";
import { useCategories } from "../hooks/useCategories";

interface ICatalogProviderProps {
  children: ReactElement;
}

const CatalogContext = createContext<ICatalogContext>(null);

export function CatalogProvider({
  children,
}: ICatalogProviderProps): ReactElement {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>(null);

  const [laminatedChipboards, setLaminatedChipboards] =
    useLaminatedChipboards();

  const [categories, setCategories] = useCategories();

  const value = useMemo(
    () => ({
      product,
      setProduct,
      categoryId,
      setCategoryId,
      categories,
      setCategories,
      laminatedChipboards,
      setLaminatedChipboards,
    }),
    [product, categories, laminatedChipboards]
  );

  console.log("catalog context");

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error("there is no Catalog Context");
  }

  return context;
}
