import { useEffect, useRef, useState, type ComponentProps, type JSX } from "react"
import styles from "@/label.module.css"

export interface LabelProps extends ComponentProps<"label"> {}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, '')
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
}

export function Label(props: LabelProps): JSX.Element {
  const { className: customClassName = "", ...rest } = props
  const labelRef = useRef<HTMLLabelElement>(null)

  // Animation configuration state
  const [glowColor, setGlowColor] = useState("#3b82f6")
  const [glowIntensity, setGlowIntensity] = useState(0.8)
  const [glowSpeed, setGlowSpeed] = useState(2)
  const [borderWidth, setBorderWidth] = useState(2)

  // Listen for animation configuration updates
  useEffect(() => {
    const element = labelRef.current
    if (!element) return

    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.glowColor !== undefined) setGlowColor(params.glowColor)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.glowSpeed !== undefined) setGlowSpeed(params.glowSpeed)
      if (params.borderWidth !== undefined) setBorderWidth(params.borderWidth)
    }

    element.addEventListener('animation:update', handleAnimationUpdate as EventListener)
    return () => element.removeEventListener('animation:update', handleAnimationUpdate as EventListener)
  }, [])

  const combinedClassName = `
    ${LABEL_CLASS_NAME.BASE}
    ${customClassName}
  `
    .replaceAll(/\s+/g, " ")
    .trim()

  // Create dynamic styles for glowing border animation
  const rgb = hexToRgb(glowColor)
  const glowStyle: React.CSSProperties = {
    border: `${borderWidth}px solid ${glowColor}`,
    borderRadius: '4px',
    padding: '8px 12px',
    boxShadow: `0 0 ${10 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity})`,
    animation: `glowPulse${glowSpeed}s ease-in-out infinite`,
  }

  // Inject keyframe animation dynamically
  useEffect(() => {
    const styleId = 'label-glow-animation'
    let styleEl = document.getElementById(styleId) as HTMLStyleElement
    
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = styleId
      document.head.appendChild(styleEl)
    }

    const rgb = hexToRgb(glowColor)
    styleEl.textContent = `
      @keyframes glowPulse {
        0%, 100% {
          box-shadow: 0 0 ${10 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity}),
                      0 0 ${20 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.6}),
                      inset 0 0 ${8 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.3});
        }
        50% {
          box-shadow: 0 0 ${20 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity}),
                      0 0 ${40 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.8}),
                      inset 0 0 ${15 * glowIntensity}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.5});
        }
      }
    `
  }, [glowColor, glowIntensity, glowSpeed])

  return (
    <label
      ref={labelRef}
      data-config-id="label-glow-border"
      className={combinedClassName}
      style={glowStyle}
      {...rest}
    />
  )
}

export const LABEL_CLASS_NAME = {
  BASE: styles.label,
} as const

