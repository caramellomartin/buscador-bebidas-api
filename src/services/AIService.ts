import { streamText } from 'ai'
import { openRouter } from '../lib/ai'

export default {
  async generateRecipe(prompt: string) {
    const result = streamText({
      model: openRouter('deepseek/deepseek-chat-v3-0324:free'),
      prompt,
      system: 'Eres un bartender que tiene muchos años de experiencia, detallas bien las recetas y no terminas tu mensaje con una pregunta'
    })
    return result.textStream
  }
}