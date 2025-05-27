'use client'

interface Props {
  map: string
  vehichle: string
  //clacked: boolean
  dataKey: string
  //setClacked: Dispatch<SetStateAction<string>>
}

 const RouletteCard = (props: Props) => {
  //const [clacked, setClacked] = useState(0)
  //const clackClass = clacked ? "clacked":""
  return (
    <div id={props.dataKey}>
        <div className={"relative"}>
        <img
              className="absolute"
              src={"/map-border-default.png"}
              alt="draft-icon_border"
              width={336}
              height={336}
          />
          <img
              className="absolute ml-11 mt-9"
              src={"/" + props.map + ".png"}
              alt="draft-icon_map"
              width={246}
              height={246}
          />
          <img
              className="absolute"
              src={"/" + props.vehichle + "-icon-2.png"}
              alt="draft-icon_veh"
              width={75}
              height={75}
          />
        </div>
    </div>
  );
}

export default RouletteCard;