import { normalizeText } from '../../utils/text'

interface HighlightTextProps {
    text: string
    query: string
}

export function HighlightText({ text, query }: HighlightTextProps) {
    const tokens = normalizeText(query).split(/\s+/).filter(Boolean)
    const chars = Array.from(text)
    const normalizedChars = chars.map(normalizeText)

    // Si algún carácter cambia de longitud al normalizar, no se puede mapear índice a índice.
    if (tokens.length === 0 || normalizedChars.some((c) => c.length !== 1)) {
        return <>{text}</>
    }

    const haystack = normalizedChars.join('')
    const marked = new Array<boolean>(chars.length).fill(false)
    for (const token of tokens) {
        let index = haystack.indexOf(token)
        while (index !== -1) {
            marked.fill(true, index, index + token.length)
            index = haystack.indexOf(token, index + token.length)
        }
    }

    const segments: Array<{ text: string; highlight: boolean }> = []
    chars.forEach((char, i) => {
        const last = segments.at(-1)
        if (last && last.highlight === marked[i]) {
            last.text += char
        } else {
            segments.push({ text: char, highlight: marked[i] })
        }
    })

    return (
        <>
            {segments.map((segment, i) =>
                segment.highlight ? (
                    <mark key={i} className="rounded-sm bg-brand-100 text-inherit">
                        {segment.text}
                    </mark>
                ) : (
                    <span key={i}>{segment.text}</span>
                ),
            )}
        </>
    )
}
