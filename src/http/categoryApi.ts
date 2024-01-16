import { host } from ".";
import { CategoryDto } from "../dto";
import { ICategory, ICategoryApi, WPRestParams } from "../types";

type OptionsType = {
  serializable?: boolean;
};

const API_URL = "catalog_categories/";

const _fields = ["id", "name", "link", "slug", "parent"].join(",");

export abstract class CategoryApi {
  static async findAll(
    params: WPRestParams<ICategoryApi> = {},
    { serializable }: OptionsType = { serializable: true }
  ): Promise<ICategory[]> {
    const { data } = await host.get<ICategoryApi[]>(API_URL, {
      params: { ...params, _fields },
    });

    return data.map((item) =>
      serializable
        ? new CategoryDto(item).getSerializableObject()
        : new CategoryDto(item)
    );
  }

  static async findOne(params: WPRestParams<ICategoryApi>): Promise<ICategory> {
    const { data } = await host.get<ICategoryApi[]>(API_URL, {
      params: { ...params, _fields },
    });

    return data.length ? new CategoryDto(data[0]) : null;
  }
}
