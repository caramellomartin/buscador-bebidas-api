import { NavLink } from "react-router"

export default function Header() {
  return (
    <header className=" bg-slate-800">
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
      </div>
    </header>
  )
}
