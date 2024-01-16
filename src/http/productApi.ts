import QueryString from "qs";
import { host } from ".";
import { ProductDTO } from "../dto";
import { IProduct } from "../types";
import { IProductAPI, WPRestParams } from "../types/api";

type OptionsType = {
  serializable: boolean;
};

const API_URL = "catalog-modules/";

const _fields = [
  "id",
  "title",
  "slug",
  "link",
  "catalog_categories",
  "catalog_ldsp_colors",
  "um_product_article",
  "um_product_price",
  "um_product_width",
  "um_product_height",
  "um_product_depth",
  "um_product_material",
  "um_product_preview_image",
].join(",");

export abstract class ProductAPI {
  static async findAll(
    params: WPRestParams<IProductAPI> = {},
    { serializable }: OptionsType = { serializable: true }
  ): Promise<IProduct[]> {
    const { data } = await host.get<IProductAPI[]>(API_URL, {
      params: {
        ...params,
        _fields,
      },
      // paramsSerializer: (p) => QueryString.stringify(p),
    });

    return serializable
      ? data.map((item) => new ProductDTO(item).getSerializableObject())
      : data.map((item) => new ProductDTO(item));
  }

  static async findOne(
    params: WPRestParams<IProductAPI>,
    { serializable }: OptionsType = { serializable: true }
  ): Promise<IProduct> {
    const { data } = await host.get<IProductAPI[]>(API_URL, {
      params: {
        ...params,
        _fields,
      },
    });

    if (data.length) {
      const obj = new ProductDTO(data[0]);
      return serializable ? obj.getSerializableObject() : obj;
    }

    return null;
  }
}

export default ProductAPI;
