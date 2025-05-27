'use client'

import {useState, useEffect} from 'react';
import {defaultSettings} from './settings';
import { setSettingsItem } from './settings';

export default function Dashboard() {
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
      <div className="grid grid-cols-[20px_1fr_80px_1fr_20px] justify-center pt-50">
        <div></div>
        <div className="grid justify-center items-center place-content-center">
          <a href="/draft">
            <img
                className="hover:scale-125 transition-all"
                src="/draft-icon-1.png"
                alt="TT Draft Logo"
                width={275}
                height={275}
            />
          </a>
        </div>
        <div></div>
        <div className="grid justify-center items-center place-content-center">
          <a href="/settings">
            <img
              className="hover:scale-125 transition-all"
              src="/settings-icon.png"
              alt="Configure Image"
              width={275}
              height={275}
            />
          </a>
        </div>
      <div></div>
      </div>
      <footer className="flex gap-20 flex-wrap items-center justify-center">
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
