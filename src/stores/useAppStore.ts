import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, type RecipeSliceType } from "./recipeSlice";
import { createFavoritesSlice, type FavoritesSliceType } from "./favoritesSlice";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";
import { createAISlice, type AISlice } from "./aiSlice";

export const useAppStore = create<RecipeSliceType & FavoritesSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({
  ...createRecipeSlice(...a),
  ...createFavoritesSlice(...a),
  ...createNotificationSlice(...a),
  ...createAISlice(...a)
})))
