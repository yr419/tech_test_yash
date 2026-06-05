import React from 'react'

interface PlayerInputProps {
  playerX: string
  playerO: string
  gameStarted: boolean
  onPlayerXChange: (value: string) => void
  onPlayerOChange: (value: string) => void
  onStartGame: () => void
}

export const PlayerInput = ({
  playerX,
  playerO,
  gameStarted,
  onPlayerXChange,
  onPlayerOChange,
  onStartGame,
}: PlayerInputProps) => {
  return (
    <div className="w-64 shrink-0 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-lg font-semibold">Player setup</div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Player X</span>
        <input
          type="text"
          value={playerX}
          onChange={(e) => onPlayerXChange(e.target.value)}
          placeholder="Enter name for X"
          disabled={gameStarted}
          className="rounded border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Player O</span>
        <input
          type="text"
          value={playerO}
          onChange={(e) => onPlayerOChange(e.target.value)}
          placeholder="Enter name for O"
          disabled={gameStarted}
          className="rounded border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500"
        />
      </label>

      <button
        type="button"
        onClick={onStartGame}
        disabled={gameStarted}
        className={`rounded-lg px-4 py-3 text-sm font-semibold text-white transition ${
          gameStarted ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Start Game
      </button>

      {gameStarted && (
        <p className="text-sm text-slate-600">Game started! Use the controls to play.</p>
      )}
    </div>
  )
}
