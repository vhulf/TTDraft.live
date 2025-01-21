'use client'

import Image from "next/image";
import {useState, useEffect} from 'react';

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
  return (
    <div className="grid min-h-screen">
      <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
        <Image
          className=""
          src="/tt draft logo.png"
          alt="Main Site Logo"
          width={850}
          height={100}
          priority
        />
      </main>
      <div className="grid grid-cols-[20px_1fr_80px_1fr_20px] justify-center pt-50">
        <div></div>
        <div className="grid justify-center items-center place-content-center">
          <a href="#">
            <Image
                className="hover:scale-125 transition-all"
                src="/draft icon 1.png"
                alt="TT Draft Logo"
                width={275}
                height={275}
                priority
            />
          </a>
        </div>
        <div></div>
        <div className="grid justify-center items-center place-content-center">
          <a href="#">
            <Image
              className="hover:scale-125 transition-all"
              src="/settings icon.png"
              alt="Configure Image"
              width={275}
              height={275}
              priority
            />
          </a>
        </div>
      <div></div>
      </div>
      <footer className="flex gap-20 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >[contact]
        </a>
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >[links]
        </a>
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >[rules]
        </a>
        <a
          className="flex items-center gap-2 font-bold hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >[GitHub]
        </a>
      </footer>
    </div>
  );
}
