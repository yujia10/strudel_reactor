
function SoundControls({volume, onVolumeChange, speed, onSpeedChange}) {

  return (
    <>
      {/* Volume slider */}
      <div className="mb-2">
        <label htmlFor="volumeRange" className="form-label fw-semibold d-flex">
          <span className="me-3">Volume:</span>
          <span>{volume}x</span>
        </label>
        <input
          type="range"
          className="form-range"
          id="volumeRange"
          value={volume}
          min="0"
          max="2"
          step="0.1"
          onChange={onVolumeChange}
        />
      </div>

      {/* Speed slider */}
      <div>
        <label htmlFor="speedRange" className="form-label fw-semibold d-flex">
          <span className="me-3">Speed:</span>
          <span>{speed}x</span>
        </label>
        <input
          type="range"
          className="form-range"
          id="speedRange"
          value={speed}
          min="0.5"
          max="1.5"
          step="0.1"
          onChange={onSpeedChange}
        />
      </div>
    </>
  )
}

export default SoundControls
