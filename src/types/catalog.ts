import { ICategoryApi, ILaminatedChipboardApi, IProductAPI } from "../http";

export interface ICatalogContext {
  product: IProduct;
  setProduct: Function;

  categoryId: number;
  setCategoryId?: Function;

  categories: ICategory[];
  setCategories: Function;

  laminatedChipboards: ILaminatedChipboard[];
  setLaminatedChipboards?: Function;
}

export interface IProduct
  extends Omit<IProductAPI, "title" | "slug" | "catalog_ldsp_colors"> {
  title: string;
  link_slug: string;
  um_laminated_chipboard_id: number;
}

export interface ICategory extends ICategoryApi {}

export interface ILaminatedChipboard
  extends Omit<ILaminatedChipboardApi, "um_ldsp_texture"> {
  um_ldsp_texture: string;
}
