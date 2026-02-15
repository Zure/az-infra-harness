import { ArrowRight } from 'lucide-react'

interface ContinueButtonProps {
  onClick: () => void
  disabled?: boolean
  label: string
  disabledMessage?: string
}

export function ContinueButton({ 
  onClick, 
  disabled = false, 
  label,
  disabledMessage 
}: ContinueButtonProps) {
  return (
    <div className="mt-8">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-lg font-semibold transition-all ${
          !disabled
            ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500'
        }`}
        title={disabled && disabledMessage ? disabledMessage : label}
      >
        {label}
        <ArrowRight className="h-5 w-5" />
      </button>
      {disabled && disabledMessage && (
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          {disabledMessage}
        </p>
      )}
    </div>
  )
}
