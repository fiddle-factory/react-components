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
  const [hoverScale, setHoverScale] = useState(1.05)
  const [hoverBrightness, setHoverBrightness] = useState(1.1)
  const [transitionDuration, setTransitionDuration] = useState(0.2)
  const [shadowIntensity, setShadowIntensity] = useState(0.3)
  
  // Listen for animation configuration updates
  useEffect(() => {
    const element = buttonRef.current
    if (!element) return
    
    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.hoverScale !== undefined) setHoverScale(params.hoverScale)
      if (params.hoverBrightness !== undefined) setHoverBrightness(params.hoverBrightness)
      if (params.transitionDuration !== undefined) setTransitionDuration(params.transitionDuration)
      if (params.shadowIntensity !== undefined) setShadowIntensity(params.shadowIntensity)
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
    <button
      ref={buttonRef}
      data-config-id="button-hover-animation"
      aria-pressed={isActive}
      className={combinedClassName}
      disabled={isDisabled || isLoading}
      type={type}
      style={{
        transition: `transform ${transitionDuration}s ease, filter ${transitionDuration}s ease, box-shadow ${transitionDuration}s ease`,
        transform: 'scale(1)',
      }}
      onMouseEnter={(e) => {
        if (!isDisabled && !isLoading) {
          const target = e.currentTarget as HTMLButtonElement
          target.style.transform = `scale(${hoverScale})`
          target.style.filter = `brightness(${hoverBrightness})`
          target.style.boxShadow = `0 8px 16px rgba(0, 0, 0, ${shadowIntensity})`
        }
        rest.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        if (!isDisabled && !isLoading) {
          const target = e.currentTarget as HTMLButtonElement
          target.style.transform = 'scale(1)'
          target.style.filter = 'brightness(1)'
          target.style.boxShadow = ''
        }
        rest.onMouseLeave?.(e)
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


