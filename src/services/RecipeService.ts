import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponseSchema } from "../schema/recipes-schema"
import type { SearchFilter } from "../types"

export async function getCategories() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
  const { data } = await axios(url)
  const result = CategoriesAPIResponseSchema.safeParse(data)
  if(result.success) {
    return result.data
  }
}

export async function getRecipes(filters: SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.ingredient}&c=${filters.category}`
  const { data } = await axios(url)
  const result = DrinksAPIResponseSchema.safeParse(data)
  console.log(result)
  if(result.success) {
    return result.data
  }
}