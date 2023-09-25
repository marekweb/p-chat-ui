import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ChatMessage } from "../../completion/ChatMessage"
import { ChatCompletionRequest } from "../../completion/ChatCompletionRequest"
import { makeOpenAIChatCompletionRequest } from "../../completion/makeOpenAICompletionRequest"
import { RootState } from "../../app/store"
import { makeMockRequest } from "../../completion/makeMockRequest"
import { scrollToBottom } from "./scrollToBottom"

export interface ChatState {
  apiKey: string | null
  systemPrompt: string
  showSystemPrompt: boolean
  messages: ChatMessage[]
  isLoading: boolean
  inputText: string
  activeTab: "chat" | "settings"
  apiMode: "openai" | "mock"
}

export const initialState: ChatState = {
  apiKey: localStorage.getItem("apiKey"),
  systemPrompt:
    "You are an assistant who helps the user with their legal, regulatory, and compliance queries.",
  showSystemPrompt: false,
  messages: [],
  isLoading: false,
  inputText: "",
  activeTab: "chat",
  apiMode: "openai",
}

export const makeChatCompletionRequest = createAsyncThunk<
  ChatMessage,
  ChatMessage,
  { state: RootState }
>(
  "chat/makeChatCompletionRequest",
  async (message: ChatMessage, { getState, dispatch }) => {
    const state = getState()
    const apiKey = state.chat.apiKey

    const messagesForRequest = [...state.chat.messages, message]

    dispatch(chatSlice.actions.updateInputText(""))
    dispatch(chatSlice.actions.startLoading())

    if (state.chat.messages.length === 0 && state.chat.systemPrompt) {
      const systemPromptMessage: ChatMessage = {
        role: "system",
        content: state.chat.systemPrompt,
      }
      dispatch(chatSlice.actions.addMessage(systemPromptMessage))
      messagesForRequest.unshift(systemPromptMessage)
    }

    dispatch(chatSlice.actions.addMessage(message))

    const request: ChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      messages: messagesForRequest,
      temperature: 1.0,
    }

    if (!apiKey) {
      throw new Error("API key is not set")
    }

    let makeRequest = makeOpenAIChatCompletionRequest
    if (state.chat.apiMode === "mock") {
      makeRequest = makeMockRequest
    }

    const response = await makeRequest(
      "https://api.openai.com",
      apiKey,
      request,
    )

    const choice = response.choices?.[0]

    if (!choice) {
      const errorResponse = response as { error?: { message?: string } }
      throw new Error(
        "No valid completion returned by API.\n\n " +
          errorResponse?.error?.message,
      )
    }
    return choice.message
  },
)

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload)
    },
    startLoading(state) {
      setTimeout(scrollToBottom, 100)
      state.isLoading = true
    },
    finishLoading(state) {
      state.isLoading = false
    },
    updateInputText(state, action: PayloadAction<string>) {
      state.inputText = action.payload
    },
    setApiKey(state, action: PayloadAction<string>) {
      state.apiKey = action.payload
      localStorage.setItem("apiKey", action.payload)
    },
    setSystemPrompt(state, action: PayloadAction<string>) {
      state.systemPrompt = action.payload
    },
    setShowSystemPrompt(state, action: PayloadAction<boolean>) {
      state.showSystemPrompt = action.payload
    },
    newConversation(state) {
      state.messages = []
    },
    setActiveTab(state, action: PayloadAction<typeof state.activeTab>) {
      state.activeTab = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(makeChatCompletionRequest.fulfilled, (state, action) => {
      state.messages.push(action.payload)
      state.isLoading = false
      setTimeout(scrollToBottom, 100)
    })

    builder.addCase(makeChatCompletionRequest.rejected, (state, action) => {
      state.isLoading = false
      state.messages.push({
        role: "assistant",
        content: `Sorry, there was an error: ${action.error.message}`,
      })
    })
  },
})

export default chatSlice.reducer
