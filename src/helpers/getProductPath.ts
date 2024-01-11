import { ICategory, IProduct } from "../types";

export function getProductPath(
  categoryId: number,
  categories: ICategory[]
): ICategory[] {
  const path = [];
  let id = categoryId;

  while (id) {
    const currentCategory = categories.find((item) => item.id === id);

    path.push(currentCategory);
    id = currentCategory?.id;
  }

  return path.reverse();
}
