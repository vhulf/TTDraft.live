'use client'

import Image from "next/image";
import { NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function Contact() {
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
        <h1 className="grid justify-center">Oh, you wanna reach out?</h1>
        <br></br>
        <h2 className="grid justify-center">
          <NavLink
          className="font-bold hover:underline hover:underline-offset-4"
          to="https://discord.com/users/1161442807005859880"
          >[peaches - Discord]</NavLink>
        </h2>
        <h2 className="grid justify-center">
          <NavLink
          className="font-bold hover:underline hover:underline-offset-4"
          to="https://discord.com/users/149282781640392706"
          >[vhulf - Discord]</NavLink>
        </h2>
      </div>
    </div>
  );
}
