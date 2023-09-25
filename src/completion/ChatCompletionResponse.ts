import { ChatMessage } from "./ChatMessage"

export interface ChatCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  choices?: {
    message: ChatMessage
    finish_reason: "stop" | "length" | "content_filter" | "null"
    index: number
  }[]
}
