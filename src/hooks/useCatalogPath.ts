import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { ICategory } from "../types";
import { RootState } from "../store";

export interface IUseCatalogPath {
  slug: string;
  breadcrumbs: BreadcrumbsType[];
  isValid: boolean;
  isCategory: boolean;
}

type BreadcrumbsType = {
  category: ICategory;
  fullPath: string;
  slug: string;
  isCategory: boolean;
};

export function useCatalogPath(): IUseCatalogPath {
  const { pathname } = useLocation();
  const categories = useSelector(
    (state: RootState) => state.catalog.categories
  );

  let catalogPathname: IUseCatalogPath = null;

  if (categories) {
    const invalidPathIndex: number[] = [];

    const { slug, breadcrumbs } = splitPathname(pathname).reduce(
      (acc, slug, index) => {
        const result: BreadcrumbsType = {
          category: null,
          fullPath: `${acc.fullPath}/${slug}`,
          slug,
          isCategory: false,
        };

        const category = categories.find((item) => item.slug === slug);

        if (category) {
          result.category = category;
          result.isCategory = true;
        } else {
          invalidPathIndex.push(index);
        }

        acc.slug = slug;
        acc.fullPath = result.fullPath;
        acc.breadcrumbs.push(result);

        return acc;
      },
      { slug: "", fullPath: "", breadcrumbs: [] }
    );

    const isValid = invalidPathIndex.every(
      (item) => item === breadcrumbs.length - 1
    );

    const isCategory = breadcrumbs.length
      ? breadcrumbs[breadcrumbs.length - 1].isCategory
      : true;

    catalogPathname = {
      slug,
      breadcrumbs: breadcrumbs.filter((item) => item.isCategory),
      isValid,
      isCategory,
    };
  }

  return catalogPathname;
}

function splitPathname(pathname: string): string[] {
  return pathname.split("/").filter((str) => str !== "");
}
