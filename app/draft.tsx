'use client'

import {useState, useRef} from 'react';
import RouletteSpinner from 'components/rouletteSpinner';
import { getSettingsItem, getVehicles } from './settings';

export default function Draft() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showRerollTooltip, setShowRerollTooltip] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [bannedKeys, setBannedKeys] = useState<Set<string>>(new Set());
  const bansComplete = bannedKeys.size >= 2;
  const takenPairs = useRef(new Set<string>());

  function handleBan(key: string) {
    setBannedKeys(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }

  function reloadMe() {
    setSpinKey((k) => k + 1);
    setBannedKeys(new Set());
    takenPairs.current = new Set();
  }

  var curRoll = "";

  if (getSettingsItem("rollMapFirst") == "true") {
    curRoll = "Map-first Roll"
    
  } else if (getSettingsItem("rollMapFirst") == "false") {
    curRoll = "Category Roll"
  }

  var vehicleLabels: Record<string,string> = {"car":"Car","hover":"Hovercraft","plane":"Plane"}
  var curVehicles = getVehicles().map(v => vehicleLabels[v] || v).join(", ")

  return (
    <div className="min-h-screen">
      <div style={{position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "10px 20px 4px", background: "black"}}>
        <div style={{position: "relative", width: "40px", display: "flex", alignItems: "flex-start"}}>
          <a href="/settings"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}>
          <img
            src="/settings-icon.png"
            alt="Settings"
            style={{height: "32px", width: "auto", cursor: "pointer"}}
          /></a>
          {showTooltip && (
            <div style={{position: "absolute", top: "100%", left: 0, marginTop: "8px", background: "#333", color: "whitesmoke", padding: "8px 12px", borderRadius: "4px", whiteSpace: "nowrap", zIndex: 10000, fontSize: "0.85em"}}>
              <b><i>Roll Type: </i></b>{curRoll}<br />
              <b><i>Vehicles: </i></b>{curVehicles}
            </div>
          )}
        </div>
        <a href="/" style={{display: "flex", alignItems: "center"}}>
          <img
            src="/tt-draft-logo.png"
            alt="Main Site Logo"
            style={{height: "60px", width: "auto"}}
          />
        </a>
        <div style={{position: "relative", display: "flex", alignItems: "flex-start"}}>
          <button onClick={reloadMe} style={{fontSize: "2em", background: "none", border: "none", cursor: "pointer", color: "whitesmoke", lineHeight: 1}}
            onMouseEnter={() => setShowRerollTooltip(true)}
            onMouseLeave={() => setShowRerollTooltip(false)}>
            &#x27F3;
          </button>
          {showRerollTooltip && (
            <div style={{position: "absolute", top: "100%", right: 0, marginTop: "8px", background: "#333", color: "whitesmoke", padding: "8px 12px", borderRadius: "4px", whiteSpace: "nowrap", zIndex: 10000, fontSize: "0.85em"}}>
              Re-roll
            </div>
          )}
        </div>
      </div>
      <div className="@container min-w-screen" style={{paddingTop: "74px"}}>
        <div style={{position: "relative"}}>
          <div className="grid grid-cols-5">
            <RouletteSpinner key={"spin"+spinKey+"a"} bannedKeys={bannedKeys} bansComplete={bansComplete} onBan={handleBan} takenPairs={takenPairs}></RouletteSpinner>
            <RouletteSpinner key={"spin"+spinKey+"b"} bannedKeys={bannedKeys} bansComplete={bansComplete} onBan={handleBan} takenPairs={takenPairs}></RouletteSpinner>
            <RouletteSpinner key={"spin"+spinKey+"c"} bannedKeys={bannedKeys} bansComplete={bansComplete} onBan={handleBan} takenPairs={takenPairs}></RouletteSpinner>
            <RouletteSpinner key={"spin"+spinKey+"d"} bannedKeys={bannedKeys} bansComplete={bansComplete} onBan={handleBan} takenPairs={takenPairs}></RouletteSpinner>
            <RouletteSpinner key={"spin"+spinKey+"e"} bannedKeys={bannedKeys} bansComplete={bansComplete} onBan={handleBan} takenPairs={takenPairs}></RouletteSpinner>
          </div>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "6px",
            right: "6px",
            height: "180px",
            transform: "translateY(-50%)",
            border: "5px solid transparent",
            borderRadius: "8px",
            background: "repeating-linear-gradient(45deg, hotpink, hotpink 6px, white 6px, white 12px) border-box",
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
            zIndex: 10,
          }} />
        </div>
      </div>
    </div>
  );
}
