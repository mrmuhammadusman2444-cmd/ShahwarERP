import { useEffect } from 'react'

const useKeyboardShortcuts = (shortcuts) => {
    useEffect(() => {
        const handler = (e) => {
            const tag = e.target.tagName
            const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
            if (isTyping) return

            shortcuts.forEach(({ key, ctrl, alt, shift, action }) => {
                const ctrlMatch = ctrl ? (e.ctrlKey || e.metaKey) : !e.ctrlKey
                const altMatch = alt ? e.altKey : !e.altKey
                const shiftMatch = shift ? e.shiftKey : !e.shiftKey
                const keyMatch = e.key.toLowerCase() === key.toLowerCase()

                if (ctrlMatch && altMatch && shiftMatch && keyMatch) {
                    e.preventDefault()
                    action()
                }
            })
        }

        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [shortcuts])
}

export default useKeyboardShortcuts