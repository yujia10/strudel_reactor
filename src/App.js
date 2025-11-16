import "./App.css";
import { useState, useEffect, useRef } from "react";
import { StrudelMirror } from "@strudel/codemirror";
import { evalScope } from "@strudel/core";
import { drawPianoroll } from "@strudel/draw";
import { initAudioOnFirstClick } from "@strudel/webaudio";
import { transpiler } from "@strudel/transpiler";
import {
  getAudioContext,
  webaudioOutput,
  registerSynthSounds,
} from "@strudel/webaudio";
import { registerSoundfonts } from "@strudel/soundfonts";
import { stranger_tune } from "./tunes";
import console_monkey_patch, { getD3Data } from "./console-monkey-patch";
import DJControls from "./components/DJControls";
import PlayButtons from "./components/PlayButtons";
import ProcButtons from "./components/ProcButtons";
import PreprocessArea from "./components/PreprocessArea";

let globalEditor = null;

const handleD3Data = (event) => {
  console.log(event.detail);
};

// Mute selected track
function muteTrack(text, trackName) {
  const lines = text.split("\n");

  // update target track status
  const updatedLines = lines.map((line) => {
    if (line.trim().startsWith(`${trackName}:`)) {
      return line.replace(`${trackName}:`, `_${trackName}:`);
    }
    return line;
  });

  return updatedLines.join("\n");
}

// Adjust volume based on slider change
function controlVolume(text, volume) {
  let outputText = text;
  let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:/])/gm;
  let matches = [];
  let m;

  while ((m = regex.exec(outputText)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m.forEach((match, groupIndex) => {
      matches.push(match);
    });
  }

  let matches2 = matches.map((match) =>
    match.replaceAll(
      /(?<!post)gain\(([\d.]+)\)/g,
      (match, captureGroup) => `gain(${captureGroup}*${volume})`
    )
  );

  let replacedText = matches.reduce(
    (text, original, i) => text.replaceAll(original, matches2[i]),
    outputText
  );

  return replacedText;
}

function controlSpeed(text, speed) {
  const regex = /setcps\(([\d./]+)\)/;
  // find matched text
  const match = text.match(regex);
  if (!match) return text;

  // get first number
  const expression = match[1];
  const parts = expression.split("/");

  // replace bpm value
  const baseBpm = parts[0];
  parts[0] = `${baseBpm} * ${speed}`;

  const newSetcps = `setcps(${parts.join("/")})`;

  return text.replace(regex, newSetcps);
}

function controlLpf(text, trackName, value) {
  if (!value) return text;
  // Match track blocks
  let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:/])/gm;
  let matches = [];
  let m;

  while ((m = regex.exec(text)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    matches.push(m[0]);
  }
  // Find target track block
  const targetBlock = matches.find((block) =>
    block.trim().startsWith(`${trackName}:`)
  );

  if (!targetBlock || !targetBlock.includes(".lpf(")) return text;
  // Replace .lpf() in the block
  const updatedBlock = targetBlock.replace(
    /\.lpf\([\d.]+\)/g,
    `.lpf(${value})`
  );
  // Replace original block
  return text.replace(targetBlock, updatedBlock);
}

// Remove .jux(rev)
function removeJuxRev(text) {
  return text.replace(/\.jux\(rev\)/g, "");
}

// Add or delete .degrade()
function controlDegrade(
  text,
  degrade,
  targetTracks = ["bassline", "main_arp"]
) {
  if (!degrade) {
    return text.replace(/\.degrade\(\)/g, "");
  }

  // add .degrade() for specified tracks
  let outputText = text;
  let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:/])/gm;
  let matches = [];
  let m;

  while ((m = regex.exec(outputText)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    matches.push(m[0]);
  }

  let matches2 = matches.map((match) => {
    // Check target track
    const isTargetTrack = targetTracks.some((trackName) =>
      match.trim().startsWith(`${trackName}:`)
    );

    if (isTargetTrack && !match.includes(".degrade()")) {
      // Add .degrade() as last line
      return match.replace(/(\.[a-z]+\([^)]*\))(\s*)$/, "$1\n.degrade()$2");
    }
    return match;
  });

  let replacedText = matches.reduce(
    (text, original, i) => text.replace(original, matches2[i]),
    outputText
  );

  return replacedText;
}

// Preprocesses the source code
function processText(source, tracks, volume, speed, lpf, jux, degrade) {
  let text = source;

  // search for track set to hush
  for (let trackName in tracks) {
    if (tracks[trackName] === "HUSH") {
      text = muteTrack(text, trackName);
    }
  }

  // Set global gain
  if (volume !== 1) {
    text = controlVolume(text, volume);
  }

  // Set global speed
  if (speed !== 1) {
    text = controlSpeed(text, speed);
  }

  // Set lpf
  for (let trackName in lpf) {
    text = controlLpf(text, trackName, lpf[trackName]);
  }

  // Control degrage effect
  text = controlDegrade(text, degrade);

  // Control jux(rev)
  if (!jux) {
    text = removeJuxRev(text);
  }

  return text;
}

