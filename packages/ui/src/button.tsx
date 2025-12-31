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
  const [textColor1, setTextColor1] = useState("#ffffff")
  const [textColor2, setTextColor2] = useState("#a0d8ff")
  const [animationSpeed, setAnimationSpeed] = useState(3)
  const [enableAnimation, setEnableAnimation] = useState(true)
  const [glowColor, setGlowColor] = useState("#3b82f6")
  const [glowSize, setGlowSize] = useState(8)
  const [glowIntensity, setGlowIntensity] = useState(0.6)
  const [enableGlow, setEnableGlow] = useState(true)

  // Listen for animation configuration updates
  useEffect(() => {
    const element = buttonRef.current
    if (!element) return

    const handleAnimationUpdate = (event: Event) => {
      const customEvent = event as CustomEvent
      const params = customEvent.detail
      if (params.textColor1 !== undefined) setTextColor1(params.textColor1)
      if (params.textColor2 !== undefined) setTextColor2(params.textColor2)
      if (params.animationSpeed !== undefined) setAnimationSpeed(params.animationSpeed)
      if (params.enableAnimation !== undefined) setEnableAnimation(params.enableAnimation)
      if (params.glowColor !== undefined) setGlowColor(params.glowColor)
      if (params.glowSize !== undefined) setGlowSize(params.glowSize)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.enableGlow !== undefined) setEnableGlow(params.enableGlow)
    }

    element.addEventListener("animation:update", handleAnimationUpdate)
    return () => element.removeEventListener("animation:update", handleAnimationUpdate)
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

  // Generate unique keyframe animation names
  const textAnimationName = `textColorChange-${Math.random().toString(36).substr(2, 9)}`
  const glowAnimationName = `borderGlow-${Math.random().toString(36).substr(2, 9)}`

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <>
      <style>
        {enableAnimation && `
          @keyframes ${textAnimationName} {
            0%, 100% {
              color: ${textColor1};
            }
            50% {
              color: ${textColor2};
            }
          }
        `}
        {enableGlow && `
          @keyframes ${glowAnimationName} {
            0%, 100% {
              box-shadow: 0 0 ${glowSize}px ${hexToRgba(glowColor, glowIntensity * 0.5)},
                          0 0 ${glowSize * 2}px ${hexToRgba(glowColor, glowIntensity * 0.3)},
                          inset 0 0 ${glowSize}px ${hexToRgba(glowColor, glowIntensity * 0.2)};
            }
            50% {
              box-shadow: 0 0 ${glowSize * 1.5}px ${hexToRgba(glowColor, glowIntensity * 0.8)},
                          0 0 ${glowSize * 3}px ${hexToRgba(glowColor, glowIntensity * 0.5)},
                          inset 0 0 ${glowSize * 1.5}px ${hexToRgba(glowColor, glowIntensity * 0.3)};
            }
          }
        `}
      </style>
      <button
        ref={buttonRef}
        data-config-id="button-text-color-animation"
        aria-pressed={isActive}
        className={combinedClassName}
        disabled={isDisabled || isLoading}
        type={type}
        style={{
          ...(enableAnimation && {
            animation: `${textAnimationName} ${animationSpeed}s ease-in-out infinite${enableGlow ? `, ${glowAnimationName} ${animationSpeed}s ease-in-out infinite` : ''}`,
          }),
          ...(enableGlow && !enableAnimation && {
            animation: `${glowAnimationName} ${animationSpeed}s ease-in-out infinite`,
          }),
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




