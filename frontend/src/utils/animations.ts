import { gsap } from 'gsap'

// Common animation configurations
export const animationConfig = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
  },
  ease: {
    smooth: 'power2.out',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'back.out(1.7)',
  },
  stagger: {
    fast: 0.1,
    normal: 0.15,
    slow: 0.2,
  },
}

// Fade in from bottom
export const fadeInUp = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    }
  )
}

// Fade in from left
export const fadeInLeft = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -50,
    },
    {
      opacity: 1,
      x: 0,
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    }
  )
}

// Fade in from right
export const fadeInRight = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: 50,
    },
    {
      opacity: 1,
      x: 0,
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
    }
  )
}

// Scale in
export const scaleIn = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.bounce,
    }
  )
}

// Reveal from clip-path
export const revealClip = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    {
      clipPath: 'inset(0 100% 0 0)',
    },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: animationConfig.duration.slow,
      ease: animationConfig.ease.smooth,
    }
  )
}

// Parallax effect
export const parallax = (element: HTMLElement, speed: number = 0.5) => {
  return gsap.to(element, {
    y: () => element.offsetHeight * speed,
    ease: 'none',
  })
}

// Counter animation
export const animateCounter = (
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 2,
  suffix: string = ''
) => {
  const obj = { value: start }
  return gsap.to(obj, {
    value: end,
    duration,
    ease: 'power1.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value) + suffix
    },
  })
}

// Stagger fade in
export const staggerFadeIn = (elements: NodeListOf<Element> | Element[]) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: animationConfig.duration.normal,
      stagger: animationConfig.stagger.normal,
      ease: animationConfig.ease.smooth,
    }
  )
}

// Split text reveal
export const splitTextReveal = (element: HTMLElement) => {
  const text = element.textContent || ''
  const chars = text.split('')
  
  element.innerHTML = chars
    .map((char) => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('')
  
  const spans = element.querySelectorAll('span')
  
  return gsap.fromTo(
    spans,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: 0.03,
      ease: animationConfig.ease.smooth,
    }
  )
}

// Image reveal with scale
export const imageReveal = (element: HTMLElement) => {
  const tl = gsap.timeline()
  
  tl.fromTo(
    element,
    {
      clipPath: 'inset(50% 50% 50% 50%)',
      scale: 1.3,
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration: animationConfig.duration.slow,
      ease: animationConfig.ease.smooth,
    }
  )
  
  return tl
}

// Hover scale animation
export const hoverScale = (element: HTMLElement, scale: number = 1.05) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.smooth,
    })
  })
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.smooth,
    })
  })
}

// Magnetic button effect
export const magneticEffect = (element: HTMLElement, strength: number = 0.3) => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.smooth,
    })
  })
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.smooth,
    })
  })
}
