import { useEffect, useRef, useState, type ComponentProps, type JSX } from "react"
import styles from "@/label.module.css"

export interface LabelProps extends ComponentProps<"label"> {}

export function Label(props: LabelProps): JSX.Element {
  const { className: customClassName = "", children, ...rest } = props

  const labelRef = useRef<HTMLLabelElement>(null)
  
  // Animation configuration state
  const [borderColor, setBorderColor] = useState("#3b82f6")
  const [borderWidth, setBorderWidth] = useState(30)
  const [borderHeight, setBorderHeight] = useState(2)
  const [borderGap, setBorderGap] = useState(8)
  const [glowIntensity, setGlowIntensity] = useState(0.7)
  const [glowSpeed, setGlowSpeed] = useState(2.5)
  
  // Listen for animation configuration updates
  useEffect(() => {
    const element = labelRef.current
    if (!element) return
    
    const handleAnimationUpdate = (event: CustomEvent) => {
      const params = event.detail
      if (params.borderColor !== undefined) setBorderColor(params.borderColor)
      if (params.borderWidth !== undefined) setBorderWidth(params.borderWidth)
      if (params.borderHeight !== undefined) setBorderHeight(params.borderHeight)
      if (params.borderGap !== undefined) setBorderGap(params.borderGap)
      if (params.glowIntensity !== undefined) setGlowIntensity(params.glowIntensity)
      if (params.glowSpeed !== undefined) setGlowSpeed(params.glowSpeed)
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

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <>
      <label
        ref={labelRef}
        className={combinedClassName}
        data-config-id="label-border-glow"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: `${borderGap}px`,
          position: "relative"
        }}
        {...rest}
      >
        <span 
          className="label-border-left"
          style={{
            width: `${borderWidth}px`,
            height: `${borderHeight}px`,
            backgroundColor: borderColor,
            animation: `borderGlowPulse ${glowSpeed}s ease-in-out infinite`,
            boxShadow: `0 0 ${borderHeight * 3}px ${hexToRgba(borderColor, glowIntensity * 0.6)}, 0 0 ${borderHeight * 6}px ${hexToRgba(borderColor, glowIntensity * 0.3)}`
          }}
        />
        <span>{children}</span>
        <span 
          className="label-border-right"
          style={{
            width: `${borderWidth}px`,
            height: `${borderHeight}px`,
            backgroundColor: borderColor,
            animation: `borderGlowPulse ${glowSpeed}s ease-in-out infinite`,
            boxShadow: `0 0 ${borderHeight * 3}px ${hexToRgba(borderColor, glowIntensity * 0.6)}, 0 0 ${borderHeight * 6}px ${hexToRgba(borderColor, glowIntensity * 0.3)}`
          }}
        />
      </label>
      <style>{`
        @keyframes borderGlowPulse {
          0%, 100% {
            opacity: 0.6;
            box-shadow: 0 0 ${borderHeight * 3}px ${hexToRgba(borderColor, glowIntensity * 0.4)}, 0 0 ${borderHeight * 6}px ${hexToRgba(borderColor, glowIntensity * 0.2)};
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 ${borderHeight * 5}px ${hexToRgba(borderColor, glowIntensity * 0.8)}, 0 0 ${borderHeight * 10}px ${hexToRgba(borderColor, glowIntensity * 0.5)}, 0 0 ${borderHeight * 15}px ${hexToRgba(borderColor, glowIntensity * 0.3)};
          }
        }
      `}</style>
    </>
  )
}

export const LABEL_CLASS_NAME = {
  BASE: styles.label,
} as const


