'use client'

import Image from "next/image";
import { NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';

export const defaultSettings = {
  "rollMapFirst":"true"
}

export function getSettingsItem(key) {
  const curSettings = localStorage.getItem("settings") || JSON.stringify(defaultSettings);
  let toReturn = JSON.parse(curSettings)
  return curSettings[key];
}

export function setSettingsItem(key, value) {
  const curSettings = JSON.parse(localStorage.getItem("settings") || "")
  curSettings[key] = JSON.stringify(value)
  localStorage.setItem('settings', JSON.stringify(curSettings))
}

export function Settings() {

  return (
    <div className="grid min-h-screen">
      <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
      <NavLink to="/">
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
        <h1 className="grid justify-center">You're setting up the game now!</h1>
        <button name="switchRollType" onClick={() => setSettingsItem("rollMapFirst", "false")}>Switch to Category Roll</button>
        <button name="switchRollType" onClick={() => setSettingsItem("rollMapFirst", "true")}>Switch to Mapfirst Roll</button>
      </div>
    </div>
  );
}
