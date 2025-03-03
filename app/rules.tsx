'use client'

import Image from "next/image";
import { NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function Rules() {
  return (
    <>
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
        <div className="grid justify-center">
          <h1 className="grid justify-center m-0 p-0">Welcome to TT Draft!</h1>
          <h2 className="grid justify-center">~ a game made with &lt;3 by vhulf & peaches ~</h2>
          <br></br>
          <p className="grid justify-center">The greatest way to face-off against your friends in head-to-head DKR Time Trial madness!</p>
          <p className="grid justify-center m-50">After optionally setting up your game rules, click the draft icon on the homepage to begin a draft, from here a roll of five TT categories will be shown to you. You and your friend will each ban one of these categories, from there you'll both have *TIMELIMIT* to get your best time on EACH of the leftover draft categories!</p>
          <p className="grid justify-center">(We recommend having a notecard handy, or you can use the ones on the game running screen with timer? (TBI))</p>
          <br></br>
          <p className="grid justify-center">We had a blast imagining this gamemode and trying it out some, and we hope you do too! We recommend draft tournaments to be best of three or five to truly decide who the fastest clock is. c:</p>
        </div>
      </div>
    </>
  );
}