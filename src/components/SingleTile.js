import "./SingleTile.css";

export default function SingleTile({ tile, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) handleChoice(tile);
  };

  return (
    <div className="tile">
      <div className="tile-look" onClick={handleClick}>
        {flipped ? tile.emoji : ""}
      </div>
    </div>
  );
}
