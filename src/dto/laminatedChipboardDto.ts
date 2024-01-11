import { ILaminatedChipboard } from "../types";

interface ILaminatedChipboardResponse
  extends Omit<ILaminatedChipboard, "um_ldsp_texture"> {
  um_ldsp_texture: { guid: string };
}

export class LaminatedChipboardDTO implements ILaminatedChipboard {
  constructor(laminatedChipboard: any) {
    const chipboard = laminatedChipboard as ILaminatedChipboardResponse;

    this.id = chipboard.id;
    this.name = chipboard.name;
    this.um_ldsp_articul = chipboard.um_ldsp_articul;
    this.um_ldsp_thickness = chipboard.um_ldsp_thickness;
    this.um_ldsp_texture = chipboard.um_ldsp_texture.guid;
  }

  id: number;
  name: string;
  um_ldsp_articul: string;
  um_ldsp_thickness: number;
  um_ldsp_texture: string;
}

export default LaminatedChipboardDTO;
