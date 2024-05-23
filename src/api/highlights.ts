import { instance } from "./index";
import { Highlight } from "@/types";

export async function getFeatured(): Promise<Highlight> {
  return instance.get("api/highlights/latest").then((data) => data.data);
}
