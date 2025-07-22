import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    <>
      <h1 className=" text-6xl font-extrabold text-center">Tus Recetas Favoritas</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 my-15 gap-10">
          {favorites.map(drink => (
            <DrinkCard 
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ) : (
        <p className=" my-15 text-center text-2xl text-gray-600 italic">
          Agrega una receta a tus favoritos y la verás aquí
        </p>
      )}
    </>
  )
}
