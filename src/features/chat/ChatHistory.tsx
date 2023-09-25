import { ChatMessage } from "../../completion/ChatMessage"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { ChatHistoryEntry } from "./ChatHistoryEntry"
import { Intro } from "./Intro"
import { useAppSelector } from "../../app/hooks"

interface ChatHistoryProps {
  messages: ChatMessage[]
  isLoading?: boolean
  hideSystemPrompt?: boolean
}

export const ChatHistory: React.FunctionComponent<ChatHistoryProps> = ({
  messages,
  isLoading = false,
}) => {
  const showSystemPrompt = useAppSelector(
    (state) => state.chat.showSystemPrompt,
  )
  if (!showSystemPrompt) {
    messages = messages.filter((message) => message.role !== "system")
  }

  return (
    <div style={{ paddingBottom: "350px" }}>
      {messages.length === 0 && <Intro />}

      {messages.map((message, index) => (
        <ChatHistoryEntry key={index} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
    </div>
  )
}
