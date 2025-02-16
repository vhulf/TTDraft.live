'use client'

import Image from "next/image";
import { NavLink } from 'react-router-dom';

export default function Template() {
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
        <h1 className="grid justify-center">You're doing something now!</h1>
      </div>
    </div>
  );
}
