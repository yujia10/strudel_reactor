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

## AI Usage

This project was developed with assistance from Claude for design guidance, concept clarification, and debugging support. Below are the prompts submitted and the corresponding AI-generated outputs.

---

Q: What are some suitable colour schemes for a DJ-style music app using green and orange as the main colours?  

A: here are several DJ-style colour palettes. These are designed for energetic, electronic-music interfaces and work well with dark-mode UIs.

Palette 1 — Electric Midnight  
•	#0d0d0d — Deep Black  
•	#1b1fff — Laser Blue  
•	#8400ff — Electric Purple  
•	#ff2a6d — Neon Pink  
•	#e6e6e6 — Soft White Text  
Vibe: Futuristic, high-energy, “club lights” aesthetic.
 
Palette 2 — Cybersteel Tech  
•	#141414 — Steel Black  
•	#3b82f6 — Signal Blue  
•	#22c55e — Tech Green  
•	#64748b — Neutral Slate  
•	#f3f4f6 — Light Grey Text  
Vibe: Professional, clean, hardware-inspired (like DJ mixers).  

Palette 3 — Modern Tech + Neon  
•	#b9ff66 — Neon Green  
•	#ff9900 — Warm Orange  
•	#1a1a1a — Matte Black  
•	#444444 — Neutral Dark Grey  
Vibe: Sleek, hardware-inspired, subtle but energetic.

---

Q: What fonts are suitable for a tech-styled music app?  

A:Here are several font families that work well for futuristic, electronic, and music-oriented interfaces:
1. Eurostile / Eurostile Extended  
•	Classic sci-fi and digital-panel aesthetic  
•	Often seen in hardware and DJ equipment UIs  
2. Orbitron (Google Font)  
•	Geometric and sharp  
•	Great for techno labels and headings  
3. Exo 2 (Google Font)  
•	Futuristic but highly readable  
•	Suitable for both headings and body text  
4. Rajdhani (Google Font)  
•	Square, condensed, and modern  
•	Works nicely for compact UI elements  
5. Audiowide (Google Font)  
•	Rounded techno vibe  
•	Ideal for music branding or playful UI elements  
6. Inter (Google Font)  
•	Clean and modern  
•	Excellent for body text paired with a more stylized heading font  
7. Space Grotesk  
•	Sleek, minimal, modern-tech feeling  
•	Great for polished professional interfaces  
8. Chakra Petch (Google Font)  
•	A perfect blend of futuristic and mechanical  
•	Curved, techno-leaning shapes suitable for music tools, dashboards, and control panels  
 
Recommended Font Pairings  
•	Orbitron (headings) + Inter (body)  
•	Chakra Petch (UI labels) + Roboto (body text)  
•	Rajdhani (UI) + Space Grotesk (headings)  
•	Eurostile Extended (titles) + Roboto Mono (technical elements)  

---

Q: Based on my music code, what kinds of controls can I implement (according to Bootstrap control types)?  

A:Here are the recommended Bootstrap control types and the parameters they work best for in your music app:
 
1. Sliders (range input)  
Best for continuous numeric values:
•	Volume (gain, postgain)  
•	Speed (speed)  
•	LPF/HPF filter (lpf, hpf)  
•	Reverb (room)  
•	ADSR envelope values (A/D/S/R as 4 sliders)  
•	Pattern intensity (e.g., degrade, randomness amount)  
Sliders are intuitive for real-time audio changes (good for your app).  
 
2. Radio Buttons / Dropdown (single choice)  
Best for choosing one option from a set:  
•	Selecting drum pattern (pick(drum_structure, pattern))  
•	Choosing bassline variant (pick(basslines, bass))  
•	Choosing arpeggiator pattern (pick(arpeggiator1 / arpeggiator2))  
•	Selecting sample bank (Dirt, RolandTR808, Korg, etc.)  
•	Selecting overall mode (Normal / Wide Stereo / Glitchy)  
Bootstrap components:  
•	<select class="form-select">  
•	.btn-group with radio-like buttons  
 
