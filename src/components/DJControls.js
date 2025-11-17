import TrackControls from "./TrackControls";
import SoundControls from "./SoundControls";
import EffectControls from "./EffectControls";
import EffectValueControls from "./EffectValueControls";

function DJControls({
  tracks,
  onTrackChange,
  onSave,
  onLoad,
  alert,
  volume,
  onVolumeChange,
  speed,
  onSpeedChange,
  lpf,
  onLpfChange,
  jux,
  onJuxChange,
  degrade,
  onDegradeChange,
}) {
  return (
    <div className="card bg-dark text-light border-0 rounded-4 px-5 py-4 mt-3">
      {/* Sound Controls */}
      <SoundControls
        volume={volume}
        onVolumeChange={onVolumeChange}
        speed={speed}
        onSpeedChange={onSpeedChange}
      />

      {/* Track Controls */}
      <div className="row row-cols-2 g-2 my-3">
        {Object.entries(tracks).map(([key, value]) => (
          <TrackControls
            key={key}
            trackKey={key}
            trackValue={value}
            onTrackChange={onTrackChange}
          />
        ))}
      </div>

      {/* Advanced Effects */}
      <div className="accordion accordion-flush mt-3" id="controlsAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="effectControlsHeader">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#effectControls"
              aria-expanded="false"
              aria-controls="effectControls"
            >
              Advanced Effects
            </button>
          </h2>
          <div
            id="effectControls"
            className="accordion-collapse collapse"
            aria-labelledby="effectControlsHeader"
            data-bs-parent="#controlsAccordion"
          >
            <div className="accordion-body">
             {/* Special effect Controls */}
              <EffectControls
                jux={jux}
                onJuxChange={onJuxChange}
                degrade={degrade}
                onDegradeChange={onDegradeChange}
              />
              {/* lpf value Controls */}
              <div className="mb-3">
                <div className="fw-semibold mb-2">LPF</div>
                <div className="row row-cols-2 g-3">
                  {Object.entries(lpf).map(([key, value]) => (
                    <EffectValueControls
                      key={key}
                      effectKey={key}
                      effectValue={value}
                      onLpfChange={onLpfChange}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* json save/load */}
      <div className="d-flex gap-3 mt-3 justify-content-end">
        <button className="preset-btn" onClick={onSave}>
          Save
        </button>
        <button className="preset-btn" onClick={onLoad}>
          Load
        </button>
      </div>
      {alert && (
        <div className="alert alert-warning text-end py-2 mt-2">{alert}</div>
      )}
    </div>
  );
}

export default DJControls;
