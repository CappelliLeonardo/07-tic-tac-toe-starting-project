import { useState  } from "react"

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

//creo una helper function per lo stato del giocatore
function deriveActivePlayer(gameTurns){
  let currentPLayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPLayer = 'O';
  }

  return currentPLayer;
}
function App() { 
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer ] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);
  //funzione che cambia il giocatore ogni volta che vogliamo cambiare turno
  // qui dobbiamo aggiornare il setActivePlayer
  function handleSelectSquare(rowIndex, colIndex){
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X'); 
    setGameTurns(prevTurns => {

      const currentPLayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row : rowIndex, col : colIndex}, player: activePlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });  
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <ol>
          <GameBoard
          onSelectSquare={handleSelectSquare}
          turns = {gameTurns}
          />
        </ol>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
