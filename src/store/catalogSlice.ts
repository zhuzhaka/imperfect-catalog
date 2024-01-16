import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICategory, ILaminatedChipboard, IProduct } from "../types";

type ICatalogState = {
  currentProduct: IProduct;
  categories: ICategory[];
  laminatedChipboards: ILaminatedChipboard[];
};

const initialState: ICatalogState = {
  currentProduct: null,
  categories: null,
  laminatedChipboards: null,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<IProduct>) => {
      state.currentProduct = action.payload;
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    setLaminatedChipboards: (
      state,
      action: PayloadAction<ILaminatedChipboard[]>
    ) => {
      state.laminatedChipboards = action.payload;
    },
  },
});

export const { setCategories, setLaminatedChipboards, setCurrentProduct } =
  catalogSlice.actions;
export default catalogSlice.reducer;
