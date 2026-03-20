import type { ComponentProps, JSX } from "react"
import styles from "@/user-message.module.css"

export type MessageStatus = "delivered" | "read" | "sent"

export interface UserMessageProps extends Omit<ComponentProps<"div">, "children"> {
  avatarFallback?: string
  avatarSrc?: string
  content: string
  isSelf?: boolean
  status?: MessageStatus
  timestamp: string
  userName: string
}

export function UserMessage(props: UserMessageProps): JSX.Element {
  const {
    avatarFallback = "",
    avatarSrc = "",
    className: customClassName = "",
    content,
    isSelf = false,
    status = "sent",
    timestamp,
    userName,
    ...rest
  } = props

  const combinedClassName = `
    ${USER_MESSAGE_CLASS_NAME.BASE}
    ${isSelf ? USER_MESSAGE_CLASS_NAME.SELF : USER_MESSAGE_CLASS_NAME.OTHER}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  return (
    <div
      className={combinedClassName}
      {...rest}
    >
      {!isSelf && (
        <div
          aria-hidden="true"
          className={USER_MESSAGE_CLASS_NAME.AVATAR}
        >
          {avatarSrc ? (
            <img
              alt={userName}
              className={USER_MESSAGE_CLASS_NAME.AVATAR_IMAGE}
              src={avatarSrc}
            />
          ) : (
            <span className={USER_MESSAGE_CLASS_NAME.AVATAR_FALLBACK}>
              {avatarFallback || userName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      )}

      <div className={USER_MESSAGE_CLASS_NAME.BODY}>
        {!isSelf && (
          <span className={USER_MESSAGE_CLASS_NAME.USER_NAME}>{userName}</span>
        )}

        <div className={USER_MESSAGE_CLASS_NAME.BUBBLE}>
          <p className={USER_MESSAGE_CLASS_NAME.CONTENT}>{content}</p>
        </div>

        <div className={USER_MESSAGE_CLASS_NAME.META}>
          <time
            className={USER_MESSAGE_CLASS_NAME.TIMESTAMP}
            dateTime={timestamp}
          >
            {timestamp}
          </time>

          {isSelf && (
            <span
              aria-label={`Message ${status}`}
              className={`${USER_MESSAGE_CLASS_NAME.STATUS_BASE} ${USER_MESSAGE_CLASS_NAME.STATUS[status.toUpperCase() as keyof typeof USER_MESSAGE_CLASS_NAME.STATUS]}`}
              role="img"
            >
              {STATUS_ICON[status]}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const STATUS_ICON: Record<MessageStatus, string> = {
  delivered: "✓✓",
  read: "✓✓",
  sent: "✓",
}

export const USER_MESSAGE_CLASS_NAME = {
  BASE: styles.user_message,
  SELF: styles.user_message__self,
  OTHER: styles.user_message__other,
  AVATAR: styles.user_message__avatar,
  AVATAR_FALLBACK: styles.user_message__avatar_fallback,
  AVATAR_IMAGE: styles.user_message__avatar_image,
  BODY: styles.user_message__body,
  BUBBLE: styles.user_message__bubble,
  CONTENT: styles.user_message__content,
  META: styles.user_message__meta,
  STATUS_BASE: styles.user_message__status,
  STATUS: {
    SENT: styles.user_message__status_sent,
    DELIVERED: styles.user_message__status_delivered,
    READ: styles.user_message__status_read,
  },
  TIMESTAMP: styles.user_message__timestamp,
  USER_NAME: styles.user_message__user_name,
} as const

