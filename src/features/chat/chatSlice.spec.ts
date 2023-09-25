import { ChatMessage } from "../../completion/ChatMessage"
import chatReducer, { chatSlice, initialState } from "./chatSlice"

describe("chat reducer", () => {
  it("should handle initial state", () => {
    expect(chatReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should handle setApiKey", () => {
    const actual = chatReducer(
      initialState,
      chatSlice.actions.setApiKey("abc123"),
    )
    expect(actual.apiKey).toEqual("abc123")
  })

  it("should handle addMessage", () => {
    const message: ChatMessage = {
      role: "system",
      content: "test message",
    }
    const expectedState = {
      ...initialState,
      messages: [...initialState.messages, message],
    }
    const actual = chatReducer(
      initialState,
      chatSlice.actions.addMessage(message),
    )
    expect(actual).toEqual(expectedState)
  })

  it("should handle newConversation", () => {
    const actual = chatReducer(
      initialState,
      chatSlice.actions.newConversation(),
    )
    expect(actual.messages.length).toEqual(0)
  })

  it("should handle setSystemPrompt", () => {
    const actual = chatReducer(
      initialState,
      chatSlice.actions.setSystemPrompt("new prompt"),
    )
    expect(actual.systemPrompt).toEqual("new prompt")
  })
})

import { configureStore } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import reducer, { makeChatCompletionRequest } from "./chatSlice"

describe("async thunk tests", () => {
  it("makeChatCompletionRequest adds a message when in mock mode", async () => {
    // Set the apiMode to "mock"
    const mockState: RootState = {
      chat: {
        ...initialState,
        apiMode: "mock",
      },
    }

    const store = configureStore({
      reducer: { chat: reducer },
      preloadedState: mockState,
    })

    const message: ChatMessage = {
      role: "user",
      content: "test message",
    }

    // Dispatch the async thunk
    await store.dispatch(makeChatCompletionRequest(message))

    // Check that a chat message was added
    const chatState = store.getState().chat

    // We expect 3 messages: the system prompt, the user message, and the assistant reply
    expect(chatState.messages.length).toEqual(3)
    expect(chatState.messages[0]).toEqual({
      role: "system",
      content: initialState.systemPrompt,
    })
    expect(chatState.messages[1]).toEqual(message)
  })
})
