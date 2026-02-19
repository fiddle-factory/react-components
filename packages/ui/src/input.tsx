import type { ComponentProps, JSX } from "react"
import styles from "@/input.module.css"

export interface InputProps
  extends Omit<ComponentProps<"input">, "aria-pressed" | "disabled" | "readOnly" | "required"> {
  isActive?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  size?: 32 | 36 | 40 | 44
}

export function Input(props: InputProps): JSX.Element {
  const {
    className: customClassName = "",
    isActive = false,
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    size = 40,
    type = "text",
    ...rest
  } = props

  const isPassword = type === "password"

  const combinedClassName = `
    ${INPUT_CLASS_NAME.BASE}
    ${INPUT_CLASS_NAME.SIZE[size]}
    ${isPassword ? INPUT_CLASS_NAME.PASSWORD : ""}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  return (
    <input
      aria-pressed={isActive}
      className={combinedClassName}
      disabled={isDisabled}
      readOnly={isReadOnly}
      required={isRequired}
      type={type}
      {...rest}
    />
  )
}

export const INPUT_CLASS_NAME = {
  BASE: styles.input,
  PASSWORD: styles.input__password,
  SIZE: {
    32: styles.input__size_32,
    36: styles.input__size_36,
    40: styles.input__size_40,
    44: styles.input__size_44,
  },
} as const
