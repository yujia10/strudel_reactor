function EffectsControls() {
  return (
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

        {/* Room Reverb */}
        <div className="col d-flex align-items-center justify-content-start gap-2">
          <label className="form-check-label mr-3" htmlFor="reverb">
            Reverb
          </label>
          <input
            type="number"
            className="form-control form-control-sm text-center"
            style={{ width: "60px" }}
            min="0"
            max="1"
            step="0.1"
            defaultValue="0.6"
          />
        </div>

        {/* Low Pass Filter */}
        <div className="col d-flex align-items-center justify-content-start gap-2">
          <label className="form-check-label" htmlFor="filter">
            LPF
          </label>
          <input
            type="number"
            className="form-control form-control-sm text-center"
            style={{ width: "60px" }}
            min="100"
            max="10000"
            step="100"
            defaultValue="500"
          />
        </div>
      </div>
    </div>
  );
}

export default EffectsControls;
