import React from "react";

function GaiaGame() {
  return (
    <iframe
      src="/games/gaia/index.html"
      title="MnDM Smartphone"
      style={{ border: "0", width: "100%", height: "100%" }}
      allow="autoplay; fullscreen; gamepad; xr-spatial-tracking"
      referrerPolicy="no-referrer"
    />
  );
}

export default GaiaGame;
