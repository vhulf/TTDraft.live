'use client'

import {useState} from 'react';

export default function Links() {
  const [showDraftTooltip, setShowDraftTooltip] = useState(false);
  const [showSettingsTooltip, setShowSettingsTooltip] = useState(false);
  return (
    <div className="grid min-h-screen">
      <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
      <div style={{position: "absolute", left: "20px", top: "10px", display: "flex", alignItems: "center"}}
        onMouseEnter={() => setShowDraftTooltip(true)}
        onMouseLeave={() => setShowDraftTooltip(false)}>
        <a href="/draft">
            <img
              src="/draft-icon-1.png"
              alt="Draft"
              className="nav-icon"
              style={{width: "auto", cursor: "pointer"}}
            />
          </a>
          {showDraftTooltip && (
            <div style={{position: "absolute", top: "100%", left: 0, marginTop: "8px", background: "#333", color: "whitesmoke", padding: "8px 12px", borderRadius: "4px", whiteSpace: "nowrap", zIndex: 10000, fontSize: "0.85em"}}>
              Go Draft!
            </div>
          )}
        </div>
          <a href="/" style={{position: "absolute", left: "50%", top: "10px", transform: "translateX(-50%)", display: "flex", alignItems: "center"}}>
            <img
              src="/tt-draft-logo.png"
              alt="Main Site Logo"
              className="nav-logo"
              style={{width: "auto"}}
          />
        </a>
        <div style={{position: "absolute", right: "20px", top: "10px", display: "flex", alignItems: "center"}}
          onMouseEnter={() => setShowSettingsTooltip(true)}
          onMouseLeave={() => setShowSettingsTooltip(false)}>
          <a href="/settings">
              <img
                src="/settings-icon.png"
                alt="Settings"
                className="nav-icon"
                style={{width: "auto", cursor: "pointer"}}
            />
          </a>
          {showSettingsTooltip && (
            <div style={{position: "absolute", top: "100%", right: 0, marginTop: "8px", background: "#333", color: "whitesmoke", padding: "8px 12px", borderRadius: "4px", whiteSpace: "nowrap", zIndex: 10000, fontSize: "0.85em"}}>
              Change Settings!
            </div>
          )}
        </div>
          <style>{`
            .nav-icon { height: clamp(32px, 6.7vw, 69px); width: auto; }
            .nav-logo { height: clamp(60px, 12.6vw, 129px); width: auto; }
            @media (max-width: 1023px) {
              .nav-icon { height: 48px; }
              .nav-logo { height: 45px; }
            }
          `}</style>
        </main>
      <div>
        <h1 className="grid justify-center">Some stuff we think is important...</h1>
        <br></br>
        <br></br>
        <h2 className="grid justify-center">
          <a
          className="font-bold hover:underline hover:underline-offset-4"
          href="https://dkr64.com/"
          >[DKR64.com]</a>
        </h2>
        <h2 className="grid justify-center">
          <a
          className="font-bold hover:underline hover:underline-offset-4"
          href="https://dkr64.com/"
          >[DKR64.com]</a>
        </h2>
        <h2 className="grid justify-center">
          <a
          className="font-bold hover:underline hover:underline-offset-4 grid justify-center"
          href="https://discord.com/invite/J8rfn9e"
          >[DKR Runners - Discord Invite]</a>
        </h2>
      </div>
    </div>
  );
}
