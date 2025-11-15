function EffectsControls() {
  return (
    <>
      <div className="my-3">
        <div className="row row-cols-2 g-3">
          {/* Stereo Spread */}
          <div className="col d-flex align-items-center justify-content-between">
            <div className="form-check">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="spread"
              />
              <label className="form-check-label" htmlFor="spread">
                Stereo
              </label>
            </div>
          </div>

          {/* Distortion */}
          <div className="col d-flex align-items-center justify-content-between">
            <div className="form-check">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="distortion"
              />
              <label className="form-check-label" htmlFor="distortion">
                Distortion
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="fw-semibold mb-2">LPF</div>

        <div className="row row-cols-2 g-3">
          {/* Bassline */}
          <div className="col d-flex align-items-center justify-content-between">
            <label>Bassline</label>
            <input
              type="number"
              className="form-control form-control-sm text-center"
              style={{ width: "60px" }}
            />
          </div>

          {/* Main */}
          <div className="col d-flex align-items-center justify-content-between">
            <label>Main</label>
            <input
              type="number"
              className="form-control form-control-sm text-center"
              style={{ width: "60px" }}
            />
          </div>

          {/* Drums */}
          <div className="col d-flex align-items-center justify-content-between">
            <label>Drums</label>
            <input
              type="number"
              className="form-control form-control-sm text-center"
              style={{ width: "60px" }}
            />
          </div>

          {/* Drums 2 — disabled */}
          <div className="col d-flex align-items-center justify-content-between">
            <label>Drums 2</label>
            <input
              disabled
              className="form-control form-control-sm text-center bg-secondary"
              style={{ width: "60px" }}
              placeholder="—"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EffectsControls;
