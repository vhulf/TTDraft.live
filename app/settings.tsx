'use client'

import { useState, useEffect } from "react";

export const defaultSettings = {
  "rollMapFirst":"true",
  "vehicles":["car","hover","plane"]
}

export function getSettingsItem(key: string) {
  if (typeof window !== "undefined") {
    var curSettings = JSON.parse(localStorage.getItem("settings") || JSON.stringify(defaultSettings));
    return curSettings[key]
  } else {
    return "NOWIN"
  }
}

export function getVehicles(): string[] {
  var raw = getSettingsItem("vehicles")
  if (Array.isArray(raw)) return raw
  if (typeof raw === "string" && raw !== "NOWIN") return raw.split(",").filter(Boolean)
  return ["car","hover","plane"]
}

export function setSettingsItem(key: string, value: any) {
  var curSettings = JSON.parse(localStorage.getItem("settings") ||  JSON.stringify(defaultSettings))
  curSettings[key] = value
  localStorage.setItem('settings', JSON.stringify(curSettings))
}

export default function Settings() {
  const [mounted, setMounted] = useState(false)
  const [rollMapFirst, setRollMapFirst] = useState("true")
  const [vehicles, setVehicles] = useState<string[]>([])
  const [showDraftTooltip, setShowDraftTooltip] = useState(false)
  useEffect(() => {
    var rv = getSettingsItem("rollMapFirst")
    setRollMapFirst(rv === "true" || rv === "false" ? rv : "true")
    setVehicles(getVehicles())
    setMounted(true)
  }, [])

  const rollDescriptions: Record<string, { label: string, desc: string }> = {
    "true": { label: "Map-first", desc: "The map pool is rolled first, then a vehicle category. More hovercraft and plane possibilities, and maps with fewer categories appear much more often." },
    "false": { label: "Category Roll", desc: "All map and vehicle combos are rolled from a single pool. Car categories carry more weight overall, and maps with fewer categories are less likely to appear." }
  }

  const vehicleOptions = [
    { value: "car", label: "Car" },
    { value: "hover", label: "Hovercraft" },
    { value: "plane", label: "Plane" }
  ]

  function handleSwitch(value: string) {
    setSettingsItem("rollMapFirst", value)
    setRollMapFirst(value)
  }

  function toggleVehicle(value: string) {
    var next = [...vehicles]
    var idx = next.indexOf(value)
    if (idx !== -1) {
      if (next.length <= 1) return
      next.splice(idx, 1)
    } else {
      next.push(value)
    }
    setVehicles(next)
    setSettingsItem("vehicles", next)
  }

  return (  
    <div className="grid min-h-screen">
      <div style={{position: "fixed", top: "10px", left: "20px", zIndex: 9999, display: "flex", alignItems: "flex-start"}}>
        <a href="/draft"
          onMouseEnter={() => setShowDraftTooltip(true)}
          onMouseLeave={() => setShowDraftTooltip(false)}>
          <img
            src="/draft-icon-1.png"
            alt="Draft"
            style={{height: "32px", width: "auto", cursor: "pointer"}}
          />
        </a>
        {showDraftTooltip && (
          <div style={{position: "absolute", top: "100%", left: 0, marginTop: "8px", background: "#333", color: "whitesmoke", padding: "8px 12px", borderRadius: "4px", whiteSpace: "nowrap", zIndex: 10000, fontSize: "0.85em"}}>
            Go Draft!
          </div>
        )}
      </div>
      <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
      <a href="/" style={{position: "absolute", left: "50%", top: "10px", transform: "translateX(-50%)", display: "flex", alignItems: "center"}}>
          <img
            src="/tt-draft-logo.png"
            alt="Main Site Logo"
            style={{height: "60px", width: "auto"}}
          />
        </a>
      </main>
      {mounted && (
      <div className="flex justify-center">
        <div className="w-full max-w-lg px-4">
          <div className="border border-gray-600 rounded-lg p-5 mb-6">
            <h2 className="text-lg font-semibold mb-1">Roll Type</h2>
            <p className="text-sm text-gray-400 mb-4">Determines how map and vehicle categories are selected during a draft.</p>

            <div className="flex gap-3 mb-4">
              <button
                name="switchRollType"
                onClick={() => handleSwitch("true")}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-all border ${rollMapFirst === "true" ? "bg-white text-black border-white" : "bg-transparent text-gray-300 border-gray-600 hover:border-gray-400"}`}
              >
                Map-first
              </button>
              <button
                name="switchRollType"
                onClick={() => handleSwitch("false")}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-all border ${rollMapFirst === "false" ? "bg-white text-black border-white" : "bg-transparent text-gray-300 border-gray-600 hover:border-gray-400"}`}
              >
                Category Roll
              </button>
            </div>

            <p className="text-sm text-gray-400">{rollDescriptions[rollMapFirst].desc}</p>
          </div>

          <div className="border border-gray-600 rounded-lg p-5 mb-6">
            <h2 className="text-lg font-semibold mb-1">Vehicles</h2>
            <p className="text-sm text-gray-400 mb-4">Choose which vehicle types can appear in drafts. At least one must remain selected.</p>

            <div className="flex gap-3">
              {vehicleOptions.map((v) => {
                var active = vehicles.indexOf(v.value) !== -1
                return (
                  <button
                    key={v.value}
                    onClick={() => toggleVehicle(v.value)}
                    className={`flex-1 px-4 py-2 rounded-md font-medium transition-all border ${active ? "bg-white text-black border-white" : "bg-transparent text-gray-300 border-gray-600 hover:border-gray-400"}`}
                  >
                    {v.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
