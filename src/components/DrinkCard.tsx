import { useAppStore } from "../stores/useAppStore"
import type { Drink } from "../types"

type DrinkCardProps = {
  drink: Drink
}

export default function DrinkCard({drink} : DrinkCardProps) {
  const selectRecipe = useAppStore((state) => state.selectRecipe)

  return (
    <div className=" shadow-lg">
      <div className=" overflow-hidden">
        <img 
          src={drink.strDrinkThumb} 
          alt={`Imagen de ${drink.strDrink}`}
          className=" hover:scale-115 transition-transform delay-100 duration-300 hover:rotate-1"
        />
      </div>
      <div className=" p-5">
        <h2 className=" text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          type="button"
          className=" bg-orange-400 hover:bg-orange-500 font-bold text-white mt-5 w-full p-3 text-lg cursor-pointer rounded-lg transition delay-120 duration-300 uppercase"
          onClick={() => selectRecipe(drink.idDrink)}
        >Ver Receta</button>
      </div>
    </div>
  )
}