3. Switches / Checkboxes  
Best for on/off toggles:  
•	Mute / unmute track (bass, arp, drums, drums2)  
•	Stereo effect (jux(rev))  
•	Glitch / rare reverse (rarely(jux(rev)))  
•	Log mode (all(x => x.log()))  
•	Enable/disable reverb  
•	Enable live visualization  
Bootstrap component:  
<div class="form-check form-switch">  
 
4. Number Inputs  
Best for precise numeric fields:  
•	Postgain levels (postgain(2.8), postgain(0.5))  
•	LPF frequency (lpf(300), lpf(700))  
•	CPS (setcps(140/60/4))  
•	Custom ADSR input as numbers (optional)  
•	BPM-like adjustments if you calculate it from CPS  
Bootstrap:  
<input type="number" class="form-control">  
 
5. Buttons  
Best for actions, not values:  
•	Play, Stop, Process, Proc & Play  
•	Sync from code  
•	Reset controls to default  
•	Load preset (Bass-heavy / Arp-heavy / Drum-only)  
•	Toggle between main pattern / alternate pattern  
Bootstrap:  
<button class="btn btn-primary">
 
---

Q:How can I customize the appearance of a Bootstrap slider?

A:You can style a Bootstrap slider (the <input type="range"> element) by overriding its default CSS and targeting the browser-specific slider pseudo-elements. Bootstrap doesn't provide many built-in slider styling options, so custom CSS is required.  
Here are the key steps:  
1. Select the slider element  
input[type="range"].form-range {
  width: 100%;
}  
2. Style the track  
input[type="range"]::-webkit-slider-runnable-track {  
  height: 6px;  
  background: #444;  
  border-radius: 4px;  
}  
input[type="range"]::-moz-range-track {  
  height: 6px;  
  background: #444;  
  border-radius: 4px;  
}  
3. Style the thumb (the movable knob)  
input[type="range"]::-webkit-slider-thumb {  
  appearance: none;  
  width: 16px;  
  height: 16px;  
  background: #ff9900;  
  border-radius: 50%;  
  cursor: pointer;  
  margin-top: -5px; /* align with track */  
}
input[type="range"]::-moz-range-thumb {  
  width: 16px;  
  height: 16px;  
  background: #ff9900;  
  border-radius: 50%;  
  cursor: pointer;  
}
4. Add hover / active effects  
input[type="range"]::-webkit-slider-thumb:hover {  
  background: #ffaa33;  
}
5. Optional: remove Bootstrap’s default box-shadow  
input[type="range"]:focus {  
  box-shadow: none;  
}  

---

Q: Why doesn’t the slider update when I adjust its value? 

A: The issue occurs because the slider is not a controlled component in React.
In this state, the slider’s visual position changes when you drag it, but its value is not tied to React state, so:  
•	React does not know the slider value has changed  
•	The UI does not re-render  
•	Other logic (e.g., effects, processing functions) does not receive the updated value  
In other words, the slider updates visually, but the underlying value in your application never changes.  
To fix this, you need to turn the slider into a controlled component by binding it to React state:  
const [volume, setVolume] = useState(1);

<input 
  type="range"
  min="0"
  max="2"
  step="0.1"
  value={volume}            // controlled value
  onChange={(e) => setVolume(e.target.value)} // update state
/>  
Now the slider’s position and your React state stay in sync, and any part of your app that depends on the slider value will update correctly.

---

Q: the control panel can update the code in real time, but manually editing the code does not update the control panel. What causes this, and what are some simple solutions?  
 
A: The issue occurs because the app currently supports one-way syncing:  
•	Changes in the control panel update the code,  
•	but manual code edits do not push changes back into the control panel.  
To fix this, you can implement two-way synchronization so that the UI and the code stay consistent. Below are three possible solutions.  
 
