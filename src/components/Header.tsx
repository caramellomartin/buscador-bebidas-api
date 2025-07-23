import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { NavLink, useLocation } from "react-router"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
  const [ searchFilters, setSearchFilters ] = useState({
    ingredient: '',
    category: ''
  })

  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])

  const fetchCategories = useAppStore((state) => state.fetchCategories)
  const categories = useAppStore((state) => state.categories)
  const searchRecipes = useAppStore((state) => state.searchRecipes)
  const showNotification = useAppStore((state) => state.showNotification)

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //Validate
    if(Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    //Search Recipes
    searchRecipes(searchFilters)
  }

  return (
    <header className={ isHome? "bg-[url('/bg.jpg')] bg-center bg-cover" : "bg-slate-800"}>
      <div className=" mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="Logotipo" />
          </div>
          <nav className=" flex gap-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? ' text-orange-400 uppercase font-bold -translate-y-0.5 scale-105' : ' text-white uppercase font-bold transition delay-120 duration-300  hover:text-orange-400 hover:-translate-y-0.5 hover:scale-105'
              }
            >Inicio</NavLink>
            <NavLink 
              to="/favoritos" 
              className={({ isActive }) => 
                isActive ? ' text-orange-400 uppercase font-bold -translate-y-0.5 scale-105' : ' text-white uppercase font-bold transition delay-120 duration-300  hover:text-orange-400 hover:-translate-y-0.5 hover:scale-105'
              }
            >Favoritos</NavLink>
            <NavLink 
              to="/generate" 
              className={({ isActive }) => 
                isActive ? ' text-orange-400 uppercase font-bold -translate-y-0.5 scale-105' : ' text-white uppercase font-bold transition delay-120 duration-300  hover:text-orange-400 hover:-translate-y-0.5 hover:scale-105'
              }
            >Generar con IA</NavLink>
          </nav>
        </div>
        { isHome && (
          <form 
            className=" md:w-1/2 2xl:w-1/3 bg-orange-400 my-25 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className=" space-y-4">
              <label 
                htmlFor="ingredient"
                className=" block text-white uppercase font-extrabold text-lg"
              >Nombre o Ingredientes</label>
              <input 
                type="text" 
                id="ingredient"
                name="ingredient"
                className=" p-3 w-full rounded-lg focus:outline-none bg-white placeholder:italic"
                placeholder="Nombre o ingrediente. Ej. Vodka, Whisky, Café, etc."
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className=" space-y-4">
              <label 
                htmlFor="category"
                className=" block text-white uppercase font-extrabold text-lg"
              >Categoría</label>
              <select 
                id="category"
                name="category"
                className=" p-3 w-full rounded-lg focus:outline-none bg-white cursor-pointer"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="">--Seleccione--</option>
                {categories.drinks.map( category => (
                  <option 
                    value={category.strCategory}
                    key={category.strCategory}
                  >{category.strCategory}</option>
                ))}
              </select>
            </div>
            <input 
              type="submit"
              value="Buscar Recetas"
              className=" cursor-pointer text-white font-extrabold bg-slate-800 hover:bg-slate-600 rounded-lg p-3 uppercase transition delay-120 duration-300 w-full"
            />
          </form>
        )}
      </div>
    </header>
  )
}
