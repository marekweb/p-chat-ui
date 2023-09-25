import { useCallback } from "react"

export const TextArea: React.FunctionComponent<{
  label?: string
  value: string
  onChange: (value: string) => void
  type?: string
  disabled?: boolean
  onEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}> = ({ label, value, onChange, type = "text", disabled = false, onEnter }) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (onEnter && !disabled && event.key === "Enter") {
        onEnter(event)
      }
    },
    [onEnter, disabled],
  )
  return (
    <div className="">
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="mt-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}
