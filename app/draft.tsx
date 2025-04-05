'use client'

import Image from "next/image";
import { NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';
import RouletteSpinner from '@/components/rouletteSpinner';



export default function Draft() {

  const [spinnersArray, setSpinnersArray] = useState([ // maybe we could set the whole things "spinner" to a blank div to maintain the framing of it all??
    {id: 1, spinner: <RouletteSpinner rid={1} onClickCallback={() => removeMe(1)} key="1"></RouletteSpinner>},
    {id: 2, spinner: <RouletteSpinner rid={2} onClickCallback={() => removeMe(2)} key="2"></RouletteSpinner>},
    {id: 3, spinner: <RouletteSpinner rid={3} onClickCallback={() => removeMe(3)} key="3"></RouletteSpinner>},
    {id: 4, spinner: <RouletteSpinner rid={4} onClickCallback={() => removeMe(4)} key="4"></RouletteSpinner>},
    {id: 5, spinner: <RouletteSpinner rid={5} onClickCallback={() => removeMe(5)} key="5"></RouletteSpinner>}
  ])

  var deleted = 0

  const removeMe = (toDelete: number) => {
    if(deleted < 2) {
      deleted = deleted + 1
      var newArray = [...spinnersArray]
      newArray[newArray.findIndex((elem) => elem.id == toDelete)].spinner = <div key={toDelete} className="scrolltainer"></div>;
      console.log("deleting :" + toDelete +": "+deleted)
      setSpinnersArray([...newArray]);
    }
  }

  return (
    <div className="grid min-h-screen" style={{overflowY: "hidden"}}>
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
        <div className={"grid grid-cols-5"}>
          {
            spinnersArray.map((spinObj) => (
              <div key={spinObj.id}>{spinObj.spinner}</div>
            ))
          }
        </div>
      </div>
      <div className="selectorLine">----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div>
    </div>
  );
}
