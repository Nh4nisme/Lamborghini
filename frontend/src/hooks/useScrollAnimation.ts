import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollAnimationOptions {
  trigger?: string
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  toggleActions?: string
  once?: boolean
}

export function useScrollAnimation<T extends HTMLElement>(
  animationFn: (element: T) => gsap.core.Timeline | gsap.core.Tween | void,
  options: ScrollAnimationOptions = {}
) {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const animation = animationFn(element)
      
      if (animation) {
        ScrollTrigger.create({
          trigger: options.trigger || element,
          start: options.start || 'top 80%',
          end: options.end,
          scrub: options.scrub,
          markers: options.markers || false,
          toggleActions: options.toggleActions || 'play none none none',
          once: options.once !== false,
          animation: animation as gsap.core.Animation,
        })
      }
    }, element)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element || trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [animationFn, options])

  return elementRef
}

// Helper hook for staggered animations
export function useStaggerAnimation<T extends HTMLElement>(
  selector: string,
  options: ScrollAnimationOptions = {}
) {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const elements = container.querySelectorAll(selector)
    if (elements.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: options.start || 'top 80%',
            toggleActions: options.toggleActions || 'play none none none',
            once: options.once !== false,
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [selector, options])

  return containerRef
}
