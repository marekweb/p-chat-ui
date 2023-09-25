import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { TextArea } from "../../components/TextArea"
import { TextField } from "../../components/TextField"
import { chatSlice } from "./chatSlice"

export const Settings: React.FunctionComponent = () => {
  const apiKey = useAppSelector((state) => state.chat.apiKey)
  const systemPrompt = useAppSelector((state) => state.chat.systemPrompt)
  const dispatch = useAppDispatch()

  return (
    <div className="py-10">
      <h1 className="font-bold text-lg">Settings</h1>

      <TextField
        value={apiKey ?? ""}
        onChange={(value) => dispatch(chatSlice.actions.setApiKey(value))}
        label="API Key"
        type="password"
      />

      <TextArea
        value={systemPrompt}
        onChange={(value) => dispatch(chatSlice.actions.setSystemPrompt(value))}
        label="System Prompt"
      />
    </div>
  )
}
