'use client'

import RouletteCard from "components/rouletteCard";
import { useLayoutEffect, useRef, useId, useState, useEffect, cloneElement } from "react";
import { getSettingsItem } from '../app/settings';

const categories = {
  "ancient-lake": ["car", "hover", "plane"],
  "fossil-canyon": ["car", "hover", "plane"],
  "jungle-falls": ["car", "hover", "plane"],
  "hot-top-volcano": ["hover", "plane"],
  "whale-bay": ["hover"],
  "pirate-lagoon": ["hover"],
  "crescent-island": ["car", "hover"],
  "treasure-caves": ["car", "hover", "plane"],
  "everfrost-peak": ["car", "hover", "plane"],
  "walrus-cove": ["car", "hover"],
  "snowball-valley": ["car", "hover"],
  "frosty-village": ["car", "hover", "plane"],
  "boulder-canyon": ["hover"],
  "greenwood-village": ["car", "hover"],
  "windmill-plains": ["car", "hover", "plane"],
  "haunted-woods": ["car", "hover"],
  "spacedust-alley": ["car", "hover", "plane"],
  "darkmoon-caverns": ["car", "hover"],
  "star-city": ["car", "hover", "plane"],
  "spaceport-alpha": ["car", "hover", "plane"]
}

const categoriesSerialized = [
  "ancient-lake:car", "ancient-lake:hover", "ancient-lake:plane",
  "fossil-canyon:car", "fossil-canyon:hover", "fossil-canyon:plane",
  "jungle-falls:car", "jungle-falls:hover", "jungle-falls:plane",
  "hot-top-volcano:hover", "hot-top-volcano:plane",
  "whale-bay:hover",
  "pirate-lagoon:hover",
  "crescent-island:car", "crescent-island:hover",
  "treasure-caves:car", "treasure-caves:hover", "treasure-caves:plane",
  "everfrost-peak:car", "everfrost-peak:hover", "everfrost-peak:plane",
  "walrus-cove:car", "walrus-cove:hover",
  "snowball-valley:car", "snowball-valley:hover",
  "frosty-village:car", "frosty-village:hover", "frosty-village:plane",
  "boulder-canyon:hover",
  "greenwood-village:car", "greenwood-village:hover",
  "windmill-plains:car", "windmill-plains:hover", "windmill-plains:plane",
  "haunted-woods:car", "haunted-woods:hover",
  "spacedust-alley:car", "spacedust-alley:hover", "spacedust-alley:plane",
  "darkmoon-caverns:car", "darkmoon-caverns:hover",
  "star-city:car", "star-city:hover", "star-city:plane",
  "spaceport-alpha:car", "spaceport-alpha:hover", "spaceport-alpha:plane"
]

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillSpinnerArray(id: string, allowedVehicles: string[]) {

  const mapKeys = Object.keys(categories)
  const validMaps = mapKeys.filter(m => categories[m].some(v => allowedVehicles.indexOf(v) !== -1))

  let toReturn = []

  for (let i = 0; i < 45; i++) {
    let ran1 = getRandomInt(0, validMaps.length - 1)
    let selectedMap = validMaps[ran1]
    let availableVehicles = categories[selectedMap].filter(v => allowedVehicles.indexOf(v) !== -1)
    let ran2 = getRandomInt(0, availableVehicles.length - 1)

    toReturn.push(<RouletteCard map={selectedMap} vehichle={availableVehicles[ran2]} dataKey={"card-"+i+"-"+id}></RouletteCard>)
  }

  return toReturn
}

const scrollToCard = (container: HTMLElement, cardNum: number, id: string) => {
  const sectionId = 'card-' + cardNum + '-' + id;
  const section = document.getElementById(sectionId);
  if (section) {
    container.scrollTo({ top: 0 });
    const cardEl = section as HTMLElement;
    const containerRect = container.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();
    const targetScroll = container.scrollTop + cardRect.top - containerRect.top - (containerRect.height / 2) + (cardRect.height / 2);
    container.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }
};

function fillSpinnerArraySer(id: string, allowedVehicles: string[]) {

  const filtered = categoriesSerialized.filter(entry => {
    const veh = entry.split(":")[1]
    return allowedVehicles.indexOf(veh) !== -1
  })

  let toReturn = []

  for (let i = 0; i < 45; i++) {
    let ran = getRandomInt(0, filtered.length - 1)
    let mappy = deserializeMap(filtered[ran])

    toReturn.push(<RouletteCard map={mappy[0]} vehichle={mappy[1]} key={"card-"+i} dataKey={"card-"+i+"-"+id}></RouletteCard>)
  }

  return toReturn
}

function deserializeMap(serialized:string) {
  let toRet = serialized.split(":")

  return toRet
}

interface SpinnerProps {
  bannedKeys?: Set<string>
  bansComplete?: boolean
  onBan?: (key: string) => void
}

const RouletteSpinner = ({ bannedKeys, bansComplete, onBan }: SpinnerProps) => {
  const bk = bannedKeys ?? new Set<string>();
  const bc = bansComplete ?? false;
  const ob = onBan ?? (() => {});
  const compId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<React.ReactElement[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    var allowed: string[] = ["car","hover","plane"]
    try {
      var raw = JSON.parse(localStorage.getItem("settings") || "null")
      if (raw && Array.isArray(raw.vehicles)) {
        allowed = raw.vehicles
      } else if (raw && typeof raw.vehicles === "string" && raw.vehicles !== "NOWIN") {
        allowed = raw.vehicles.split(",").filter(Boolean)
      }
    } catch {}
    if (getSettingsItem("rollMapFirst") == "true") {
      setCards(fillSpinnerArray(compId, allowed))
    } else {
      setCards(fillSpinnerArraySer(compId, allowed))
    }
  }, [])

  useLayoutEffect(() => {
    if (cards.length === 0) return
    const container = containerRef.current;
    if (container) {
      const selected = getRandomInt(5, 40);
      setSelectedIndex(selected);
      scrollToCard(container, selected, compId);

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.overflowY = "hidden";
        }
      }, 1200);
    }
  }, [cards]);
  
  return (
    <div ref={containerRef} style={{height: "calc(100vh - 74px)", overflowY: "auto", overflowX: "hidden", overflowAnchor: "none"}} id={compId} className="scrolltainer">
      <div style={{padding: "0 6px"}}>
          {cards.map((cardItem, i) => (
              <li key={cardItem.key} style={{height: "180px", listStyle: "none"}}>
                {cloneElement(cardItem, {
                  isSelected: selectedIndex === i,
                  isBanned: bk.has((cardItem.props as any).dataKey),
                  bansComplete: bc,
                  onBan: ob,
                })}
              </li>
          ))}
        </div>
    </div>
  );
}

export default RouletteSpinner;
