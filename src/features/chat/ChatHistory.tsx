import { ChatMessage } from "../../completion/ChatMessage"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { ChatHistoryEntry } from "./ChatHistoryEntry"
import { Intro } from "./Intro"

interface ChatHistoryProps {
  messages: ChatMessage[]
  isLoading?: boolean
  hideSystemPrompt?: boolean
}

export const ChatHistory: React.FunctionComponent<ChatHistoryProps> = ({
  messages,
  hideSystemPrompt = true,
  isLoading = false,
}) => {
  if (hideSystemPrompt) {
    messages = messages.filter((message) => message.role !== "system")
  }

  return (
    <div style={{ paddingBottom: "280px" }}>
      {messages.length === 0 && <Intro />}

      {messages.map((message, index) => (
        <ChatHistoryEntry key={index} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
    </div>
  )
}
