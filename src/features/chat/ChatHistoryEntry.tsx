import classNames from "classnames"
import { ChatMessage } from "../../completion/ChatMessage"
import { Card } from "../../components/Card"

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

  return (
    <Card>
      <div className={senderClassName}>{message.role}:</div>
      <div className="whitespace-pre-line">{message.content}</div>
    </Card>
  )
}
