'use client'

import {useState, useEffect} from 'react';
import {defaultSettings} from './settings';
import { setSettingsItem } from './settings';

export default function Dashboard() {
  const [showDraftTooltip, setShowDraftTooltip] = useState(false);
  const [showSettingsTooltip, setShowSettingsTooltip] = useState(false);

  if (typeof window !== "undefined") {
    const [width, setWidth]   = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log(width, height)
    }
  
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [updateDimensions]);
  
    if (localStorage.getItem("settings") == null) {
      setSettingsItem("rollMapFirst", "true")
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{padding: "clamp(10px, 2vw, 20px)", boxSizing: "border-box"}}>
      <a href="/draft" style={{display: "flex", justifyContent: "center", flexShrink: 0}}>
        <img
          src="/tt-draft-logo.png"
          alt="Main Site Logo"
          style={{maxWidth: "clamp(300px, 70vw, 850px)", width: "100%", height: "auto"}}
        />
      </a>
      <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div className="grid grid-cols-[20px_1fr_80px_1fr_20px] justify-center w-full">
          <div></div>
          <div className="grid justify-center items-center place-content-center">
            <div style={{position: "relative", display: "inline-block"}}
              onMouseEnter={() => setShowDraftTooltip(true)}
              onMouseLeave={() => setShowDraftTooltip(false)}>
              <a href="/draft">
                <img
                  className="hover:scale-125 transition-all"
                  src="/draft-icon-1.png"
                  alt="TT Draft Logo"
                  style={{width: "clamp(175px, 25vw, 275px)", height: "auto", aspectRatio: "1"}}
                />
              </a>
              {showDraftTooltip && (
                <div style={{position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "40px", background: "#333", color: "whitesmoke", padding: "8px 12px", borderRadius: "4px", whiteSpace: "nowrap", zIndex: 10000, fontSize: "0.85em"}}>
                  Go Draft!
                </div>
              )}
            </div>
          </div>
          <div></div>
          <div className="grid justify-center items-center place-content-center">
            <div style={{position: "relative", display: "inline-block"}}
              onMouseEnter={() => setShowSettingsTooltip(true)}
              onMouseLeave={() => setShowSettingsTooltip(false)}>
              <a href="/settings">
                <img
                  className="hover:scale-125 transition-all"
                  src="/settings-icon.png"
                  alt="Configure Image"
                  style={{width: "clamp(175px, 25vw, 275px)", height: "auto", aspectRatio: "1"}}
                />
              </a>
              {showSettingsTooltip && (
                <div style={{position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "40px", background: "#333", color: "whitesmoke", padding: "8px 12px", borderRadius: "4px", whiteSpace: "nowrap", zIndex: 10000, fontSize: "0.85em"}}>
                  Change Settings!
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <footer className="flex gap-8 flex-wrap items-center justify-center max-sm:pb-[24px]" style={{flexShrink: 0}}>
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="/contact"
        >[contact]
        </a>
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="/links"
        >[links]
        </a>
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="/rules"
        >[rules]
        </a>
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="https://github.com/vhulf/TTDraft.live"
          target="_blank"
          rel="noopener noreferrer"
        >[GitHub]
        </a>
      </footer>
    </div>
  );
}
