import { ChatCompletionRequest } from "./ChatCompletionRequest"
import { ChatCompletionResponse } from "./ChatCompletionResponse"

export async function makeMockRequest(
  apiURL: string,
  apiKey: string,
  request: ChatCompletionRequest,
): Promise<ChatCompletionResponse> {
  return {
    id: "chatcmpl-001",
    object: "chat.completion",
    created: 1695647720,
    model: "gpt-3.5-turbo-0613",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "I am an assistant.",
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 100,
      completion_tokens: 10,
      total_tokens: 110,
    },
  }
}
