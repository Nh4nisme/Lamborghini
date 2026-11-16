import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [frame, setFrame] = useState(0)
  
  // Animation sequence: Dim -> Rising -> Flash -> Falling -> Dim -> Off -> loop
  const frames = [
    '/Images/Logo/Lamborghini blink/01 — Dim.png',
    '/Images/Logo/Lamborghini blink/02 — Rising.png',
    '/Images/Logo/Lamborghini blink/03 — Flash.png',
    '/Images/Logo/Lamborghini blink/04 — Falling.png',
    '/Images/Logo/Lamborghini blink/05 — Dim.png',
    '/Images/Logo/Lamborghini blink/06 — Off.png',
  ]

  useEffect(() => {
    // Cycle through frames: slower for dim/off, faster for flash
    const intervals = [400, 150, 100, 150, 400, 300] // ms per frame
    
    const timer = setTimeout(() => {
      setFrame((prev) => (prev + 1) % frames.length)
    }, intervals[frame])

    return () => clearTimeout(timer)
  }, [frame, frames.length])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
        <img
          src={frames[frame]}
          alt="Lamborghini Loading"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}
