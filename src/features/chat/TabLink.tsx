import { useCallback } from "react"
import { ChatState, chatSlice } from "./chatSlice"
import { useAppDispatch } from "../../app/hooks"
import classNames from "classnames"

interface TabLink {
  label: string
  tab: ChatState["activeTab"]
  activeTab: ChatState["activeTab"]
}

export const TabLink: React.FunctionComponent<TabLink> = ({
  label,
  tab,
  activeTab,
}) => {
  const dispatch = useAppDispatch()

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      dispatch(chatSlice.actions.setActiveTab(tab))
    },
    [dispatch, tab],
  )
  const className = classNames("mr-4 text-blue-500 hover:underline", {
    underline: activeTab === tab,
  })

  return (
    <button className={className} onClick={handleClick}>
      {label}
    </button>
  )
}
