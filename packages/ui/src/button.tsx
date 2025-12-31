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
  
  // Animation configuration state
  const [textColorStart, setTextColorStart] = useState("#ffffff")
  const [textColorEnd, setTextColorEnd] = useState("#a0a0a0")
  const [animationDuration, setAnimationDuration] = useState(2)
  const [animationEnabled, setAnimationEnabled] = useState(true)
  
  // Listen for animation configuration updates
  useEffect(() => {
    const element = buttonRef.current
    if (!element) return
    
    const handleAnimationUpdate = (event: Event) => {
      const customEvent = event as CustomEvent
      const params = customEvent.detail
      if (params.textColorStart !== undefined) setTextColorStart(params.textColorStart)
      if (params.textColorEnd !== undefined) setTextColorEnd(params.textColorEnd)
      if (params.animationDuration !== undefined) setAnimationDuration(params.animationDuration)
      if (params.animationEnabled !== undefined) setAnimationEnabled(params.animationEnabled)
    }
    
    element.addEventListener('animation:update', handleAnimationUpdate)
    return () => element.removeEventListener('animation:update', handleAnimationUpdate)
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

  // Generate unique animation name
  const animationName = `textColorAnimation_${Math.random().toString(36).substr(2, 9)}`
  
  // Create keyframes dynamically
  const keyframes = animationEnabled ? `
    @keyframes ${animationName} {
      0%, 100% { color: ${textColorStart}; }
      50% { color: ${textColorEnd}; }
    }
  ` : ''

  return (
    <>
      {animationEnabled && <style>{keyframes}</style>}
      <button
        ref={buttonRef}
        data-config-id="button-text-color-animation"
        aria-pressed={isActive}
        className={combinedClassName}
        disabled={isDisabled || isLoading}
        type={type}
        style={animationEnabled ? {
          animation: `${animationName} ${animationDuration}s ease-in-out infinite`,
        } : undefined}
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


