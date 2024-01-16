import { ICategory, ICategoryApi, IDto } from "../types";

export class CategoryDto implements ICategory, IDto<ICategory> {
  constructor(category: ICategoryApi) {
    this.id = category.id;
    this.name = category.name;
    this.link = category.link;
    this.slug = category.slug;
    this.parent = category.parent;
  }

  getSerializableObject(): ICategory {
    return { ...this };
  }

  id: number;
  name: string;
  link: string;
  slug: string;
  parent: number;
}

export default CategoryDto;
