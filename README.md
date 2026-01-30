# Strudel Demo — README

This project is a browser-based music tool that allows users to write/process Strudel code, play music, apply dynamic effects, and visualize audio in real time.

<img width="700" height="420" alt="Screenshot" src="https://github.com/user-attachments/assets/37a77d73-c696-4281-85ec-0a6aaa28df05" />

## Demonstration Video
[*Strudel Demo*](https://youtu.be/BzTb05WmaBk)


## Features Overview

### **Process**
- Converts the left-side text into a processed version ready for playback.
- Control panel updates based on the processed result.

### **Proc & Play**
- Processes the code and immediately starts playback.

**Notes:**
- Intended for users who want to **edit Strudel code directly**.
- Any code changes after pressing Process will automatically update the control panel.

---

### **Play**
- Plays music based on the **current control panel settings**.
- Does **not** use raw code directly.
- Any adjustments (speed, volume, LPF, stereo, glitch, track toggles) update *immediately* during playback.

### **Stop**
- Stops the current playback.

### **Play Status Indicator**
- A small visual marker that shows whether the music is playing.

---

### **Volume**
- A multiplier applied to the whole track (**original × number**).

### **Speed**
- A multiplier applied to the tempo (**original × number**).

---

### **Track Controls (On/Hush)**
- Toggle each track individually:
  - **On** → plays normally
  - **Hush** → mutes the track
- Ideal for isolating layers or testing arrangements without modifying code.

---

### **Stereo Effect**
- Widens the sound, giving a spacious left–right movement and a more immersive feel.

### **Glitch Effect**
- Randomly drops notes, creating a playful or unpredictable rhythm texture.

### **Low-Pass Filter (LPF)**
- LPF is controlled by **numeric values**.
- Adjust using arrow buttons or type values manually.
- Lower values = softer, muffled sound. Higher values = brighter, clearer sound

---

### **Save / Load Settings**
  - **Save** stores the current control panel configuration.
  - **Load** instantly bring back your previous settings.

---

### **Visualizer**
- Shows the real dynamic behaviour of the pattern.

---

## Additional Usage Notes
If you **manually edit the code** in the left text box, please press **Process** or **Proc & Play**. Playing **without processing** will **not** apply your code changes.

Changes made in the **control panel** do **not** require processing. Simply press **Play** to hear the updated settings immediately.

---

## Song Code Sources
Remixed and reproduced from Algorave Dave's code found here: https://www.youtube.com/watch?v=ZCcpWzhekEY

---







---


