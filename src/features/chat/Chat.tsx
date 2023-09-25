import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { chatSlice, makeChatCompletionRequest } from "./chatSlice"
import { Card } from "../../components/Card"
import { ChatInput } from "./ChatInput"
import { Button } from "../../components/Button"
import { Settings } from "./Settings"
import { ChatHistory } from "./ChatHIstory"
import { TabLink } from "./TabLink"

export const Chat = () => {
  const dispatch = useAppDispatch()
  const messages = useAppSelector((state) => state.chat.messages)
  const isLoading = useAppSelector((state) => state.chat.isLoading)
  const inputText = useAppSelector((state) => state.chat.inputText)
  const activeTab = useAppSelector((state) => state.chat.activeTab)

  const handleSend = useCallback(() => {
    if (inputText === "") {
      return
    }

    dispatch(
      makeChatCompletionRequest({
        role: "user",
        content: inputText,
      }),
    )
  }, [inputText, dispatch])

  const handleReset = useCallback(() => {
    dispatch(chatSlice.actions.newConversation())
  }, [dispatch])

  return (
    <div className="static">
      <ChatHistory messages={messages} isLoading={isLoading} />
      <div className="fixed bottom-0 left-0 right-0">
        <Card>
          <div>
            <TabLink label="Chat" tab="chat" activeTab={activeTab} />
            <TabLink label="Settings" tab="settings" activeTab={activeTab} />
          </div>

          {activeTab === "chat" && (
            <>
              <ChatInput
                disabled={isLoading}
                value={inputText}
                onChange={(value) =>
                  dispatch(chatSlice.actions.updateInputText(value))
                }
                onSend={handleSend}
              />
              <Button
                onClick={handleReset}
                disabled={isLoading}
                type="secondary"
              >
                New Conversation
              </Button>
            </>
          )}

          {activeTab === "settings" && <Settings />}
        </Card>
      </div>
    </div>
  )
}
