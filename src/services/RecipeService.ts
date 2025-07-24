import api from "../lib/axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema } from "../schema/recipes-schema"
import type { Drink, SearchFilter } from "../types"

export async function getCategories() {
  const { data } = await api('/list.php?c=list')
  const result = CategoriesAPIResponseSchema.safeParse(data)
  if(result.success) {
    return result.data
  }
}

export async function getRecipes(filters: SearchFilter) {
  const { data } = await api(`/filter.php?i=${filters.ingredient}&c=${filters.category}`)
  const result = DrinksAPIResponseSchema.safeParse(data)
  if(result.success) {
    return result.data
  }
}

export async function getRecipesById(id: Drink['idDrink']) {
  const { data } = await api(`/lookup.php?i=${id}`)
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
  if(result.success) {
    return result.data
  }
}