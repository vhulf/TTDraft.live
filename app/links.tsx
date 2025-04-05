'use client'

import Image from "next/image";
import { NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function Links() {
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
        <h1 className="grid justify-center">Some stuff we think is important...</h1>
        <br></br>
        <br></br>
        <h2 className="grid justify-center">
          <NavLink
          className="font-bold hover:underline hover:underline-offset-4"
          to="https://dkr64.com/"
          >[DKR64.com]</NavLink>
        </h2>
        <h2 className="grid justify-center">
          <NavLink
          className="font-bold hover:underline hover:underline-offset-4"
          to="https://dkr64.com/"
          >[DKR64.com]</NavLink>
        </h2>
        <h2 className="grid justify-center">
          <NavLink
          className="font-bold hover:underline hover:underline-offset-4"
          to="https://dkr64.com/"
          >[DKR64.com]</NavLink>
        </h2>
      </div>
    </div>
  );
}
