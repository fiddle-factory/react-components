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

  // Animation state
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [glowColor, setGlowColor] = useState("#ff6b35")
  const [glowIntensity, setGlowIntensity] = useState(20)
  const [glowSpeed, setGlowSpeed] = useState(2)
  const [glowSpread, setGlowSpread] = useState(8)

  // Listen for animation updates
  useEffect(() => {
    const element = buttonRef.current
    if (!element) return

    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.glowColor !== undefined) setGlowColor(params.glowColor)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.glowSpeed !== undefined) setGlowSpeed(params.glowSpeed)
      if (params.glowSpread !== undefined) setGlowSpread(params.glowSpread)
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

  // Create dynamic keyframes
  useEffect(() => {
    const styleId = 'button-glow-animation'
    let styleElement = document.getElementById(styleId) as HTMLStyleElement
    
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = `
      @keyframes buttonGlowPulse {
        0%, 100% {
          box-shadow: 0 0 ${glowSpread}px ${glowColor}${Math.round(glowIntensity * 2.55).toString(16).padStart(2, '0')},
                      0 0 ${glowSpread * 2}px ${glowColor}${Math.round(glowIntensity * 1.5).toString(16).padStart(2, '0')},
                      0 0 ${glowSpread * 3}px ${glowColor}${Math.round(glowIntensity * 0.8).toString(16).padStart(2, '0')};
        }
        50% {
          box-shadow: 0 0 ${glowSpread * 1.5}px ${glowColor}${Math.round(glowIntensity * 3).toString(16).padStart(2, '0')},
                      0 0 ${glowSpread * 3}px ${glowColor}${Math.round(glowIntensity * 2.2).toString(16).padStart(2, '0')},
                      0 0 ${glowSpread * 4.5}px ${glowColor}${Math.round(glowIntensity * 1.2).toString(16).padStart(2, '0')};
        }
      }
    `
  }, [glowColor, glowIntensity, glowSpread])

  return (
    <button
      ref={buttonRef}
      data-config-id="button-glow-animation"
      aria-pressed={isActive}
      className={combinedClassName}
      disabled={isDisabled || isLoading}
      type={type}
      style={{
        animation: `buttonGlowPulse ${glowSpeed}s ease-in-out infinite`,
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


