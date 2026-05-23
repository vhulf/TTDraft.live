'use client'

import {useState} from 'react';

export default function Rules() {
  const [showDraftTooltip, setShowDraftTooltip] = useState(false);
  const [showSettingsTooltip, setShowSettingsTooltip] = useState(false);
  return (
    <>
      <div style={{height: "100vh", overflowY: "auto"}}>
        <div style={{position: "relative", paddingTop: "90px"}}>
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
        </div>
        <div style={{padding: "clamp(100px, 15vh, 160px) 5vw 40px"}}>
          <h1 style={{textAlign: "center", fontSize: "clamp(1.2em, 4vw, 2em)"}}>Welcome to TT Draft!</h1>
          <h2 style={{textAlign: "center", fontSize: "clamp(0.7em, 2.5vw, 1em)", color: "#aaa"}}>~ a DKR gamemode made with &lt;3 by vhulf & peaches ~</h2>
          <br></br>
          <p style={{textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "0 4vw", fontSize: "clamp(0.85em, 2.5vw, 1.1em)", lineHeight: 1.6}}>The greatest way to face-off against your friends in head-to-head DKR Time Trial madness!  CURRENTLY A WORK IN PROGRESS... (character draft planned!)</p>
          <p style={{textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "0 4vw", fontSize: "clamp(0.85em, 2.5vw, 1.1em)", lineHeight: 1.6}}>After optionally setting up your game rules, click the draft icon on the homepage (or in the top right corner of settings) to begin a draft.</p>
          <p style={{textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "0 4vw", fontSize: "clamp(0.85em, 2.5vw, 1.1em)", lineHeight: 1.6}}>From here a roll of five TT categories will be shown to you. You and your friend will each ban ONE of these categories (click on the blinkies!)</p>
          <p style={{textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "0 4vw", fontSize: "clamp(0.85em, 2.5vw, 1.1em)", lineHeight: 1.6}}>Now you both have *TIMELIMIT* (we recommend 10mins!) to get your best time on EACH of the leftover draft categories!</p>
          <p style={{textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "0 4vw", fontSize: "clamp(0.85em, 2.5vw, 1.1em)", lineHeight: 1.6}}>(We recommend having a notecard handy)</p>
          <br></br>
          <p style={{textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "0 4vw", fontSize: "clamp(0.85em, 2.5vw, 1.1em)", lineHeight: 1.6}}>Whenever you&apos;re finished with your draft, click the re-roll spinner to start another draft, or the cog to switch up your settings! :D</p>
          <br></br>
          <br></br>
          <br></br>
          <p style={{textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "0 4vw", fontSize: "clamp(0.85em, 2.5vw, 1.1em)", lineHeight: 1.6}}>We had a blast imagining this gamemode and trying it out some, and we hope you do too! We recommend draft tournaments to be best of three or five to truly decide...</p>
          <p style={{textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "0 4vw", fontSize: "clamp(0.85em, 2.5vw, 1.1em)", lineHeight: 1.6}}>who the fastest clock is. c:</p>
        </div>
      </div>
    </>
  );
}