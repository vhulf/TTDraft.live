'use client'

import Image from "next/image";
import { NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function Settings() {
  return (
    <div className="grid min-h-screen">
      <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
      <NavLink to="/">
          <Image
            className=""
            src="/ttdraftlogo.png"
            alt="Main Site Logo"
            width={850}
            height={100}
            priority
          />
        </NavLink>
      </main>
      <div>
        <h1 className="grid justify-center">You're setting up the game now!</h1>
      </div>
    </div>
  );
}
