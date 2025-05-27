'use client'

import {useLocation} from 'react-router';
import RouletteSpinner from 'components/rouletteSpinner';
import { getSettingsItem } from './settings';

export default function Draft() {

  function reloadMe() {
    window.location.reload();
  }

  const location = useLocation();
  let keyHelp = "nondoc";

  if (typeof document !== "undefined") {
    keyHelp = document.location.href;
  }

  var curRoll = "";

  if (getSettingsItem("rollMapFirst") == "true") {
    curRoll = "Selected: Mapfirst Roll (map rolled first, maps with less categories more likely, more hober/plane likely)"
    // curRollString = "The Map pool is rolled on first, then category... in theory more hober and plane should be seen!"
    
  } else if (getSettingsItem("rollMapFirst") == "false") {
    curRoll = "Selected: Category Roll (categories are rolled at once, more car likely)"
   //  curRollString = "All categories will be rolled in a big pool! Maps with less categories are less likely, and car holds some weight across the board!"
  }

  return (
    <div key={location.key} className="grid min-h-screen">
      <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
      <a href="/">
          <img
            className=""
            src="/tt-draft-logo.png"
            alt="Main Site Logo"
            width={850}
            height={100}
          />
        </a>
      </main>
      <button className='' onClick={reloadMe} style={{"fontSize": "15em", "position": "fixed", "right": "10px", "top": "-100px"}}><h1>&#x27F3;</h1></button>
      <p style={{"fontSize": "1em", "position": "fixed", "left": "10px", "top": "10px"}}>{curRoll}</p>
      <div className="@container min-w-screen">
        <div className="grid grid-cols-5">
          <RouletteSpinner key={keyHelp+"a"} ></RouletteSpinner>
          <RouletteSpinner key={keyHelp+"b"}></RouletteSpinner>
          <RouletteSpinner key={keyHelp+"c"}></RouletteSpinner>
          <RouletteSpinner key={keyHelp+"d"}></RouletteSpinner>
          <RouletteSpinner key={keyHelp+"e"}></RouletteSpinner>
        </div>
      </div>
      <div className="selectorLine">--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div>
    </div>
  );
}
