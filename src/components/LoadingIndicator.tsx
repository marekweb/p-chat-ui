import { useEffect, useState } from "react"

/**
 * Simple loading indicator that displays "..." animated typing dots.
 */
export const LoadingIndicator = () => {
  const [state, setState] = useState(0)

  useEffect(() => {
    const cycleState = () => setState((state) => (state + 1) % 4)
    const interval = setInterval(cycleState, 300)
    return () => clearInterval(interval)
  }, [])

  return <div>{".".repeat(state) || <>&nbsp;</>}</div>
}
