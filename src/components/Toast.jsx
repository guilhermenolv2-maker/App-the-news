import { useEffect } from 'react'
import { CircleCheck, X } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(onClose, 2800)
    return () => window.clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  return (
    <div className="toast" role="status" key={toast.id}>
      <CircleCheck size={18} />
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Fechar aviso">
        <X size={16} />
      </button>
    </div>
  )
}
