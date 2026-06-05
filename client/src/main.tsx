import React from 'react'
import { Board } from './components/Board'
import { ControlPanel } from './components/ControlPanel'
import { useGameState } from './hooks/useGame'

export const Main = () => {
  const {
    board,
    turn,
    gameStatus,
    winner,
    boardSizeInput,
    boardSize,
    winLengthInput,
    isBoardEmpty,
    handleClick,
    reset,
    handleBoardSizeInput,
    handleWinLengthInput,
  } = useGameState()

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="flex gap-1 items-start w-full max-w-7xl mx-auto justify-between">
        <ControlPanel
          boardSizeInput={boardSizeInput}
          winLengthInput={winLengthInput}
          boardSize={boardSize}
          isBoardEmpty={isBoardEmpty}
          gameStatus={gameStatus}
          turn={turn}
          winner={winner}
          onBoardSizeChange={handleBoardSizeInput}
          onWinLengthChange={handleWinLengthInput}
          onReset={reset}
        />

        <Board board={board} onCellClick={handleClick} />
      </div>
    </div>
  )
}
