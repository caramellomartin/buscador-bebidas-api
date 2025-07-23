import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {
  const drinks = useAppStore((state) => state.drinks)

  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])

  return (
    <>
      <h1 className=" text-6xl font-extrabold text-center">Recetas</h1>
      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 my-16 gap-10">
          {drinks.drinks.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ) : (
        <p className=" my-16 text-center text-2xl italic">
          No hay resultados aún, utiliza el formulario para buscar recetas.
        </p>
      )}
    </>
  )
}
