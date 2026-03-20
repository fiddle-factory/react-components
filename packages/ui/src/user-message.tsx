import type { JSX } from "react"
import styles from "@/user-message.module.css"

export interface UserMessageProps {
  className?: string
  message: string
  timestamp: Date | string
  userName: string
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
}

function formatTimestamp(timestamp: Date | string): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
}

export function UserMessage(props: UserMessageProps): JSX.Element {
  const { className: customClassName = "", message, timestamp, userName } = props

  const initials = getInitials(userName)

  const combinedClassName = `
    ${USER_MESSAGE_CLASS_NAME.BASE}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  return (
    <div className={combinedClassName}>
      <div
        aria-hidden="true"
        className={USER_MESSAGE_CLASS_NAME.AVATAR}
        title={userName}
      >
        {initials}
      </div>
      <div className={USER_MESSAGE_CLASS_NAME.CONTENT}>
        <div className={USER_MESSAGE_CLASS_NAME.HEADER}>
          <span className={USER_MESSAGE_CLASS_NAME.NAME}>{userName}</span>
          <time
            className={USER_MESSAGE_CLASS_NAME.TIMESTAMP}
            dateTime={
              typeof timestamp === "string" ? timestamp : timestamp.toISOString()
            }
          >
            {formatTimestamp(timestamp)}
          </time>
        </div>
        <p className={USER_MESSAGE_CLASS_NAME.MESSAGE}>{message}</p>
      </div>
    </div>
  )
}

export const USER_MESSAGE_CLASS_NAME = {
  AVATAR: styles.user_message__avatar,
  BASE: styles.user_message,
  CONTENT: styles.user_message__content,
  HEADER: styles.user_message__header,
  MESSAGE: styles.user_message__message,
  NAME: styles.user_message__name,
  TIMESTAMP: styles.user_message__timestamp,
} as const

