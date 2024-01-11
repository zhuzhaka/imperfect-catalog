import { host } from ".";
import { ILaminatedChipboard } from "../types";
import { LaminatedChipboardDTO } from "../dto";

export interface ILaminatedChipboardApi {
  id: number;
  name: string;

  um_ldsp_articul: string;
  um_ldsp_thickness: number;
  um_ldsp_texture: { guid: string };
}

const API_URL = "catalog_ldsp_colors/";

export abstract class LaminatedChipboardApi {
  static async findAll(
    params: Partial<ILaminatedChipboardApi> = {}
  ): Promise<ILaminatedChipboard[]> {
    const { data } = await host.get<ILaminatedChipboardApi[]>(API_URL, {
      params,
    });

    return data.map((item) => new LaminatedChipboardDTO(item));
  }

  static async findOne(
    params: Partial<ILaminatedChipboardApi>
  ): Promise<ILaminatedChipboard> {
    const { data } = await host.get<ILaminatedChipboardApi[]>(API_URL, {
      params,
    });

    return data.length ? new LaminatedChipboardDTO(data[0]) : null;
  }
}

export default LaminatedChipboardApi;
