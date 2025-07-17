import { API_URL } from "../consts"


async function saveHistory({ from, text, translatedText, languageFrom, languageTo }) {

    const initialData: any = {
        fromText: from,
        translatedText,
        languageFrom, 
        languageTo
    }

    const initialDataParsed = JSON.stringify(initialData)
    
    try {
        const req = await fetch(`${API_URL}/history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: initialDataParsed
        })

        if (!req.ok) {
            throw new Error("Ha ocurrido un problema, intenta de nuevo")
        }

        return true
        // !
        } catch (error: unknown) {

        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('Ha ocurrido un problema desconocido')
        }

}

export default saveHistory