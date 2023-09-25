import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { RootState, store } from "./app/store"
import App from "./App"
import { configureStore } from "@reduxjs/toolkit"
import chatReducer, {
  chatSlice,
  initialState,
  makeChatCompletionRequest,
} from "./features/chat/chatSlice"
import { config } from "dotenv"
config()

test("Renders the intro text", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(getByText(/Welcome to Chat UI/i)).toBeInTheDocument()
})

test("Render error about API key", async () => {
  const rootInitialState: RootState = {
    chat: { ...initialState, apiMode: "mock" },
  }

  const store = configureStore({
    reducer: {
      chat: chatReducer,
    },
    preloadedState: rootInitialState,
  })

  await store.dispatch(
    makeChatCompletionRequest({ role: "user", content: "Hello" }),
  )

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(getByText(/API key is not set/i)).toBeInTheDocument()
})

test("Render a message and a reply in mock API mode", async () => {
  const rootInitialState: RootState = {
    chat: { ...initialState, apiMode: "mock", apiKey: "abc123" },
  }

  const store = configureStore({
    reducer: {
      chat: chatReducer,
    },
    preloadedState: rootInitialState,
  })

  await store.dispatch(
    makeChatCompletionRequest({ role: "user", content: "Hello" }),
  )

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(getByText(/I am an assistant/i)).toBeInTheDocument()
})

test("Render a message and a reply in real API mode", async () => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.log("Set OPENAI_API_KEY environment variable to run E2E test")
    return
  }

  store.dispatch(chatSlice.actions.setApiKey(apiKey))
  await store.dispatch(
    makeChatCompletionRequest({ role: "user", content: "Hello" }),
  )

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(getByText(/Assistant:/i)).toBeInTheDocument()
})
