'use client'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

function ConfettiEffect() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    setShowConfetti(true)
    return () => setShowConfetti(false)
  }, [])

  return showConfetti ? (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      colors={[
        '#ffc862',
        '#a152d2',
        '#2f7bfc',
        '#f93c6b',
        '#dbeafe',
        '#000',
        '#f00'
      ]}
    />
  ) : null
}

export default ConfettiEffect
