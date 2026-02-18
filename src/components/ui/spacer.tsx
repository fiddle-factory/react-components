import type { ComponentProps } from "react"
import styles from "./spacer.module.css"

export interface SpacerProps extends ComponentProps<"div"> {}

export function Spacer(props: SpacerProps) {
  const { className: customClassName = "", ...rest } = props

  const combinedClassName = `
    ${SPACER_CLASS_NAME.BASE}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  return (
    <div
      className={`${styles.spacer} ${combinedClassName}`.trim()}
      {...rest}
    />
  )
}

export const SPACER_CLASS_NAME = {
  BASE: styles.spacer,
} as const
