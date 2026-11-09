// UI hover/click tones. Gated by Settings -> Sound effects.

let audioCtx = null;
let lastHoverButton = null;
let lastHoverAt = 0;

function soundEnabled() {
  const settings = window.getPyscheSettings?.();
  if (settings) return !!settings.soundEnabled;
  return window.gameAudioSettings?.soundEffectsEnabled !== false;
}

function soundVolume() {
  const settings = window.getPyscheSettings?.();
  const vol = settings?.soundVolume ?? window.gameAudioSettings?.soundVolume;
  return Number.isFinite(vol) ? Math.min(1, Math.max(0, vol)) : 1;
}

function ensureAudio() {
  if (audioCtx) return audioCtx;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  audioCtx = new Ctx();
  return audioCtx;
}

function playTone({ freq, duration, peak, type = "sine" }) {
  if (!soundEnabled()) return;
  const vol = soundVolume();
  if (vol <= 0) return;
  const ctx = ensureAudio();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const amp = Math.max(0.0001, peak * vol);

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(amp, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function buttonFromEvent(event) {
  const el = event.target;
  if (!(el instanceof Element)) return null;
  const button = el.closest("button");
  if (!button || button.disabled) return null;
  return button;
}

function playHover() {
  playTone({ freq: 920, duration: 0.045, peak: 0.045, type: "sine" });
}

function playClick() {
  playTone({ freq: 420, duration: 0.07, peak: 0.11, type: "triangle" });
}

document.addEventListener("pointerover", (event) => {
  if (event.pointerType === "touch") return;
  const button = buttonFromEvent(event);
  if (!button) return;
  if (event.relatedTarget instanceof Node && button.contains(event.relatedTarget)) return;
  const now = performance.now();
  if (button === lastHoverButton && now - lastHoverAt < 80) return;
  lastHoverButton = button;
  lastHoverAt = now;
  playHover();
});

document.addEventListener("click", (event) => {
  if (!buttonFromEvent(event)) return;
  playClick();
});

document.addEventListener(
  "pointerdown",
  () => {
    const ctx = ensureAudio();
    if (ctx?.state === "suspended") ctx.resume().catch(() => {});
  },
  { once: true },
);
