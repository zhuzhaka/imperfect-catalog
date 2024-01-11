import { useEffect, useState } from "react";
import { ICategory } from "../types";
import { CategoryApi } from "../http";

export function useCategories(): [ICategory[], Function] {
  const [categories, setCategories] = useState<ICategory[]>(null);

  useEffect(() => {
    (async function fetchData() {
      const data: ICategory[] = await CategoryApi.findAll();
      setCategories([CATALOG_CATEGORY, ...data]);
    })();

    console.log("useCategories");

    return () => {
      console.log("useCategories unmount");
      setCategories(null);
    };
  }, []);

  // if (!categories) {
  //   (async function fetchData() {
  //     const data: ICategory[] = await CategoryApi.findAll();
  //     setCategories(data);
  //   })();
  // }

  return [categories, setCategories];
}

const CATALOG_CATEGORY: ICategory = {
  id: 0,
  name: "Каталог",
  slug: "catalog",
  parent: null,
  link: "/catalog",
};
