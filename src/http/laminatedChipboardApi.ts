import { host } from ".";
import {
  ILaminatedChipboard,
  ILaminatedChipboardApi,
  WPRestParams,
} from "../types";
import { LaminatedChipboardDTO } from "../dto";

type OptionsType = {
  serializable: boolean;
};

const API_URL = "catalog_ldsp_colors/";

const _fields = [
  "id",
  "name",
  "um_ldsp_articul",
  "um_ldsp_thickness",
  "um_ldsp_texture.guid",
].join(",");

export abstract class LaminatedChipboardApi {
  static async findAll(
    params: WPRestParams<ILaminatedChipboardApi> = {},
    { serializable }: OptionsType = { serializable: true }
  ): Promise<ILaminatedChipboard[]> {
    const { data } = await host.get<ILaminatedChipboardApi[]>(API_URL, {
      params: { ...params, _fields },
    });

    return serializable
      ? data.map((item) =>
          new LaminatedChipboardDTO(item).getSerializableObject()
        )
      : data.map((item) => new LaminatedChipboardDTO(item));
  }

  static async findOne(
    params: WPRestParams<ILaminatedChipboardApi>
  ): Promise<ILaminatedChipboard> {
    const { data } = await host.get<ILaminatedChipboardApi[]>(API_URL, {
      params: { ...params, _fields },
    });

    return data.length ? new LaminatedChipboardDTO(data[0]) : null;
  }
}

export default LaminatedChipboardApi;
