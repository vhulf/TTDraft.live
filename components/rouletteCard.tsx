'use client'

interface Props {
  map: string
  vehichle: string
  dataKey: string
  isSelected?: boolean
  isBanned?: boolean
  bansComplete?: boolean
  onBan?: (key: string) => void
}

 const RouletteCard = (props: Props) => {
  const isSelected = props.isSelected ?? false;
  const isBanned = props.isBanned ?? false;
  const bansComplete = props.bansComplete ?? false;
  const onBan = props.onBan ?? (() => {});

  const handleClick = () => {
    if (isSelected && !isBanned && !bansComplete) {
      onBan(props.dataKey);
    }
  };

  const blinkClass = isSelected && !isBanned && !bansComplete ? "animate-pulse" : "";
  const showGlow = isSelected && !isBanned && bansComplete;

  return (
    <div
      id={props.dataKey}
      className={blinkClass}
      style={{
        position: "relative",
        height: "100%",
        cursor: isSelected && !isBanned && !bansComplete ? "pointer" : "default",
      }}
      onClick={handleClick}
    >
      {showGlow && (
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          borderRadius: "6px",
          boxShadow: "0 0 3px 5px rgba(0, 255, 100, 0.6)",
          border: "2px solid #00cc50",
          pointerEvents: "none",
        }} />
      )}
      <div className="relative" style={{height: "100%"}}>
        <img
            src={"/" + props.map + ".png"}
            alt="draft-icon_map"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <img
            className="absolute"
            src={"/" + props.vehichle + "-icon-2.png"}
            alt="draft-icon_veh"
            style={{left: "15px", top: "5px", width: "35%", maxWidth: "75px", height: "auto"}}
        />
      </div>
      {isBanned && (
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          pointerEvents: "none",
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg viewBox="0 0 100 100" style={{width: "85%", height: "85%"}}>
            <line x1="5" y1="5" x2="95" y2="95" stroke="#ff2222" strokeWidth="14" strokeLinecap="round" />
            <line x1="95" y1="5" x2="5" y2="95" stroke="#ff2222" strokeWidth="14" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default RouletteCard;
