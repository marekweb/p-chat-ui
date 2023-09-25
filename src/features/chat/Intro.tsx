import { useAppDispatch } from "../../app/hooks"
import { Card } from "../../components/Card"
import { chatSlice } from "./chatSlice"

export const Intro = () => {
  const dispatch = useAppDispatch()

  return (
    <Card>
      <h1 className="font-bold text-lg"></h1>
      <p>
        Welcome to Chat UI. To get started, enter your OpenAI API key in the{" "}
        <button
          className="text-blue-500 underline"
          onClick={() => dispatch(chatSlice.actions.setActiveTab("settings"))}
        >
          Settings.
        </button>
      </p>
      <p>Start a new conversation by sending a message below.</p>
    </Card>
  )
}
