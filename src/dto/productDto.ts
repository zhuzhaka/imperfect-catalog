import { IProductAPI } from "../http";
import { IProduct } from "../types";

export class ProductDTO implements IProduct {
  constructor(product: IProductAPI) {
    this.id = product.id;
    this.title = product.title.rendered;
    this.link_slug = product.slug;
    this.link = product.link;
    this.catalog_categories = product.catalog_categories;

    this.um_product_price = product.um_product_price;
    this.um_product_article = product.um_product_article;
    this.um_product_width = product.um_product_width;
    this.um_product_height = product.um_product_height;
    this.um_product_depth = product.um_product_depth;
    this.um_product_material = product.um_product_material;
    this.um_product_preview_image = product.um_product_preview_image;

    this.um_laminated_chipboard_id = product.catalog_ldsp_colors[0];
  }

  id: number;
  title: string;
  link_slug: string;
  link: string;
  catalog_categories: number[];

  um_product_article: string;
  um_product_price: string;
  um_product_width: number;
  um_product_height: number;
  um_product_depth: number;
  um_product_material: string;
  um_product_preview_image: string;
  um_laminated_chipboard_id: number;
  // um_laminated_chipboard: ILaminatedChipboard;

  // catalog_ldsp_colors: number[];
}
