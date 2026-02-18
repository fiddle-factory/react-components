import type { ComponentProps, JSX } from "react"
import styles from "./label.module.css"

export interface LabelProps extends ComponentProps<"label"> {}

export function Label(props: LabelProps): JSX.Element {
  const { className: customClassName = "", ...rest } = props

  const combinedClassName = `
    ${LABEL_CLASS_NAME.BASE}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  return (
    <label
      className={combinedClassName}
      {...rest}
    />
  )
}

export const LABEL_CLASS_NAME = {
  BASE: styles.label,
} as const
