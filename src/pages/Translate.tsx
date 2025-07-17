/* eslint-disable react/react-in-jsx-scope */

// import translateText from '../backend/src/services/translateText'
// import './App.css'
import LanguageSelector from '../components/LanguageSelector'
import { AUTO_LANGUAGE } from '../consts'
import { useStore } from '../hooks/useStore'
// import useTranslator from './hooks/useTranslator'
import translate from '../service/translate'

import { SectionVal } from '../types/types'
import { useRef, type RefObject, type FormEvent, useEffect, useState } from 'react'

import { useDebounce } from '../hooks/useDebounce'
import { CopyIcon, SpeakerIcon } from '../icons'
import { Slide, toast, ToastContainer } from 'react-toastify';
import Error from '../components/Error'
import { Modal } from '../components/Modal'
import saveHistory from '../service/saveHistory'
function Translate() {

  const [historySaved, setHistorySaved]  = useState<boolean|null>(null)
  
  const textAreaFrom = useRef<HTMLTextAreaElement>(null)
  const textAreaTo = useRef<HTMLTextAreaElement>(null)
  const { fromLanguage, setFromLanguage, toLanguage, interchangeLanguages, setToLanguage, fromText, setFromText, translatedText, setToTextTranslated, loading } = useStore()

  const [error, setError] = useState(null)

  // Custom hook
  const debounceFromText = useDebounce(fromText, 300)
  // const  { dataService } = useTranslator({ from: fromLanguage, to: toLanguage, text:fromText})

  // const text = "holaaaa esta es una prueba jaja"
  // console.log("DATA TRANSLATED",dataService)

  const calculateHeight = (refElem: RefObject<HTMLTextAreaElement | null>, event: FormEvent<HTMLTextAreaElement>) => {

    let height = event.target.scrollHeight

    const element = refElem.current

    if (element) {

      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);

      const isManyLines = Math.round(element.scrollHeight / lineHeight)

      element.style.height = "auto"

      if (element.value === '') {
        element.style.height = 32 + 'px'
        height = 32
        return;
      }

      if (isManyLines >= 1) {
        element.style.height = height + 'px'
      }
    }
  }

  const handleTranslate = (e) => {
    setFromText(e.target.value)
    // setLoading(true)
  }

  useEffect(() => {
    // if(fromText === '') return
    if (debounceFromText === '') return
    // translate({from: fromLanguage, to: toLanguage, text:fromText }).then((data) => {
    
    translate({ from: fromLanguage, to: toLanguage, text: debounceFromText }).then((data) => {
      return saveHistory({from: fromLanguage, text: debounceFromText,translatedText, languageFrom: fromLanguage,languageTo: toLanguage}).then(() => {
        setHistorySaved(true)
        setToTextTranslated(data)
      }) 
      // setLoading(false)
    }).catch((err) => {
      const msgError = import.meta.env.MODE === 'development' ? err.message : 'Ocurrió un error inesperado'
      setError(msgError)
    }) 

    // }, [fromText, fromLanguage, toLanguage])
  }, [debounceFromText, fromLanguage, toLanguage])



  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText)
    toast('Copiado al portapapeles', {
      theme: 'light',
      progress: undefined
    })
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(translatedText) 
    utterance.lang  =  toLanguage
    speechSynthesis.speak(utterance)

  }


  const toastMessage = (message: string) => {
    toast(message, {
      theme: 'dark', 
      progress: undefined
    })
  }


  useEffect(() => {

    if (historySaved){
      toastMessage("Historial actualizado!")
    }
  }, [historySaved])


  console.log("error", error)
  return (

    <section className='flex justify-center items-center h-dvh'>
      <div className='flex justify-around items-center gap-4'>
        <div className='w-[300px] h-full rounded-lg bg-neutral-700 p-5'>
          <div>
            <p className='text-gray-400'>From: <span className='text-blue-500'>{fromLanguage}</span></p>
            <LanguageSelector payload={fromLanguage} type={SectionVal.From} onChange={setFromLanguage} />
          </div>

          <textarea onChange={handleTranslate} onInput={(event) => calculateHeight(textAreaFrom, event)} ref={textAreaFrom} className='min-h-fit pl-1 text-gray-200 border-2 border-stone-300 rounded-lg outline-none w-full overflow-y-hidden resize-none'></textarea>
        </div>

        <button

          disabled={fromLanguage === AUTO_LANGUAGE}
          className='bg-white rounded-lg p-3 text-black border-2 border-transparent font-bold hover:cursor-pointer hover:border-blue-200'
          onClick={() => interchangeLanguages()}

        >
          Cambiar
        </button>

        <div className='w-[300px] h-full rounded-lg bg-neutral-700 p-5'>
          <div>
            <p className='text-gray-400'>To: <span className='text-blue-500'>{toLanguage}</span></p>
            <LanguageSelector payload={toLanguage} type={SectionVal.To} onChange={setToLanguage} />
          </div>


          <textarea value={loading ? "Cargando...." : translatedText}  onInput={(event) => calculateHeight(textAreaTo, event)} ref={textAreaTo} className='min-h-fit pl-1 text-gray-200 border-2 border-stone-300 rounded-lg outline-none w-full overflow-y-hidden resize-none'>
          </textarea>

          <div className='flex justify-around gap-5 w-full'>

            <button className=' cursor-pointer' onClick={handleCopy}>
              <CopyIcon />
            </button>

            <button className=' cursor-pointer' onClick={handleSpeak}>
              <SpeakerIcon />
            </button>
          </div>

        </div>
      </div>

      {error && <Modal isOpen={!!error} onClose={() => setError(null)}><Error message={error} /></Modal> }
      <ToastContainer position='bottom-center' autoClose={500} transition={Slide} />
      
    </section>
  )
}

export default Translate
