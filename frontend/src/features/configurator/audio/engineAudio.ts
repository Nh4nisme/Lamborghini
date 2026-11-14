/**
 * Lamborghini Engine Audio Player
 * Uses real recorded supercar sound.mp3 files located in /public/Images/model-detail/{slug}/sound.mp3
 */

let currentAudio: HTMLAudioElement | null = null
let isAudioMuted = false

export function getCarSoundUrl(slugOrName: string = 'revuelto'): string {
    const lower = slugOrName.toLowerCase()
    if (lower.includes('huracan')) return '/Images/model-detail/huracan/sound.mp3'
    if (lower.includes('temerario')) return '/Images/model-detail/temerario/sound.mp3'
    if (lower.includes('urus')) return '/Images/model-detail/urus/sound.mp3'
    return '/Images/model-detail/revuelto/sound.mp3'
}

export function setAudioMuted(muted: boolean) {
    isAudioMuted = muted
    if (currentAudio) {
        currentAudio.muted = muted
    }
}

export function startV12Engine(onStarted?: () => void, carSlug: string = 'revuelto') {
    if (isAudioMuted) {
        onStarted?.()
        return
    }

    try {
        if (!currentAudio) {
            currentAudio = new Audio(getCarSoundUrl(carSlug))
            currentAudio.loop = true
            currentAudio.volume = 0.75
        } else {
            const desiredSrc = getCarSoundUrl(carSlug)
            if (!currentAudio.src.endsWith(desiredSrc)) {
                currentAudio.src = desiredSrc
            }
        }

        currentAudio.muted = isAudioMuted
        currentAudio.currentTime = 0
        const playPromise = currentAudio.play()

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    onStarted?.()
                })
                .catch(() => {
                    // Trình duyệt có thể chặn autoplay nếu chưa có tương tác người dùng
                    onStarted?.()
                })
        }
    } catch {
        onStarted?.()
    }
}

export function stopV12Engine() {
    if (currentAudio) {
        try {
            currentAudio.pause()
            currentAudio.currentTime = 0
        } catch {
            // ignore
        }
    }
}

export function revV12Engine() {
    if (isAudioMuted || !currentAudio) return
    try {
        currentAudio.volume = 1.0
        setTimeout(() => {
            if (currentAudio) currentAudio.volume = 0.75
        }, 1500)
    } catch {
        // ignore
    }
}

export function playUiClick() {
    if (isAudioMuted) return
    try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (!AudioCtx) return
        const ctx = new AudioCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(1000, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.04)

        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.04)
    } catch {
        // ignore
    }
}

export function playDoorHydraulic() {
    if (isAudioMuted) return
    try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (!AudioCtx) return
        const ctx = new AudioCtx()
        const bufferSize = Math.floor(ctx.sampleRate * 0.3)
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const data = buffer.getChannelData(0)

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1))
        }

        const noise = ctx.createBufferSource()
        noise.buffer = buffer

        const filter = ctx.createBiquadFilter()
        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(1200, ctx.currentTime)
        filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.3)
        filter.Q.value = 2.5

        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)

        noise.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)
        noise.start()
    } catch {
        // ignore
    }
}