export default function StrudelDemo() {
  const hasRun = useRef(false);

  // Add tracks status
  const [tracks, setTracks] = useState({
    bassline: "ON",
    main_arp: "ON",
    drums: "ON",
    drums2: "ON",
  });

  // Add volume status
  const [volume, setVolume] = useState(1);

  // Add speed status
  const [speed, setSpeed] = useState(1);

  // Add lpf status
  const [lpf, setLpf] = useState({
    bassline: 700,
    main_arp: 300,
    drums: 7000,
    drums2: null,
  });

  // Add jux status
  const [jux, setJux] = useState(true);

  // Add degrade status
  const [degrade, setDegrade] = useState(false);

  //Preprocess controls
  const handlePreprocess = () => {
    let proc_text = document.getElementById("proc").value;
    let proc_text_replaced = processText(
      proc_text,
      tracks,
      volume,
      speed,
      lpf,
      jux,
      degrade
    );
    if (globalEditor != null) {
      globalEditor.setCode(proc_text_replaced);
    }
  };

  //Preprocess and play
  const handleProcAndPlay = () => {
    if (globalEditor != null) {
      handlePreprocess();
      globalEditor.evaluate();
    }
  };

  // Playback controls
  const handlePlay = () => {
    if (globalEditor != null) {
      globalEditor.evaluate();
    }
  };

  const handleStop = () => {
    if (globalEditor != null) {
      globalEditor.stop();
    }
  };

  // Change track status
  const handleTrackChange = (track, value) => {
    setTracks({ ...tracks, [track]: value });
  };

  // Change lpf status
  const handleLpfChange = (track, value) => {
    setLpf({ ...lpf, [track]: value });
  };

  // Change jux(rev) states
  const handleJuxChange = (checked) => {
    setJux(checked);
  };

  // Change degrage status
  const handleDegradeChange = (checked) => {
    setDegrade(checked);
  };

  // Save to localStorage json
  const handleSave = () => {
    try {
      localStorage.setItem("strudel-settings", JSON.stringify({ tracks }));
      alert("Settings saved!");
    } catch (error) {
      alert("Error saving settings");
    }
  };

  // Load from localStorage json
  const handleLoad = () => {
    try {
      const saved = localStorage.getItem("strudel-settings");
      if (saved) {
        const settings = JSON.parse(saved);
        setTracks(settings.tracks);
        alert("Settings loaded");
      } else {
        alert("No saved settings found!");
      }
    } catch (error) {
      alert("Error loading settings");
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      document.addEventListener("d3Data", handleD3Data);
      console_monkey_patch();
      hasRun.current = true;
      //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
      //init canvas
      const canvas = document.getElementById("roll");
      canvas.width = canvas.width * 2;
      canvas.height = canvas.height * 2;
      const drawContext = canvas.getContext("2d");
      const drawTime = [-2, 2]; // time window of drawn haps
      globalEditor = new StrudelMirror({
        defaultOutput: webaudioOutput,
        getTime: () => getAudioContext().currentTime,
        transpiler,
        root: document.getElementById("editor"),
        drawTime,
        onDraw: (haps, time) =>
          drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
        prebake: async () => {
          initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
          const loadModules = evalScope(
            import("@strudel/core"),
            import("@strudel/draw"),
            import("@strudel/mini"),
            import("@strudel/tonal"),
            import("@strudel/webaudio")
          );
          await Promise.all([
            loadModules,
            registerSynthSounds(),
            registerSoundfonts(),
          ]);
        },
      });

      document.getElementById("proc").value = stranger_tune;

      // Initiate code output
      if (globalEditor != null) {
        const initialCode = processText(
          stranger_tune,
          tracks,
          volume,
          speed,
          lpf,
          jux,
          degrade
        );
        globalEditor.setCode(initialCode);
      }
    }
  }, []);

  // Change tracks and effects dynamically
  useEffect(() => {
    // Only changes while music is playing
    if (globalEditor != null && globalEditor.repl.state.started === true) {
      const newCode = processText(
        stranger_tune,
        tracks,
        volume,
        speed,
        lpf,
        jux,
        degrade
      );

      globalEditor.setCode(newCode);

      globalEditor.evaluate();
    }
  }, [tracks, volume, speed, lpf, jux, degrade]);

  return (
    <div className="px-3">
      <h2 className="my-3 text-center">Strudel Demo</h2>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              {/* Preprocess text area */}
              <div
                style={{ maxHeight: "50vh", overflowY: "auto" }}
                className="mb-3"
              >
                <PreprocessArea />
              </div>

              {/* output */}
              <div
                style={{ maxHeight: "50vh", overflowY: "auto" }}
                className="mb-3"
              >
                <div id="editor" />
                <div id="output" />
              </div>
            </div>

            <div className="col-md-4">
              {/* Buttons */}
              <ProcButtons
                onPreprocess={handlePreprocess}
                onProcAndPlay={handleProcAndPlay}
              />
              <PlayButtons onPlay={handlePlay} onStop={handleStop} />

              {/* DJ controls */}
              <DJControls
                tracks={tracks}
                onTrackChange={handleTrackChange}
                volume={volume}
                onVolumeChange={(e) => setVolume(e.target.value)}
                speed={speed}
                onSpeedChange={(e) => setSpeed(e.target.value)}
                lpf={lpf}
                onLpfChange={handleLpfChange}
                jux={jux}
                onJuxChange={handleJuxChange}
                degrade={degrade}
                onDegradeChange={handleDegradeChange}
                onSave={handleSave}
                onLoad={handleLoad}
              />
            </div>
          </div>
        </div>
        <canvas id="roll"></canvas>
      </main>
    </div>
  );
}
