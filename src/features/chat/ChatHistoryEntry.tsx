import classNames from "classnames"
import { ChatMessage } from "../../completion/ChatMessage"
import { Card } from "../../components/Card"
import { useCallback } from "react"

interface ChatHistoryEntry {
  message: ChatMessage
}
export const ChatHistoryEntry: React.FunctionComponent<ChatHistoryEntry> = ({
  message,
}) => {
  const senderClassName = classNames("font-bold uppercase", {
    "text-blue-500": message.role === "user",
    "text-purple-500": message.role === "assistant",
    "text-gray-500": message.role === "system",
  })

  const handleClickCopy = useCallback(() => {
    navigator.clipboard.writeText(message.content)
  }, [message])

  return (
    <Card className="static">
      {message.role === "assistant" && (
        <button
          onClick={handleClickCopy}
          className="float-right text-white bg-purple-400 hover:bg-purple-500 text-xs p-1 rounded-md"
        >
          Copy
        </button>
      )}
      <div className={senderClassName}>{message.role}:</div>
      <div className="whitespace-pre-line">{message.content}</div>
    </Card>
  )
}
