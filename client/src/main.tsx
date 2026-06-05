import React from 'react'
import { Board } from './components/Board'
import { ControlPanel } from './components/ControlPanel'
import { useGameState } from './hooks/useGame'
import { PlayerInput } from './components/PlayerInput'
import { Leaderboard } from './components/Leaderboard'

export const Main = () => {
  const {
    startGame,
    board,
    gameStatus,
    statusText,
    boardSize,
    isBoardEmpty,
    handleClick,
    reset,
    handleBoardSizeChange,
    handleWinLengthChange,
  } = useGameState()

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="flex gap-1 items-start w-full max-w-7xl mx-auto justify-between">
        <div className="flex flex-col gap-6">
          <PlayerInput gameStarted={gameStatus !== 'waiting'} onStartGame={startGame} />

          <ControlPanel
            boardSize={boardSize}
            isBoardEmpty={isBoardEmpty}
            statusText={statusText}
            gameStarted={gameStatus !== 'waiting'}
            onBoardSizeChange={handleBoardSizeChange}
            onWinLengthChange={handleWinLengthChange}
            onReset={reset}
          />
        </div>

        <div className="flex justify-center">
          <Board board={board} onCellClick={handleClick} />
        </div>

        <Leaderboard />
      </div>
    </div>
  )
}
