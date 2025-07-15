import { create } from "zustand";
import { createRecipeSlice, type RecipeSliceType } from "./recipeSlice";

export const useAppStore = create<RecipeSliceType>((...a) => ({
  ...createRecipeSlice(...a)
}))
