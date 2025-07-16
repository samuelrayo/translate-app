import { AUTO_LANGUAGE, type SUPPORTED_LANGUAGES} from '../consts'

interface State{
  fromLanguage: FromLanguage, 
  toLanguage: Languages, 
  fromText: string,
  translatedText: string, 
  loading: boolean
}


type Action = 
{ type: 'SET_FROM_LANGUAGE', payload: FromLanguage} | 
{ type: 'INTERCHANGE_LANGUAGES'} |
{type: 'SET_TO_LANGUAGE', payload: Languages} |
{type: 'SET_FROM_TEXT', payload: string} |
{type: 'SET_TO_TEXT', payload: string} | 
{type: 'SET_LOADING', payload: boolean}


type Languages = keyof typeof SUPPORTED_LANGUAGES 
type AutoLanguage = typeof AUTO_LANGUAGE 

type FromLanguage = Languages | AutoLanguage

// enum SectionVal {
//   From = 'from',
//   To='to'
// }

export const SectionVal = {
  From: 'from',
  To: 'to'
} as const;


// export { State, Action , Languages, AutoLanguage, FromLanguage, SectionVal}

// Para tipos
export type { State, Action, Languages, AutoLanguage, FromLanguage };

// Para objetos o funciones (si los hay)
export { SectionVal as SectionValEnum };
