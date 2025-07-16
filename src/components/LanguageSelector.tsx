import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../consts"
import type { FromLanguage, Languages } from "../types/types"
import { SectionVal } from '../types/types'

type Props =
    { type: SectionVal.From, payload: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionVal.To, payload: Languages, onChange: (language: Languages) => void }


function LanguageSelector({ onChange, type, payload }: Props) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Languages)
    }

    return (
        <select value={payload} onChange={handleChange} className="text-white bg-gray-700">
            {type === SectionVal.From && <option value={AUTO_LANGUAGE}>Detectar Idioma</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
            ))}
        </select>

    )
}

export default LanguageSelector