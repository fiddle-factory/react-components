import { useEffect, useState } from "react"
import styles from "@/fireworks.module.css"

interface FireworksOverlayProps {
  onClose: () => void
}

export function FireworksOverlay({ onClose }: FireworksOverlayProps) {
  const [fireworkPositions, setFireworkPositions] = useState<Array<{ left: string; top: string }>>([])

  useEffect(() => {
    // Generate random positions for fireworks
    const positions = Array.from({ length: 8 }, () => ({
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`,
    }))
    setFireworkPositions(positions)

    const timer = setTimeout(() => {
      onClose()
    }, 10000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={styles.overlay}>
      <div className={styles.fireworks}>
        {fireworkPositions.map((position, index) => (
          <div
            key={index}
            className={styles.fireworksContainer}
            style={{
              left: position.left,
              top: position.top,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className={styles.firework} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

