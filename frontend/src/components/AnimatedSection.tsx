import { type ReactNode } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  revealClip,
  imageReveal,
} from '../utils/animations'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'reveal' | 'imageReveal'
  delay?: number
  className?: string
  start?: string
  once?: boolean
}

export function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  className = '',
  start = 'top 80%',
  once = true,
}: AnimatedSectionProps) {
  const animationFunctions = {
    fadeUp: fadeInUp,
    fadeLeft: fadeInLeft,
    fadeRight: fadeInRight,
    scale: scaleIn,
    reveal: revealClip,
    imageReveal: imageReveal,
  }

  const ref = useScrollAnimation<HTMLDivElement>(
    (element) => {
      const anim = animationFunctions[animation](element)
      if (delay > 0 && anim) {
        anim.delay(delay)
      }
      return anim
    },
    { start, once }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
