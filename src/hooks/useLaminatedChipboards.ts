import { useState } from "react";
import { ILaminatedChipboard } from "../types";
import { LaminatedChipboardApi } from "../http";

export function useLaminatedChipboards(): [ILaminatedChipboard[], Function] {
  const [laminatedChipboards, setLaminatedChipboards] =
    useState<ILaminatedChipboard[]>(null);

  if (!laminatedChipboards) {
    (async function fetchData() {
      const data: ILaminatedChipboard[] = await LaminatedChipboardApi.findAll();
      setLaminatedChipboards(data);
    })();
  }

  return [laminatedChipboards, setLaminatedChipboards];
}
