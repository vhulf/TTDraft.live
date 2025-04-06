import RouletteCard from "@/components/rouletteCard";
import { useEffect } from "react";
import  uuid  from "react-uuid";
import { getSettingsItem } from '../app/settings';

type callbackFunc = (number: number) => void;

interface Props {
  rid: number
  onClickCallback: callbackFunc
}

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

function fillSpinnerArray(id: string) {
  let toReturn = []

  for (let i = 0; i < 45; i++) {
    const ran1 = getRandomInt(0, 19)
    const ran2 = getRandomInt(0, [Object.keys(categories)[ran1]].length-1)


    toReturn.push(<RouletteCard map={Object.keys(categories)[ran1]} vehichle={categories[(Object.keys(categories)[ran1])][ran2]} key={"card-"+i+"-"+id} dataKey={"card-"+i+"-"+id}></RouletteCard>)
  }

  return toReturn
}

const scroll = (cardNum: number, id: string) => {
  const section = document.querySelector( '#card-'+cardNum+'-'+id );
  if (section) {section.scrollIntoView( { behavior: 'smooth', block: 'center' } )};
};

function fillSpinnerArraySer(id: string) {
  const toReturn = []

  for (let i = 0; i < 45; i++) {
    const ran = getRandomInt(0, categoriesSerialized.length - 1)
    const mappy = deserializeMap(categoriesSerialized[ran])

    toReturn.push(<RouletteCard map={mappy[0]} vehichle={mappy[1]} key={"card-"+i} dataKey={"card-"+i+"-"+id}></RouletteCard>)
  }

  return toReturn
}

function deserializeMap(serialized:string) {
  const toRet = serialized.split(":")

  return toRet
}

const RouletteSpinner = (props: Props) => {
  const compId = uuid()
  let spinnerArray;

  if (getSettingsItem("rollMapFirst") == "true") {
    spinnerArray = fillSpinnerArray(compId)
  } else {
    spinnerArray = fillSpinnerArraySer(compId)
  }
  

  useEffect(() => {
    const selected = getRandomInt(5, 40);
    scroll(selected, compId);
    const elem = document.querySelector( '#card-'+selected+'-'+compId );
    elem?.setAttribute("clacked", "true")
    if (elem) {elem.className = "relative animate-pulse"}

    // disable all scrollin?
    document.getElementById(compId)?.setAttribute("style", "height: 775px; overflow-y: hidden; overflow-anchor: none; margin-top: 160px;")
  });

  return (
    <div style={{height: "775px", overflowY: "scroll", overflowAnchor: "none", marginTop: "160px"}} id={compId} className="scrolltainer">
      <div style={{paddingLeft: "25px", top: "200px"}}>
          {spinnerArray.map((cardItem) => (
              <li key={cardItem.key} style={{height: "245px", listStyle: "none"}} onClick={() => props.onClickCallback(props.rid)}>{cardItem}</li>
          ))}
        </div>
    </div>
  );
}

export default RouletteSpinner;