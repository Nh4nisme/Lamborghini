/**
 * Web Audio Synthesizer for High-Performance Supercar Engine
 * Generates dynamic V8/V12 twin-turbo harmonics, exhaust resonance,
 * and turbocharger spool sounds purely using native AudioContext.
 */

class SupercarSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private currentRpm: number = 1100; // Idle RPM
  private targetRpm: number = 1100;
  private oscLow: OscillatorNode | null = null;
  private oscMid: OscillatorNode | null = null;
  private oscHigh: OscillatorNode | null = null;
  private turboNoise: AudioBufferSourceNode | null = null;
  private masterGain: GainNode | null = null;
  private lowGain: GainNode | null = null;
  private midGain: GainNode | null = null;
  private highGain: GainNode | null = null;
  private turboGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private animFrameId: number | null = null;
  private onRpmChangeCallbacks: ((rpm: number) => void)[] = [];

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public getRpm(): number {
    return this.currentRpm;
  }

  public onRpm(cb: (rpm: number) => void) {
    this.onRpmChangeCallbacks.push(cb);
  }

  public offRpm(cb: (rpm: number) => void) {
    this.onRpmChangeCallbacks = this.onRpmChangeCallbacks.filter((c) => c !== cb);
  }

  private notifyRpm(rpm: number) {
    for (const cb of this.onRpmChangeCallbacks) {
      cb(rpm);
    }
  }

  public async start(): Promise<boolean> {
    if (this.isRunning) return true;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;

      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      const ctx = this.ctx;

      // Master Gain
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.3);
      this.masterGain.connect(ctx.destination);

      // Main Low-Pass Filter
      this.filter = ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(600, ctx.currentTime);
      this.filter.Q.setValueAtTime(2.5, ctx.currentTime);
      this.filter.connect(this.masterGain);

      // Low frequency rumble (exhaust pulse)
      this.oscLow = ctx.createOscillator();
      this.oscLow.type = 'sawtooth';
      this.oscLow.frequency.setValueAtTime(36, ctx.currentTime);
      this.lowGain = ctx.createGain();
      this.lowGain.gain.setValueAtTime(0.5, ctx.currentTime);
      this.oscLow.connect(this.lowGain);
      this.lowGain.connect(this.filter);

      // Mid harmonics (cylinder firing order)
      this.oscMid = ctx.createOscillator();
      this.oscMid.type = 'triangle';
      this.oscMid.frequency.setValueAtTime(72, ctx.currentTime);
      this.midGain = ctx.createGain();
      this.midGain.gain.setValueAtTime(0.4, ctx.currentTime);
      this.oscMid.connect(this.midGain);
      this.midGain.connect(this.filter);

      // High octave scream (flat-plane crankshaft resonance)
      this.oscHigh = ctx.createOscillator();
      this.oscHigh.type = 'sawtooth';
      this.oscHigh.frequency.setValueAtTime(144, ctx.currentTime);
      this.highGain = ctx.createGain();
      this.highGain.gain.setValueAtTime(0.15, ctx.currentTime);
      this.oscHigh.connect(this.highGain);
      this.highGain.connect(this.filter);

      // Turbo Spool White Noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      this.turboNoise = ctx.createBufferSource();
      this.turboNoise.buffer = noiseBuffer;
      this.turboNoise.loop = true;

      const turboFilter = ctx.createBiquadFilter();
      turboFilter.type = 'bandpass';
      turboFilter.frequency.setValueAtTime(3200, ctx.currentTime);
      turboFilter.Q.setValueAtTime(5, ctx.currentTime);

      this.turboGain = ctx.createGain();
      this.turboGain.gain.setValueAtTime(0.01, ctx.currentTime);

      this.turboNoise.connect(turboFilter);
      turboFilter.connect(this.turboGain);
      this.turboGain.connect(this.masterGain);

      this.oscLow.start();
      this.oscMid.start();
      this.oscHigh.start();
      this.turboNoise.start();

      this.isRunning = true;
      this.currentRpm = 1100;
      this.targetRpm = 1100;

      this.startRpmLoop();
      return true;
    } catch (err) {
      console.warn('AudioContext not allowed or supported', err);
      return false;
    }
  }

  public revTo(targetRpm: number) {
    this.targetRpm = Math.max(1000, Math.min(10000, targetRpm));
  }

  public releaseThrottle() {
    this.targetRpm = 1100; // Idle
  }

  private startRpmLoop() {
    const update = () => {
      if (!this.isRunning || !this.ctx) return;

      // Smooth RPM interpolation
      const diff = this.targetRpm - this.currentRpm;
      const step = diff > 0 ? diff * 0.12 : diff * 0.05; // Revs up fast, decelerates realistically
      this.currentRpm += step;

      const baseFreq = (this.currentRpm / 60) * 2; // fundamental frequency

      const now = this.ctx.currentTime;
      if (this.oscLow) this.oscLow.frequency.setTargetAtTime(baseFreq, now, 0.05);
      if (this.oscMid) this.oscMid.frequency.setTargetAtTime(baseFreq * 2, now, 0.05);
      if (this.oscHigh) this.oscHigh.frequency.setTargetAtTime(baseFreq * 4, now, 0.05);

      if (this.filter) {
        const cutoff = 400 + (this.currentRpm / 10000) * 4500;
        this.filter.frequency.setTargetAtTime(cutoff, now, 0.05);
      }

      // Turbo hiss intensifies with RPM
      if (this.turboGain) {
        const turboVol = Math.max(0.01, ((this.currentRpm - 3000) / 7000) * 0.18);
        this.turboGain.gain.setTargetAtTime(this.currentRpm > 2500 ? turboVol : 0.005, now, 0.08);
      }

      this.notifyRpm(Math.round(this.currentRpm));
      this.animFrameId = requestAnimationFrame(update);
    };

    this.animFrameId = requestAnimationFrame(update);
  }

  public stop() {
    if (!this.isRunning) return;
    this.isRunning = false;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.ctx && this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      setTimeout(() => {
        try {
          this.oscLow?.stop();
          this.oscMid?.stop();
          this.oscHigh?.stop();
          this.turboNoise?.stop();
          this.ctx?.close();
        } catch {
          // ignore cleanup errors
        }
        this.ctx = null;
        this.currentRpm = 1100;
        this.notifyRpm(0);
      }, 350);
    }
  }
}

export const soundEngine = new SupercarSoundEngine();
