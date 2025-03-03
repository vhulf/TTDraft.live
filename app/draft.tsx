'use client'

import Image from "next/image";
import { NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';
import RouletteSpinner from '@/components/rouletteSpinner';

export default function Draft() {
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
      <div className="@container">
        <div className="grid grid-cols-5">
          <RouletteSpinner></RouletteSpinner>
          <RouletteSpinner></RouletteSpinner>
          <RouletteSpinner></RouletteSpinner>
          <RouletteSpinner></RouletteSpinner>
          <RouletteSpinner></RouletteSpinner>
        </div>
      </div>
      <div className="selectorLine">----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div>
    </div>
  );
}
