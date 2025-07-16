import { useReducer } from 'react'
import type { State, Action, Languages, FromLanguage } from '../types/types'
import { AUTO_LANGUAGE } from '../consts'



const initialState: State = {
  fromLanguage: "es", 
  toLanguage: "en", 
  fromText: '',
  translatedText: '', 
  loading: false
}

function reducer(state: State, action: Action){
  const { type } = action
  
    switch(type){
        case 'INTERCHANGE_LANGUAGES':


          const loadingInterchange = state.fromText !== ''

            if(state.fromLanguage === AUTO_LANGUAGE) return state
          
            return {
                ...state, 
                loading: loadingInterchange,
                fromLanguage: state.toLanguage, 
                toLanguage: state.fromLanguage
            }
        case 'SET_FROM_LANGUAGE':

        // Evitar que se re renderice si es el mismo idioma

        if(state.fromLanguage === action.payload) return
          
         const loadingFrom = state.fromText !== ''  // --> Validar si el texto NO ESTA vacio para poder poner el loading
         console.log("Loading", loadingFrom)

            return{
                ...state, 
                fromLanguage: action.payload,
                loading: loadingFrom
            }
        
        case 'SET_TO_LANGUAGE':

        if(state.toLanguage === action.payload) return state // Evitar que se renderice el mismo idioma
          
        const loadingTo = state.fromText !== ''

            return{
                ...state, 
                toLanguage: action.payload, 
                translatedText: '',
                loading: loadingTo
            }
        case 'SET_FROM_TEXT':
  
          const loading = action.payload !== ''


            return {
                ...state, 
                // loading: true,
                loading,
                fromText: action.payload, 
                translatedText: ''
            }
        case 'SET_TO_TEXT':

            return {
                ...state, 
                loading: false,
                translatedText: action.payload
            }
        case 'SET_LOADING': 
            return {
              ...state,
              loading: action.payload
            }
    }
 
}  


export function useStore(){
  // [state, dispatch]
  // state son los valores de los estados; variables
   const [{
    fromLanguage,
    toLanguage,
    fromText,
    translatedText,
    loading
  }, dispatch] = useReducer(reducer, initialState)   //--> Initial state es el valor inicial del estado
//                        (state, action)
  const interchangeLanguages = () => {
    dispatch({type: 'INTERCHANGE_LANGUAGES'})
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({type:'SET_FROM_LANGUAGE', payload: payload})
  }

  const setToLanguage = (payload: Languages) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload: payload})
  }

  const setFromText = (payload: string) => {
    dispatch({type: 'SET_FROM_TEXT', payload: payload})
  }

  const setToTextTranslated = (payload: string) => {
    dispatch({type: 'SET_TO_TEXT', payload: payload})
  }

  const setLoading = (payload: boolean) => {
    dispatch({type: 'SET_LOADING', payload})
  }


    return {
        fromLanguage, 
        toLanguage,
        fromText,
        translatedText,
        loading, 
        setLoading,
        interchangeLanguages, 
        setFromLanguage,
        setToLanguage,
        setFromText, 
        setToTextTranslated
    }
}