import { ICategoryApi } from "../http";
import { ICategory } from "../types";

export class CategoryDto implements ICategory {
  constructor(category: ICategoryApi) {
    this.id = category.id;
    this.name = category.name;
    this.link = category.link;
    this.slug = category.slug;
    this.parent = category.parent;
  }

  id: number;
  name: string;
  link: string;
  slug: string;
  parent: number;
}

export default CategoryDto;
