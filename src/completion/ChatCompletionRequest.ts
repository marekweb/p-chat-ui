import { ChatMessage } from "./ChatMessage"

export interface ChatCompletionRequest {
  model: string
  messages: ChatMessage[]
  temperature?: number
  stop?: string[]
}
