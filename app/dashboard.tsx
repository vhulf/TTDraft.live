'use client'

import Image from "next/image";
import { NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {defaultSettings} from './settings';

export default function Dashboard() {
  const [width, setWidth]   = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (localStorage.getItem("settings") == null) {
    localStorage.setItem("settings", JSON.stringify(defaultSettings))
  }

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
      <div className="grid grid-cols-[20px_1fr_80px_1fr_20px] justify-center pt-50">
        <div></div>
        <div className="grid justify-center items-center place-content-center">
          <NavLink to="/draft">
            <Image
                className="hover:scale-125 transition-all"
                src="/draft-icon-1.png"
                alt="TT Draft Logo"
                width={275}
                height={275}
                priority
            />
          </NavLink>
        </div>
        <div></div>
        <div className="grid justify-center items-center place-content-center">
          <NavLink to="/settings">
            <Image
              className="hover:scale-125 transition-all"
              src="/settings-icon.png"
              alt="Configure Image"
              width={275}
              height={275}
              priority
            />
          </NavLink>
        </div>
      <div></div>
      </div>
      <footer className="flex gap-20 flex-wrap items-center justify-center">
        <NavLink
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          to="/contact"
        >[contact]
        </NavLink>
        <NavLink
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          to="/links"
        >[links]
        </NavLink>
        <NavLink
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          to="/rules"
        >[rules]
        </NavLink>
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
