import { API_URL } from "../consts"


async function translate({ from, to, text }) {

    const initialData: any = {
        from,
        to,
        text
    }

    const initialDataParsed = JSON.stringify(initialData)
    
    try {
        const req = await fetch(`${API_URL}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: initialDataParsed
        })

        if (!req.ok) {
            throw new Error("Ha ocurrido un problema, intenta de nuevo")
        }

        const data = await req.json()

        const dataTranslated = data?.result?.TranslatedText
        return dataTranslated
        // !
        } catch (error: unknown) {
            console.log("entra a error")

        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('Ha ocurrido un problema desconocido')
        }

}

export default translate