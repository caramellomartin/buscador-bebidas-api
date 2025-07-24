import { useAppStore } from "../stores/useAppStore"
import Markdown from 'react-markdown'

export default function GenerateAI() {
  const showNotification = useAppStore((state) => state.showNotification)
  const generateRecipe = useAppStore((state) => state.generateRecipe)
  const recipe = useAppStore((state) => state.recipe)
  const isGenerating = useAppStore((state) => state.isGenerating)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const prompt = form.get('prompt') as string

    if (prompt.trim() === '') {
      showNotification({
        text: 'Escribe algo para realizar una búsqueda.',
        error: true
      })
      return
    }
    await generateRecipe(prompt)
  }

  return (
    <>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-10">Generar Receta con IA</h1>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className='flex flex-col space-y-3 py-6 sm:py-10'
        >
          <div className="relative">
            <label htmlFor="prompt" className="sr-only">
              Escribe tu receta o ingredientes
            </label>
            <input
              name="prompt"
              id="prompt"
              autoFocus
              className="border bg-white p-4 pr-14 rounded-lg w-full border-slate-800 placeholder:italic"
              placeholder="Genera una receta con ingredientes. Ej. Bebida con fernet y refresco de cola."
            />
            {isGenerating ? (
              <div className="absolute top-1/2 right-3 sm:right-5 transform -translate-y-1/2">
                <svg className="w-6 h-6 animate-spin text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              </div>
            ) : (
              <button
                type="submit"
                aria-label="Generar"
                className="absolute top-1/2 right-3 sm:right-5 transform -translate-y-1/2 hover:text-orange-400 transition cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            )}
          </div>
        </form>
        {isGenerating && <p className=" text-center font-semibold animate-pulse mb-5">Generando respuesta...</p>}
        {recipe && (
          <div className="p-4 sm:p-6 md:p-10 rounded-lg whitespace-pre-wrap bg-gray-800 text-white mt-5">
            <Markdown>{recipe}</Markdown>
          </div>
        )}
      </div>
    </>
  )
}