import React from 'react'
import { Board } from './components/Board'
import { ControlPanel } from './components/ControlPanel'
import { useGameState } from './hooks/useGame'
import { PlayerInput } from './components/PlayerInput'
import { Leaderboard } from './components/Leaderboard'

export const Main = () => {
  const {
    playerX,
    playerO,
    setPlayerX,
    setPlayerO,
    startGame,
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
        <div className="flex flex-col gap-6">
          <PlayerInput
            playerX={playerX}
            playerO={playerO}
            gameStarted={gameStatus !== 'waiting'}
            onPlayerXChange={setPlayerX}
            onPlayerOChange={setPlayerO}
            onStartGame={startGame}
          />

          <ControlPanel
            boardSizeInput={boardSizeInput}
            winLengthInput={winLengthInput}
            boardSize={boardSize}
            isBoardEmpty={isBoardEmpty}
            gameStatus={gameStatus}
            turn={turn}
            winner={winner}
            gameStarted={gameStatus !== 'waiting'}
            onBoardSizeChange={handleBoardSizeInput}
            onWinLengthChange={handleWinLengthInput}
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
