import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState, type JSX } from 'react';
import { useAppStore } from '../stores/useAppStore';
import type { Recipe } from '../types';
import LanguageSelector from './LanguageSelector';

export default function Modal() {
  const modal = useAppStore((state) => state.modal)
  const closeModal = useAppStore((state) => state.closeModal)
  const selectedRecipe = useAppStore((state) => state.selectedRecipe)
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
  const favorites = useAppStore((state) => state.favorites)
  const showNotification = useAppStore((state) => state.notification.show)
  const isFavorite = favorites.some(fav => fav.idDrink === selectedRecipe.idDrink);

  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'ES' | 'IT'>('EN');

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = []
    for(let i = 1; i <= 15; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]

      if(ingredient && measure) {
        ingredients.push(
          <li key={i} className=' text-lg leading-relaxed font-semibold'>
            {ingredient} - {measure}
          </li>
        )
      }
    }
    return ingredients
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {if(!showNotification) closeModal()}}>
          {/* Backdrop */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </TransitionChild>

          {/* Modal Container */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 py-8 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 translate-y-4 scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  {/* Close button */}
                  <button
                    onClick={closeModal}
                    className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition cursor-pointer rounded-full w-6 m-auto'
                  >X</button>
                  <DialogTitle className=" text-3xl font-bold text-center text-gray-900 mb-6">
                    {selectedRecipe.strDrink}
                  </DialogTitle>
                  <img 
                    src={selectedRecipe.strDrinkThumb} 
                    alt={`Imágen de ${selectedRecipe.strDrink}`}
                    className=' mx-auto w-60 mb-5'
                  />
                  <div className=" space-y-6 text-gray-800">
                    <section>
                      <h2 className=' text-2xl font-bold mb-2'>Ingredientes y Cantidades</h2>
                      {renderIngredients()}
                    </section>
                    <section>
                      <div className=' flex flex-col sm:flex-row justify-between mb-2'>                      
                        <h2 className=' text-2xl font-bold mb-2'>Instrucciones</h2>
                        <LanguageSelector
                          selected={selectedLanguage}
                          onChange={setSelectedLanguage}
                          availableInstructions={{
                            strInstructions: selectedRecipe.strInstructions,
                            strInstructionsES: selectedRecipe.strInstructionsES,
                            strInstructionsIT: selectedRecipe.strInstructionsIT,
                          }}
                        />
                      </div>
                      <p className=' text-lg leading-relaxed font-semibold'>{selectedLanguage === 'ES' && selectedRecipe.strInstructionsES 
                        ? selectedRecipe.strInstructionsES : selectedLanguage === 'IT' && selectedRecipe.strInstructionsIT 
                        ? selectedRecipe.strInstructionsIT 
                        : selectedRecipe.strInstructions }
                      </p>
                    </section>
                  </div>
                  <div className=' mt-5'>
                    <button
                      type="button"
                      className={`cursor-pointer text-white font-extrabold w-full rounded-lg p-3 uppercase transition delay-120 duration-300 ${isFavorite ? "bg-slate-800 hover:bg-slate-600" : "bg-orange-400 hover:bg-orange-500"}  `}
                      onClick={() => handleClickFavorite(selectedRecipe)}
                    >
                      {isFavorite ? 'Eliminar de Favoritos' : 'Guardar en Favoritos'}
                    </button> 
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}