'use client'

import Image from "next/image";
import { NavLink } from 'react-router-dom';

export const defaultSettings = {
  "rollMapFirst":"true"
}

export function getSettingsItem(key: string) {
  const curSettings = localStorage.getItem("settings") || JSON.stringify(defaultSettings);
  // let toReturn = JSON.parse(curSettings)
  return curSettings[Number(key)];
}

export function setSettingsItem(key: string, value: string) {
  const curSettings = JSON.parse(localStorage.getItem("settings") || "")
  curSettings[key] = JSON.stringify(value)
  localStorage.setItem('settings', JSON.stringify(curSettings))
}

export function Settings() {

  return (
    <div className="grid min-h-screen">
      <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
      <NavLink to="/" style={{"zIndex":"99999"}}>
          <Image
            className=""
            src="/tt-draft-logo.png"
            alt="Main Site Logo"
            width={850}
            height={100}
            priority
          />
        </NavLink>
      </main>
      <div>
        <h1 className="grid justify-center">You&apos;re setting up the game now!</h1>
        <li><button name="switchRollType" onClick={() => setSettingsItem("rollMapFirst", "false")}>Switch to Category Roll</button></li>
        <li><button name="switchRollType" onClick={() => setSettingsItem("rollMapFirst", "true")}>Switch to Mapfirst Roll</button></li>
      </div>
    </div>
  );
}
