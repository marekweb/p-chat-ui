import { Button } from "../../components/Button"
import { TextArea } from "../../components/TextArea"

interface ChatInputProps {
  value: string
  onChange: (text: string) => void
  onSend: () => void
  disabled?: boolean
}
export const ChatInput: React.FunctionComponent<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  disabled = false,
}) => (
  <div>
    <TextArea
      disabled={disabled}
      value={value}
      onChange={(value) => onChange(value)}
      onEnter={onSend}
    />
    <Button disabled={disabled} onClick={onSend}>
      Send
    </Button>
  </div>
)
