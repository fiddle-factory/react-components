import type { ComponentProps, JSX, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import styles from "@/button.module.css"
import { ButtonBackground } from "@/button-background"
import { ButtonSpinner } from "@/button-spinner"

export interface ButtonIconProps extends ButtonPropsInternal {
  children?: ReactNode
  iconEnd?: never
  iconOnly: true
  iconStart?: never
}

export interface ButtonProps extends ButtonPropsInternal {
  children?: string | string[]
  iconOnly?: false
}

interface ButtonPropsInternal extends Omit<ComponentProps<"button">, "aria-pressed" | "disabled"> {
  iconEnd?: ReactNode
  iconOnly?: boolean
  iconStart?: ReactNode
  isActive?: boolean
  isDisabled?: boolean
  isFullWidth?: boolean
  isLoading?: boolean
  isRounded?: boolean
  size?: 32 | 36 | 40 | 44 | 48
  variant?: "accent" | "ghost" | "primary" | "secondary"
}

type ButtonUnionProps = ButtonIconProps | ButtonProps

export function Button(props: ButtonUnionProps): JSX.Element {
  const {
    children = "",
    className: customClassName = "",
    iconEnd = "",
    iconOnly = false,
    iconStart = "",
    isActive = false,
    isDisabled = false,
    isFullWidth = false,
    isLoading = false,
    isRounded = false,
    size = 40,
    type = "button",
    variant = "primary",
    ...rest
  } = props

  const buttonRef = useRef<HTMLButtonElement>(null)
  const [glowColor, setGlowColor] = useState("#ff0000")
  const [glowIntensity, setGlowIntensity] = useState(0.8)
  const [glowSize, setGlowSize] = useState(20)
  const [glowSpeed, setGlowSpeed] = useState(2)

  useEffect(() => {
    const element = buttonRef.current
    if (!element) return

    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.glowColor !== undefined) setGlowColor(params.glowColor)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.glowSize !== undefined) setGlowSize(params.glowSize)
      if (params.glowSpeed !== undefined) setGlowSpeed(params.glowSpeed)
    }

    element.addEventListener('animation:update', handleAnimationUpdate as EventListener)
    return () => element.removeEventListener('animation:update', handleAnimationUpdate as EventListener)
  }, [])

  const combinedClassName = `
    ${BUTTON_CLASS_NAME.BASE}
    ${BUTTON_CLASS_NAME.SIZE[size]}
    ${BUTTON_CLASS_NAME.VARIANT[variant.toUpperCase() as keyof typeof BUTTON_CLASS_NAME.VARIANT]}
    ${isFullWidth ? BUTTON_CLASS_NAME.WIDTH.FULL : BUTTON_CLASS_NAME.WIDTH.BASE}
    ${iconOnly ? BUTTON_CLASS_NAME.ICON_ONLY : ""}
    ${isRounded ? BUTTON_CLASS_NAME.ROUNDED.FULL : BUTTON_CLASS_NAME.ROUNDED.BASE}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  return (
    <>
      <button
        ref={buttonRef}
        aria-pressed={isActive}
        className={combinedClassName}
        disabled={isDisabled || isLoading}
        type={type}
        data-config-id="storybook-root"
        style={{
          animation: `glow-pulse ${glowSpeed}s ease-in-out infinite`,
          boxShadow: `0 0 ${glowSize}px ${glowColor}`,
        }}
        {...rest}
      >
        <ButtonBackground
          isRounded={isRounded}
          variant={variant}
        />
        {isLoading && <ButtonSpinner />}
        {!isLoading && iconStart}
        {iconOnly ? isLoading ? <></> : children : <span>{children}</span>}
        {!isLoading && iconEnd}
      </button>
      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 ${glowSize * 0.5}px ${glowColor}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')});
          }
          50% {
            filter: drop-shadow(0 0 ${glowSize}px ${glowColor}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')});
          }
        }
      `}</style>
    </>
  )
}

export const BUTTON_CLASS_NAME = {
  BASE: styles.button,
  ICON_ONLY: styles.button__icon_only,
  ROUNDED: {
    BASE: styles.button__rounded_base,
    FULL: styles.button__rounded_full,
  },
  SIZE: {
    32: styles.button__size_32,
    36: styles.button__size_36,
    40: styles.button__size_40,
    44: styles.button__size_44,
    48: styles.button__size_48,
  },
  VARIANT: {
    ACCENT: styles.button__variant_accent,
    GHOST: styles.button__variant_ghost,
    PRIMARY: styles.button__variant_primary,
    SECONDARY: styles.button__variant_secondary,
  },
  WIDTH: {
    BASE: styles.button__width_base,
    FULL: styles.button__width_full,
  },
} as const



