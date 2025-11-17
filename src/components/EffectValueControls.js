function EffectValueControls({effectKey, effectValue, onLpfChange}) {
  return (
    <>
      <div className="col d-flex align-items-center justify-content-between">
      <label>{effectKey}</label>

      {effectValue === null ? (
        <input
          disabled
          className="form-control form-control-sm text-center bg-secondary"
          style={{ width: "70px" }}
          placeholder="—"
        />
      ) : (
        <input
          type="number"
          className="form-control form-control-sm text-center"
          style={{ width: "70px" }}
          min="100"
          max="10000"
          step="100"
          value={effectValue}
          onChange={(e) => onLpfChange(effectKey, e.target.value)}
        />
      )}
    </div>
    </>
  );
}

export default EffectValueControls;
