import type { ComponentProps, JSX } from "react"
import styles from "@/user-message.module.css"

export interface UserMessageProps extends Omit<ComponentProps<"div">, "children"> {
  avatarAlt?: string
  avatarSrc?: string
  isRead?: boolean
  message: string
  timestamp?: string
  username?: string
}

export function UserMessage(props: UserMessageProps): JSX.Element {
  const {
    avatarAlt = "",
    avatarSrc = "",
    className: customClassName = "",
    isRead = false,
    message,
    timestamp = "",
    username = "",
    ...rest
  } = props

  const combinedClassName = `
    ${USER_MESSAGE_CLASS_NAME.BASE}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  const initials = username
    ? username
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U"

  return (
    <div
      className={combinedClassName}
      data-element="user-message"
      {...rest}
    >
      <div className={USER_MESSAGE_CLASS_NAME.AVATAR_WRAPPER}>
        {avatarSrc ? (
          <img
            alt={avatarAlt || username || "User avatar"}
            className={USER_MESSAGE_CLASS_NAME.AVATAR_IMAGE}
            src={avatarSrc}
          />
        ) : (
          <span className={USER_MESSAGE_CLASS_NAME.AVATAR_FALLBACK}>{initials}</span>
        )}
      </div>

      <div className={USER_MESSAGE_CLASS_NAME.CONTENT}>
        {username && (
          <div className={USER_MESSAGE_CLASS_NAME.HEADER}>
            <span className={USER_MESSAGE_CLASS_NAME.USERNAME}>{username}</span>
            {timestamp && (
              <time
                className={USER_MESSAGE_CLASS_NAME.TIMESTAMP}
                dateTime={timestamp}
              >
                {timestamp}
              </time>
            )}
          </div>
        )}

        <div className={USER_MESSAGE_CLASS_NAME.BUBBLE}>
          <p className={USER_MESSAGE_CLASS_NAME.TEXT}>{message}</p>
        </div>

        {!username && timestamp && (
          <time
            className={USER_MESSAGE_CLASS_NAME.TIMESTAMP}
            dateTime={timestamp}
          >
            {timestamp}
          </time>
        )}

        {isRead && (
          <span
            aria-label="Read"
            className={USER_MESSAGE_CLASS_NAME.READ_RECEIPT}
          >
            ✓✓
          </span>
        )}
      </div>
    </div>
  )
}

export const USER_MESSAGE_CLASS_NAME = {
  AVATAR_FALLBACK: styles.user_message__avatar_fallback,
  AVATAR_IMAGE: styles.user_message__avatar_image,
  AVATAR_WRAPPER: styles.user_message__avatar_wrapper,
  BASE: styles.user_message,
  BUBBLE: styles.user_message__bubble,
  CONTENT: styles.user_message__content,
  HEADER: styles.user_message__header,
  READ_RECEIPT: styles.user_message__read_receipt,
  TEXT: styles.user_message__text,
  TIMESTAMP: styles.user_message__timestamp,
  USERNAME: styles.user_message__username,
} as const

