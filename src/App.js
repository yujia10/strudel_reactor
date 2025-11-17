import "./App.css";
import { useState, useEffect, useRef } from "react";
import { StrudelMirror } from "@strudel/codemirror";
import { evalScope } from "@strudel/core";
import { initAudioOnFirstClick } from "@strudel/webaudio";
import { transpiler } from "@strudel/transpiler";
import {
  getAudioContext,
  webaudioOutput,
  registerSynthSounds,
} from "@strudel/webaudio";
import { registerSoundfonts } from "@strudel/soundfonts";
import { stranger_tune } from "./tunes";
import console_monkey_patch from "./utils/console-monkey-patch";
import { handleD3Data } from "./utils/visualization";
import { processText } from "./utils/audioProcessing";
import DJControls from "./components/DJControls";
import PlayButtons from "./components/PlayButtons";
import PreprocessArea from "./components/PreprocessArea";
import * as d3 from "d3";

let globalEditor = null;

export default function StrudelDemo() {
  const hasRun = useRef(false);

  /* Status */
  const [isPlaying, setIsPlaying] = useState(false);
  // Add track status
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

  // Add alert status
  const [alert, setAlert] = useState(null);

  /* Handlers */
  // Playback controls
  const handlePlay = () => {
    if (globalEditor != null) {
      // Preprocess text
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
      globalEditor.setCode(proc_text_replaced);

      // Play music
      globalEditor.evaluate();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (globalEditor != null) {
      globalEditor.stop();
      setIsPlaying(false);
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
      localStorage.setItem(
        "strudel-settings",
        JSON.stringify({ tracks, volume, speed, lpf, jux, degrade })
      );
      setAlert("Settings saved successfully!");
    } catch (error) {
      setAlert("Error saving settings.");
    }
  };

  // Load from localStorage json
  const handleLoad = () => {
    try {
      const saved = localStorage.getItem("strudel-settings");
      if (saved) {
        const settings = JSON.parse(saved);
        setTracks(settings.tracks);
        setVolume(settings.volume);
        setSpeed(settings.speed);
        setLpf(settings.lpf);
        setJux(settings.jux);
        setDegrade(settings.degrade);
        setAlert("Settings loaded successfully!");
      } else {
        setAlert("No saved settings found.");
      }
    } catch (error) {
      setAlert("Error loading settings.");
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      d3.select("#d3-visualizer")
        .style("background", "#262626")
        .style("display", "block")
        .style("border-radius", "8px");

      document.addEventListener("d3Data", handleD3Data);
      console_monkey_patch();
      hasRun.current = true;
      //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl

      globalEditor = new StrudelMirror({
        defaultOutput: webaudioOutput,
        getTime: () => getAudioContext().currentTime,
        transpiler,
        root: document.getElementById("editor"),
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
              <div className="row mb-3">
                <div className="col-6">
                  <div className="text-section">
                    <PreprocessArea />
                  </div>
                </div>

                <div className="col-6">
                  <div className="text-section">
                    <div id="editor" />
                    <div id="output" />
                  </div>
                </div>
              </div>

              <div className="my-3 bg-dark">
                <svg id="d3-visualizer" width="100%" height="25vh"></svg>
              </div>
            </div>

            <div className="col-md-4">
              {/* Playback Buttons */}
              <PlayButtons
                onPlay={handlePlay}
                onStop={handleStop}
                isPlaying={isPlaying}
              />

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
                alert={alert}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
