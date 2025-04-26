import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handleClick = (index) => {
    const newBoard = board.slice();
    if (newBoard[index] || calculateWinner(board)) return; // Ignore if cell is filled or game is over

    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScore({
        ...score,
        [winner]: score[winner] + 1,
      });
    }
  };

  const handleResetGame = () => {
    setBoard(initialBoard);
  };

  const handleResetScore = () => {
    setScore({ X: 0, O: 0 });
    setBoard(initialBoard);
  };

  const renderCell = (index) => {
    return (
      <button className="cell" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="board">
        {board.map((_, index) => renderCell(index))}
      </div>
      <div className="status">
        <p>{status}</p>
      </div>
      <div className="score">
        <p>X: {score.X} | O: {score.O}</p>
      </div>
      <button className="reset" onClick={handleResetGame}>Reset Game</button>
      <button className="reset-score" onClick={handleResetScore}>Reset Score</button>
    </div>
  );
};

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6],              // Diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default App;
