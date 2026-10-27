# Trilha sonora dos vídeos, derivada do motion-kit: uma cama (pad) + efeitos sincronizados
# com cada movimento da animação (out/cues.json, gerado por scripts/cues.ts).
# Saída: public/audio/<id>.mp3 (estéreo, 44,1 kHz). Determinístico (semente fixa).
import json, subprocess, wave, numpy as np

SR = 44100
rng = np.random.default_rng(7)
db = lambda x: 10 ** (x / 20)

def env(n, a=0.004, d=8.0):
    t = np.arange(n) / SR
    return np.minimum(t / a, 1) * np.exp(-t * d)

def lowpass(x, alpha):
    # filtro de um polo com coeficiente variável (motion-kit)
    y = np.empty_like(x); s = 0.0
    for k in range(len(x)):
        s += alpha[k] * (x[k] - s); y[k] = s
    return y

def whoosh(d=0.55):
    n = int(SR * d); t = np.linspace(0, 1, n)
    a = 0.01 + 0.22 * np.sin(np.pi * t) ** 2
    return lowpass(rng.standard_normal(n), a) * np.sin(np.pi * t) ** 2 * 1.6

SCALE = [392.0, 440.0, 493.9, 587.3, 659.3, 784.0, 880.0]  # sol maior pentatônico
def pop(note=0):
    f = SCALE[note % len(SCALE)]; n = int(SR * 0.32); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t)) * env(n, 0.003, 13)

def tick():
    n = int(SR * 0.035); t = np.arange(n) / SR
    click = rng.standard_normal(n) * env(n, 0.0005, 160)
    return (click * 0.6 + np.sin(2 * np.pi * 2400 * t) * env(n, 0.0005, 220) * 0.4) * 0.5

def rise(d=0.6):
    n = int(SR * d); t = np.arange(n) / SR
    f = 180 + 520 * (t / d) ** 2
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 1.5 * 0.5 + whoosh(d)[:n] * 0.4

def hit():
    n = int(SR * 1.4); t = np.arange(n) / SR
    body = np.sin(2 * np.pi * (48 + 50 * np.exp(-t * 14)) * t) * np.exp(-t * 3.2)
    return body + rng.standard_normal(n) * env(n, 0.001, 40) * 0.25

def chime():
    n = int(SR * 1.6); t = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * f * t) * np.exp(-t * (2.4 + i)) / (1 + i) for i, f in enumerate([784.0, 987.8, 1174.7, 1568.0]))

SOUND = {"whoosh": lambda c: (whoosh(), 0.55), "pop": lambda c: (pop(c.get("note", 0)), 0.55), "tick": lambda c: (tick(), 0.35),
         "rise": lambda c: (rise(), 0.6), "hit": lambda c: (hit(), 0.8), "chime": lambda c: (chime(), 0.45)}

def render(name, tl):
    fps = tl["fps"]; N = int(SR * (tl["total"] / fps + 0.5)); L = np.zeros(N); R = np.zeros(N)
    for i, c in enumerate(tl["cues"]):
        sig, g = SOUND[c["kind"]](c)
        start = int(c["at"] / fps * SR) - (int(SR * 0.25) if c["kind"] == "whoosh" else 0)  # whoosh antecipa o corte
        start = max(0, start); n = min(len(sig), N - start)
        pan = ((i * 37) % 9 - 4) / 14
        L[start:start + n] += sig[:n] * g * (1 - max(pan, 0)); R[start:start + n] += sig[:n] * g * (1 + min(pan, 0))
    fx = np.stack([L, R], 1); fx = fx / (np.abs(fx).max() + 1e-9) * db(-10)
    # cama: pad em acordes de sol maior, com respiração lenta e entrada/saída suaves
    t = np.arange(N) / SR; fade = np.minimum(t / 1.5, 1) * np.minimum((N / SR - t) / 1.8, 1)
    pad = sum(np.sin(2 * np.pi * f * t + i) * (0.55 + 0.45 * np.sin(t * (0.25 + i * 0.09))) for i, f in enumerate([98.0, 146.8, 196.0, 246.9, 293.7]))
    pulse = np.sin(2 * np.pi * 49.0 * t) * (0.5 + 0.5 * np.cos(2 * np.pi * t * (100 / 60))) ** 6 * 0.6  # pulso a 100 bpm
    bed = np.stack([pad + pulse, np.roll(pad, 400) + pulse], 1) * fade[:, None]
    bed = bed / (np.abs(bed).max() + 1e-9) * db(-24)
    mix = fx + bed; mix = mix / max(1.0, np.abs(mix).max() / db(-1))
    wav = f"out/{name}.wav"
    with wave.open(wav, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype("<i2").tobytes())
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-codec:a", "libmp3lame", "-b:a", "96k", f"public/audio/{name}.mp3"], check=True)
    print(name, f"{N / SR:.1f} s", len(tl["cues"]), "sons")

for name, tl in json.load(open("out/cues.json")).items():
    render(name, tl)
