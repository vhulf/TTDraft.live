'use client'

export default function Rules() {
  return (
    <>
      <div className="grid min-h-screen">
        <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
        <a href="/" style={{position: "absolute", left: "50%", top: "10px", transform: "translateX(-50%)", display: "flex", alignItems: "center"}}>
            <img
              src="/tt-draft-logo.png"
              alt="Main Site Logo"
              style={{height: "60px", width: "auto"}}
            />
          </a>
        </main>
        <div className="">
          <h1 className="grid justify-center">Welcome to TT Draft!</h1>
          <h2 className="grid justify-center">~ a DKR gamemode made with &lt;3 by vhulf & peaches ~</h2>
          <br></br>
          <p className="grid justify-center">The greatest way to face-off against your friends in head-to-head DKR Time Trial madness!  CURRENTLY A WORK IN PROGRESS... (character draft planned!)</p>
          <p className="grid justify-center">After optionally setting up your game rules, click the draft icon on the homepage (or in the top right corner of settings) to begin a draft.</p>
          <p className="grid justify-center">From here a roll of five TT categories will be shown to you. You and your friend will each ban ONE of these categories (click on the blinkies!)</p>
          <p className="grid justify-center">Now you both have *TIMELIMIT* (we recommend 10mins!) to get your best time on EACH of the leftover draft categories!</p>
          <p className="grid justify-center">(We recommend having a notecard handy)</p>
          <br></br>
          <p className="grid justify-center">Whenever you&apos;re finished with your draft, click the re-roll spinner to start another draft, or the cog to switch up your settings! :D</p>
          <br></br>
          <br></br>
          <br></br>
          <p className="grid justify-center">We had a blast imagining this gamemode and trying it out some, and we hope you do too! We recommend draft tournaments to be best of three or five to truly decide...</p>
          <p className="grid justify-center">who the fastest clock is. c:</p>
        </div>
      </div>
    </>
  );
}