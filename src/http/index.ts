import axios from "axios";
import { API_BASE_URL } from "../helpers/consts";

export const host = axios.create({ baseURL: API_BASE_URL });

export * from "./productApi";
export * from "./categoryApi";
export * from "./laminatedChipboardApi";
