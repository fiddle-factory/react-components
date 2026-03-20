import type { ComponentProps, JSX, KeyboardEvent } from "react"
import { useRef, useState } from "react"
import styles from "@/chat-panel.module.css"
import { Button } from "@/button"
import { Input } from "@/input"
import { UserMessage } from "@/user-message"

export interface ChatPanelMessage {
  avatarSrc?: string
  id: string
  isRead?: boolean
  message: string
  timestamp?: string
  username?: string
}

export interface ChatPanelProps extends Omit<ComponentProps<"div">, "children"> {
  initialMessages?: ChatPanelMessage[]
  onSendMessage?: (message: string) => void
  placeholder?: string
  title?: string
}

export function ChatPanel(props: ChatPanelProps): JSX.Element {
  const {
    className: customClassName = "",
    initialMessages = [],
    onSendMessage,
    placeholder = "Type a message...",
    title = "Chat",
    ...rest
  } = props

  const [messages, setMessages] = useState<ChatPanelMessage[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const combinedClassName = `
    ${CHAT_PANEL_CLASS_NAME.BASE}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  const handleSend = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return

    const newMessage: ChatPanelMessage = {
      id: `msg-${Date.now()}`,
      message: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    onSendMessage?.(trimmed)

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 0)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={combinedClassName}
      data-element="chat-panel"
      {...rest}
    >
      <div className={CHAT_PANEL_CLASS_NAME.HEADER}>
        <span className={CHAT_PANEL_CLASS_NAME.TITLE}>{title}</span>
      </div>

      <div className={CHAT_PANEL_CLASS_NAME.MESSAGES}>
        {messages.map((msg) => (
          <UserMessage
            avatarSrc={msg.avatarSrc}
            isRead={msg.isRead}
            key={msg.id}
            message={msg.message}
            timestamp={msg.timestamp}
            username={msg.username}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={CHAT_PANEL_CLASS_NAME.INPUT_AREA}>
        <Input
          className={CHAT_PANEL_CLASS_NAME.INPUT}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={inputValue}
        />
        <Button
          isDisabled={!inputValue.trim()}
          onClick={handleSend}
          size={40}
          variant="primary"
        >
          Send
        </Button>
      </div>
    </div>
  )
}

export const CHAT_PANEL_CLASS_NAME = {
  BASE: styles.chat_panel,
  HEADER: styles.chat_panel__header,
  INPUT: styles.chat_panel__input,
  INPUT_AREA: styles.chat_panel__input_area,
  MESSAGES: styles.chat_panel__messages,
  TITLE: styles.chat_panel__title,
} as const

