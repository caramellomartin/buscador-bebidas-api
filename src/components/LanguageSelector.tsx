import type { Recipe } from "../types"

type Language = 'EN' | 'ES' | 'IT'

interface LanguageProps {
  selected: Language
  onChange: (lang: Language) => void
  availableInstructions: Pick<Recipe, 'strInstructions' | 'strInstructionsES' | 'strInstructionsIT'>
}

const FLAGS = [
  { code: 'EN', country: 'gb', key: 'strInstructions' },
  { code: 'ES', country: 'es', key: 'strInstructionsES' },
  { code: 'IT', country: 'it', key: 'strInstructionsIT' },
] as const;

export default function LanguageSelector({ selected, onChange, availableInstructions }: LanguageProps) {
  return (
    <div className=" flex space-x-2">
      {FLAGS.map((lang) => {
        const isAvailable = availableInstructions[lang.key] !== null
        const isSelected = selected === lang.code
        return(
          <button
            key={lang.code}
            onClick={() => {
              if(isAvailable) onChange(lang.code)
            }}
            disabled={!isAvailable}
            className={`inline-block w-6 h-4 p-0 m-2 border-none cursor-pointer transition-all duration-200 
              ${!isAvailable ? 'opacity-30 cursor-not-allowed border-transparent' : 'hover:opacity-100 opacity-80'}
            `}
            title={!isAvailable ? 'Traducción no disponible' : `Cambiar a ${lang.code}`}
          >
            <img 
              src={`https://flagcdn.com/w40/${lang.country}.png`} 
              alt={`Bandera de ${lang.code}`}
              className={` w-6 h-4 object-cover rounded-sm ${isSelected ? 'ring-2 ring-blue-400' : ''}`}
            />
          </button>
        )
      })}
    </div>
  )
}