Solution 1: Parse the code during playback and sync it to the control panel (recommended)  
This approach reads the current code when the user presses Play, extracts the track states, and updates the React state before processing the code.  
// In App.js — parse the code to extract UI state  
const parseCodeToState = (code) => {
  const lines = code.split('\n');
  const newTracks = { ...tracks };
  
  // Check whether each track is muted (track name with underscore)  
  Object.keys(newTracks).forEach(trackName => {
    const isMuted = lines.some(line => 
      line.trim().startsWith(`_${trackName}:`)
    );
    newTracks[trackName] = isMuted ? 'HUSH' : 'ON';
  });
  
  return newTracks;
};

// Modified handlePlay — sync code → UI → playback  
const handlePlay = () => {
  if (globalEditor != null) {
    const proc_text = document.getElementById("proc").value;  
    
    // 1. Read the code first and sync it to the control panel  
    const parsedTracks = parseCodeToState(proc_text);  
    setTracks(parsedTracks);  
    
    // 2. Then process the code using the parsed state
    const proc_text_replaced = processText(
      proc_text,
      parsedTracks,   // Use the updated track state
      volume,
      speed,
      lpf,
      jux,
      degrade
    );
    
    globalEditor.setCode(proc_text_replaced);
    globalEditor.evaluate();
    setIsPlaying(true);
  }
};  
Why this works:  
This makes the sync two-way. Whenever the user presses Play, the system first reads the code, syncs UI state, then processes and plays it.  
 
Solution 2: Add a “Sync from Code” button  
This option gives the user manual control to update the UI when they edit the code.  
// In App.js — manually sync UI state from the code editor
const handleSyncFromCode = () => {
  const proc_text = document.getElementById("proc").value;
  const parsedTracks = parseCodeToState(proc_text);
  setTracks(parsedTracks);

  // Optional: also parse volume, speed, lpf, etc.
};

// In the UI
<button onClick={handleSyncFromCode}>
  Sync from Code
</button>
Why use this:
Simple to implement, beginner-friendly, and avoids real-time overhead.  
 
Solution 3: Real-time syncing while typing (most complete but more complex)
This approach listens for code changes and updates the control panel   continuously.  
// In PreprocessArea.jsx — notify parent when the code changes
function PreprocessArea({ onCodeChange }) {
  return (
    <textarea 
      className="form-control" 
      id="proc"
      style={{ height: "100%", resize: "none" }}
      onChange={(e) => onCodeChange && onCodeChange(e.target.value)} // send code to parent
    ></textarea>
  );
}
// In App.js — parse code in real time  
const handleCodeChange = (code) => {
  const parsedTracks = parseCodeToState(code);
  setTracks(parsedTracks);   // Update control panel instantly
};

// Use it in JSX  
<PreprocessArea onCodeChange={handleCodeChange} />
Why use this:  
It keeps the UI perfectly synchronized with code edits, but requires more state management and performance consideration.  
 
---

Q: Why do the D3 effect bars squeeze from right to left?  

A: The squeezing happens because the bar width is recalculated every time new data arrives.  
When the data array is small (e.g., 5 items), the width is large:  
•	barWidth = 800 / 5 = 160px (bars are very wide)  
Later, when more data arrives (e.g., 50 items):  
•	barWidth = 800 / 50 = 16px (bars become narrow)  
Since D3 redraws every bar with each update, the constant recalculation of width and position creates a “squeezing” animation from right to left.  
To fix this, you can render a fixed number of bars (e.g., 100 bars) and keep the bar width constant. New data will fill the right side, while earlier positions are padded with tiny values until real data appears.  
 
✅ Solution: Fix the number of bars to prevent squeezing  
const maxBars = 100;
const barWidth = width / maxBars; // Fixed width, always divide by 100

// Pad with minimum values if data is insufficient
const paddedData = Array(maxBars).fill(0.1);
const displayData = data.slice(-maxBars);

// Place actual data at the end
displayData.forEach((val, i) => {
  paddedData[maxBars - displayData.length + i] = val;
});  
This ensures you always render exactly 100 bars with a consistent width.  
When the app first starts, most bars show a tiny value (0.1), but as real data arrives, the rightmost bars fill in smoothly without any squeezing effect.






---


