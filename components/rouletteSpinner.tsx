import RouletteCard from "@/components/rouletteCard";

function Seperator() {
  return (
    <div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  )
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const RouletteSpinner = () => {

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

  var ran1 = getRandomInt(0, 18)
  var ran2 = getRandomInt(0, 18)
  var ran3 = getRandomInt(0, 18)
  var ran4 = getRandomInt(0, 18)
  var ran5 = getRandomInt(0, 18)
  
  // BELOW ERROR IS A LIE FROM VS CODE HEHE , THIS TOTALLY WORKS!
  return (
    <div>
      <div style={{paddingLeft: "215px"}}>
        <RouletteCard map={Object.keys(categories)[ran1]} vehichle={categories[Object.keys(categories)[ran1].toString()][getRandomInt(0, categories[Object.keys(categories)[ran1]].length-1)]} clacked={false} />
        <Seperator />
        <RouletteCard map={Object.keys(categories)[ran2]} vehichle={categories[Object.keys(categories)[ran2].toString()][getRandomInt(0, categories[Object.keys(categories)[ran2]].length-1)]} clacked={false} />
        <Seperator />
        <RouletteCard map={Object.keys(categories)[ran3]} vehichle={categories[Object.keys(categories)[ran3].toString()][getRandomInt(0, categories[Object.keys(categories)[ran3]].length-1)]} clacked={false} />
        <Seperator />
        <RouletteCard map={Object.keys(categories)[ran4]} vehichle={categories[Object.keys(categories)[ran4].toString()][getRandomInt(0, categories[Object.keys(categories)[ran4]].length-1)]} clacked={false} />
        <Seperator />
        <RouletteCard map={Object.keys(categories)[ran5]} vehichle={categories[Object.keys(categories)[ran5].toString()][getRandomInt(0, categories[Object.keys(categories)[ran5]].length-1)]} clacked={false} />
        </div>
    </div>
  );
}

export default RouletteSpinner;