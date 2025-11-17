function TrackControls({ trackKey, trackValue, onTrackChange }) {
  return (
    <div className="col">
      <div className="mb-1 fw-semibold">{trackKey}</div>

      <div className="d-flex gap-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={trackKey}
            checked={trackValue === "ON"}
            onChange={() => onTrackChange(trackKey, "ON")}
          />
          <label className="form-check-label">ON</label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={trackKey}
            checked={trackValue === "HUSH"}
            onChange={() => onTrackChange(trackKey, "HUSH")}
          />
          <label className="form-check-label">HUSH</label>
        </div>
      </div>
    </div>
  );
}

export default TrackControls;
