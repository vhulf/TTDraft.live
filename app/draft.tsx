'use client'

import {useState, useRef, useEffect} from 'react';
import RouletteSpinner from 'components/rouletteSpinner';
import TimerModal from 'components/timerModal';
import { getSettingsItem, getVehicles } from './settings';

interface PairResult {
  map: string
  vehicle: string
  dataKey: string
}

export default function Draft() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showRerollTooltip, setShowRerollTooltip] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [bannedKeys, setBannedKeys] = useState<Set<string>>(new Set());
  const bansComplete = bannedKeys.size >= 2;
  const takenPairs = useRef(new Set<string>());
  const [selectedPairs, setSelectedPairs] = useState<PairResult[]>([]);
  const [timerModalOpen, setTimerModalOpen] = useState(false);

  const singleMapDraft = getSettingsItem("singleMapDraft") === "true";
  const spinnerCount = singleMapDraft ? 3 : 5;

  useEffect(() => {
    if (bansComplete && selectedPairs.length === spinnerCount) {
      setTimerModalOpen(true);
    }
  }, [bansComplete, selectedPairs, spinnerCount]);

  function handleBan(key: string) {
    setBannedKeys(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }

  function handleResult(pair: PairResult) {
    setSelectedPairs(prev => {
      if (prev.some(p => p.dataKey === pair.dataKey)) return prev;
      return [...prev, pair];
    });
  }

  function reloadMe() {
    setSpinKey((k) => k + 1);
    setBannedKeys(new Set());
    takenPairs.current = new Set();
    setSelectedPairs([]);
    setTimerModalOpen(false);
  }

  const nonBanned = selectedPairs.filter(p => !bannedKeys.has(p.dataKey));

  var curRoll = "";

  if (getSettingsItem("rollMapFirst") == "true") {
    curRoll = "Map-first Roll"
    
  } else if (getSettingsItem("rollMapFirst") == "false") {
    curRoll = "Category Roll"
  }

  var curMode = singleMapDraft ? "Single" : "Standard"

  var vehicleLabels: Record<string,string> = {"car":"Car","hover":"Hovercraft","plane":"Plane"}
  var curVehicles = getVehicles().map(v => vehicleLabels[v] || v).join(", ")

  return (
    <div className="min-h-screen">
      <div style={{position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "10px 20px 4px", background: "var(--background)"}}>
        <div style={{position: "relative", display: "flex", alignItems: "flex-start"}}>
          <a href="/settings"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}>
          <img
            src="/settings-icon.png"
            alt="Settings"
            className="nav-icon"
            style={{width: "auto", cursor: "pointer"}}
          /></a>
          {showTooltip && (
            <div style={{position: "absolute", top: "100%", left: 0, marginTop: "8px", background: "#333", color: "whitesmoke", padding: "8px 12px", borderRadius: "4px", whiteSpace: "nowrap", zIndex: 10000, fontSize: "0.85em"}}>
              <b><i>Roll Type: </i></b>{curRoll}<br />
              <b><i>Vehicles: </i></b>{curVehicles}<br />
              <b><i>Draft Mode: </i></b>{curMode}
            </div>
          )}
        </div>
        <a href="/" style={{display: "flex", alignItems: "center"}}>
          <img
            src="/tt-draft-logo.png"
            alt="Main Site Logo"
            className="nav-logo"
            style={{width: "auto"}}
          />
        </a>
        <div style={{position: "relative", display: "flex", alignItems: "flex-start"}}>
          <button onClick={reloadMe} className="nav-reroll" style={{background: "none", border: "none", cursor: "pointer", color: "whitesmoke", lineHeight: 1}}
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
          <div className={"grid " + (singleMapDraft ? "grid-cols-3" : "grid-cols-5")}>
            {Array.from({ length: spinnerCount }, (_, i) => (
              <RouletteSpinner key={"spin"+spinKey+String.fromCharCode(97+i)} bannedKeys={bannedKeys} bansComplete={bansComplete} onBan={handleBan} takenPairs={takenPairs} onResult={handleResult}></RouletteSpinner>
            ))}
          </div>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "6px",
            right: "6px",
            height: singleMapDraft ? "clamp(90px, 30vw, 800px)" : "clamp(90px, 18vw, 400px)",
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
      <TimerModal
        key={"timer"+spinKey}
        selectedPairs={nonBanned}
        open={timerModalOpen}
        onClose={() => setTimerModalOpen(false)}
        onReopen={() => setTimerModalOpen(true)}
      />
      <style>{`
        .nav-icon { height: clamp(32px, 6.7vw, 69px); width: auto; }
        .nav-logo { height: clamp(60px, 12.6vw, 129px); width: auto; }
        .nav-reroll { font-size: clamp(2em, 6.7vw, 4.3em); }
        @media (max-width: 1023px) {
          .nav-icon { height: 48px; }
          .nav-logo { height: 45px; }
          .nav-reroll { font-size: 3em; }
        }
      `}</style>
    </div>
  );
}
