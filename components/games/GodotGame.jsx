import React from "react";

function GodotGame() {
  return (
    <iframe
      src="/games/godot/MnDMSmartphone.html"
      title="MnDM Smartphone"
      style={{ border: "0", width: "100%", height: "100%" }}
      allow="autoplay; fullscreen; gamepad; xr-spatial-tracking"
      referrerPolicy="no-referrer"
    />
  );
}

export default GodotGame;
