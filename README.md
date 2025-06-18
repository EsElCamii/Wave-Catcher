<!-- Hey there, I'm Camilo Quirós Mendoza! Surfing code & waves 🌊 -->

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=000080&height=120&section=header" alt="header"/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=500&size=28&duration=3000&pause=500&color=00C9A7&width=500&lines=Wave-catching+meets+hacker+vibes;Dive+into+the+code+and+the+waves" alt="Typing SVG"/>
</a>

---

## 🌊 Wave‑Catcher: Catch the Frequency, Surf the Data

Live demo & docs: [Visit Wave‑Catcher project](https://yourdomain.com/Wave-Catcher)

Captures ultrasound (up to ~80 kHz) via MEMS mic and streams PDM over USB. Ideal for exploring **acoustic‑cryptanalysis**, USB‑PDM‑to‑PCM conversion, and reverse hot‑air‑pump‑noise into data.

**Tech stack**  
✔️ C (firmware) · Python (data conversion) · SoX (playback) · KiCad (PCB) · STM32F3 (USB PDM)

---

## 🛠️ Hardware & Software Pipeline

1. **Hardware PCB** (KiCad 5) + MEMS mic  
2. Firmware: SPI‑DMA PDM → USB via STM32 + J‑Link/OpenOCD  
3. Software: dump `.bin`, convert to `.wav` via SoX  
   ```bash
   sox -r 44000 -c 1 -b 8 -t raw -e unsigned-integer out.bin out.wav
