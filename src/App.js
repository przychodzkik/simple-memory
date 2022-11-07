import { useEffect, useState } from "react";
import "./App.css";
import SingleTile from "./components/SingleTile";

const tileImages = [
  { emoji: "🍎", matched: false },
  { emoji: "🍔", matched: false },
  { emoji: "🍉", matched: false },
  { emoji: "🍌", matched: false },
  { emoji: "🍒", matched: false },
  { emoji: "🥑", matched: false },
  { emoji: "🥕", matched: false },
  { emoji: "🍩", matched: false },
];

function App() {
  const [tiles, setTiles] = useState([]);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleTiles = () => {
    const shuffled = [...tileImages, ...tileImages]
      .sort(() => Math.random() - 0.5)
      .map((tile) => ({ ...tile, id: Math.random() }));

    setTiles(shuffled);
    setTurns(0);
    setScore(0);
  };

  const handleChoice = (tile) => {
    if (tile.id === choiceOne?.id) return;
    if (tile.matched) return;
    choiceOne ? setChoiceTwo(tile) : setChoiceOne(tile);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.emoji === choiceTwo.emoji) {
        setTiles((prevTile) => {
          return prevTile.map((tile) => {
            if (tile.emoji === choiceOne.emoji) {
              return { ...tile, matched: true };
            } else {
              return tile;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    let mat = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].matched) {
        mat.push(tiles[i].emoji);
      }
    }
    if ([...new Set(mat)].length > 0) {
      setScore((prevScore) => prevScore + 1);
    }
  }, [tiles]);

  useEffect(() => {
    shuffleTiles();
  }, []);

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h2>Simple memory</h2>
      <p>Ruchy: {turns} | Punkty: {score}</p>
      <div className="tiles-grid">
        {tiles.map((tile) => (
          <SingleTile
            key={tile.id}
            tile={tile}
            handleChoice={handleChoice}
            flipped={tile === choiceOne || tile === choiceTwo || tile.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <button onClick={shuffleTiles}>Nowa gra</button>
    </div>
  );
}

export default App;
