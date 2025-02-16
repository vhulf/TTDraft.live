import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  map: string
  vehichle: string
  clacked: boolean
  // setClacked: Dispatch<SetStateAction<string>>
}

 const RouletteCard = (props: Props) => {
  // const [clacked, setClacked] = useState(0)
  return (
    <div className="static">
        <div className="relative">
          <Image
              className="absolute"
              src={"/" + props.map + ".png"}
              alt="draft-icon_map"
              width={250}
              height={250}
              priority
          />
          <Image
              className="absolute"
              src={"/" + props.vehichle + "-icon-2.png"}
              alt="draft-icon_veh"
              width={75}
              height={75}
              priority
          />
        </div>
    </div>
  );
}

export default RouletteCard;