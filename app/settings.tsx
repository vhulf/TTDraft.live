'use client'

import { useEffect } from "react";

export const defaultSettings = {
  "rollMapFirst":"true"
}

export function getSettingsItem(key: string) {
  if (typeof window !== "undefined") {
    var curSettings = JSON.parse(localStorage.getItem("settings") || JSON.stringify(defaultSettings));
    return curSettings[key]
  } else {
    return "NOWIN"
  }
}

export function setSettingsItem(key: string, value: string) {
  var curSettings = JSON.parse(localStorage.getItem("settings") ||  JSON.stringify(defaultSettings))
  curSettings[key] = value
  localStorage.setItem('settings', JSON.stringify(curSettings))
}

function setSettingsItemAndReload(key: string, value: string) {
  setSettingsItem(key, value)
  window.location.reload();
}

export default function Settings() {
  var curRoll = ""
  var curRollString = ""
  console.log(getSettingsItem("rollMapFirst"))

  if (getSettingsItem("rollMapFirst") === "true") {
    curRoll = "Selected: Mapfirst Roll"
    curRollString = "The Map pool is rolled on first, then category... more hober and plane possible, and maps with fewer categories are much more likely!"
  } else if (getSettingsItem("rollMapFirst") === "false") {
    curRoll = "Selected: Category Roll"
    curRollString = "All categories will be rolled in a big pool... Car holds some weight across the board, and maps with less categories are less likely!"
  }
  

  return (  
    <div className="grid min-h-screen">
      <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
      <a href="/" style={{"zIndex":"99999"}}>
          <img
            className=""
            src="/tt-draft-logo.png"
            alt="Main Site Logo"
            width={850}
            height={100}
          />
        </a>
      </main>
      <div>
        <h1 className="grid justify-center">You&apos;re setting up the game now!</h1>
        <br></br>
        <h2 className="grid justify-center">{curRoll}</h2>
        <p className="grid justify-center">{curRollString}</p>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <li><button name="switchRollType" onClick={() => setSettingsItemAndReload("rollMapFirst", "false")}>  Switch to Category Roll - All roll at once (more car possible)</button></li>
        <li><button name="switchRollType" onClick={() => setSettingsItemAndReload("rollMapFirst", "true")}>  Switch to Mapfirst Roll - Roll map <i>then</i> category (more hober & plane possible)</button></li>
      </div>
    </div>
  );
}
