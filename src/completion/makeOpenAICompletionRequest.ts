import { ChatCompletionRequest } from "./ChatCompletionRequest"
import { ChatCompletionResponse } from "./ChatCompletionResponse"

export async function makeOpenAIChatCompletionRequest(
  apiURL: string,
  apiKey: string,
  request: ChatCompletionRequest,
): Promise<ChatCompletionResponse> {
  const url = new URL("/v1/chat/completions", apiURL)
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(request),
  })
  const data = (await response.json()) as ChatCompletionResponse
  return data
}
