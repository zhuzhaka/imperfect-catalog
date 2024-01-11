import { host } from ".";
import { CategoryDto } from "../dto";
import { ICategory } from "../types";

export interface ICategoryApi {
  id: number;
  name: string;
  link: string;
  slug: string;
  parent: number;
}

const API_URL = "catalog_categories/";

export abstract class CategoryApi {
  static async findAll(
    params: Partial<ICategoryApi> = {}
  ): Promise<ICategory[]> {
    const { data } = await host.get<ICategoryApi[]>(API_URL, { params });
    return data.map((item) => new CategoryDto(item));
  }

  static async findOne(params: Partial<ICategoryApi>): Promise<ICategory> {
    const { data } = await host.get<ICategoryApi[]>(API_URL, { params });
    return data.length ? new CategoryDto(data[0]) : null;
  }
}
