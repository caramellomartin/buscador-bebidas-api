import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, type RecipeSliceType } from "./recipeSlice";
import { createFavoritesSice, type FavoritesSliceType } from "./favoritesSlice";

export const useAppStore = create<RecipeSliceType & FavoritesSliceType>()(devtools((...a) => ({
  ...createRecipeSlice(...a),
  ...createFavoritesSice(...a)
})))
