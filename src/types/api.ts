export type WPRestParams<T extends any> = Partial<
  Omit<T, "id"> & {
    page: number;
    per_page: number;
    search: string;
    after: Date; // ISO8601
    before: Date; // ISO8601
    include: string; // IDs: 1,2,3
    exclude: string;
    order: "asc" | "desc";
  }
>;

export interface IProductAPI {
  id: number;
  title: { rendered: string };
  slug: string;
  link: string;
  catalog_categories: number[];

  um_product_article: string;
  um_product_price: string;
  um_product_width: number;
  um_product_height: number;
  um_product_depth: number;
  um_product_material: string;
  um_product_preview_image: string;

  catalog_ldsp_colors: number[];
}

export interface ICategoryApi {
  id: number;
  name: string;
  link: string;
  slug: string;
  parent: number;
}

export interface ILaminatedChipboardApi {
  id: number;
  name: string;

  um_ldsp_articul: string;
  um_ldsp_thickness: number;
  um_ldsp_texture: { guid: string };
}
