function EffectControls({ jux, onJuxChange, degrade, onDegradeChange }) {
  return (
    <>
      <div className="my-3">
        <div className="row row-cols-2 g-3">
          {/* Stereo Effect */}
          <div className="col d-flex align-items-center justify-content-between">
            <div className="form-check">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="rev"
                checked={jux}
                onChange={(e) => onJuxChange(e.target.checked)}
              />
              <label className="form-check-label fw-semibold" htmlFor="rev">
                Stereo Effect
              </label>
            </div>
          </div>

          {/* Glitch Effect */}
          <div className="col d-flex align-items-center justify-content-between">
            <div className="form-check">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="degrade"
                checked={degrade}
                onChange={(e) => onDegradeChange(e.target.checked)}
              />
              <label className="form-check-label fw-semibold" htmlFor="degrade">
                Glitch Effect
              </label>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default EffectControls;
