import { host } from ".";
import { ProductDTO } from "../dto";
import { IProduct } from "../types";

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

const API_URL = "catalog-modules/";

export abstract class ProductAPI {
  static async findAll(params: Partial<IProductAPI> = {}): Promise<IProduct[]> {
    const { data } = await host.get<IProductAPI[]>(API_URL, {
      params,
    });

    return data.map((item) => new ProductDTO(item));
  }

  static async findOne(params: Partial<IProductAPI>): Promise<IProduct> {
    const { data } = await host.get<IProductAPI[]>(API_URL, {
      params,
    });

    return data.length ? new ProductDTO(data[0]) : null;
  }
}

export default ProductAPI;
