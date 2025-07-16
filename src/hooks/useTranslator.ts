
// import { useEffect, useState } from 'react'
import { useState, useEffect } from 'react'
import { API_URL } from '../consts'


// Importar los lenguajesd disponiblesd y mapearlos en el front (para no depender de eso sino del back)
function useTranslator({from, to, text}) {
  const [dataService, setDataService] = useState()

  
  const getTraduction = async () => {

    try {
      const initialData : any = {
        from,
        to,
        text
      }


      const initialDataParsed = JSON.stringify(initialData)
      
      const req = await fetch(`${API_URL}/translate`, {
        method: 'POST', 
        headers: {
           'Content-Type': 'application/json',
        }, 
        body:  initialDataParsed
      })

      console.log("req", req.text)

      if(!req.ok){
        throw new Error("Ha ocurrido un problema, intenta de nuevo")
      }
      
      const data = await req.json()

      const dataTranslated = data?.result?.TranslatedText


      console.log("dataTranslated", dataTranslated)
      setDataService(dataTranslated)
      

      // !
    } catch (error: unknown) {

      if(error instanceof Error){
        throw new Error(error.message)
      }
      throw new Error('Ha ocurrido un problema desconocido')
    }
  }
    



  useEffect(() => {

    const fetchService = async () => {
      await getTraduction()

    }
  //     // translateData().then(res => res.json()).then(dataTranslated => {
  //     //   setDataService(dataTranslated)
  //     // })
  //     translateData().then(res => console.log("responseservice",res))

    fetchService()
  }, [])

  return {
      dataService, 
      getTraduction
      // translateData
  }
}


export default useTranslator
