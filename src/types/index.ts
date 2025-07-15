import z from "zod";
import { CategoriesAPIResponseSchema } from "../schema/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>