import { useEffect, useMemo } from "react"
import { NavLink, useLocation } from "react-router"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {

  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])

  const fetchCategories = useAppStore((state) => state.fetchCategories)

  useEffect(() => {
    fetchCategories()
  }, [])

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
          </nav>
        </div>
        { isHome && (
          <form action="" className=" md:w-1/2 2xl:w-1/3 bg-orange-400 my-25 p-10 rounded-lg shadow space-y-6">
            <div className=" space-y-4">
              <label 
                htmlFor="ingredient"
                className=" block text-white uppercase font-extrabold text-lg"
              >Nombre o Ingredientes</label>
              <input 
                type="text" 
                id="ingredient"
                name="ingredient"
                className=" p-3 w-full rounded-lg focus:outline-none bg-white"
                placeholder="Nombre o ingrediente. Ej. Vodka, Whisky, Café, etc."
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
              >
                <option value="">--Seleccione--</option>
              </select>
            </div>
            <input 
              type="submit"
              value="Buscar Recetas"
              className=" cursor-pointer text-white font-extrabold bg-slate-800 hover:bg-slate-500 rounded-lg p-3 uppercase transition delay-120 duration-300 w-full"
            />
          </form>
        )}
      </div>
    </header>
  )
}
