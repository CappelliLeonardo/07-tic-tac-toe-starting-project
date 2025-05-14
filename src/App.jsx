import { useState  } from "react"

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GamerOver from "./components/GameOver";

const initialGameBoard =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];


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
  // potremmo usare lo useState ma sarebbe ridondante. possiamo direttamnte utlizzare gameTurns
  // const [hasWinner, setHasWinner] = useState(false);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];


    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol)
      {
        winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;
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

  function handleRestart(){
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <ol>
          {(winner || hasDraw) && (
            <GamerOver winner={winner} onRestart={handleRestart}/>
          )}
          <GameBoard
          onSelectSquare={handleSelectSquare}
          board = {gameBoard}
          />
        </ol>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
