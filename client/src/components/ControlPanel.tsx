import React from 'react'
import { Status, XorO } from '../types'

interface ControlPanelProps {
  boardSizeInput: string
  winLengthInput: string
  boardSize: number
  isBoardEmpty: boolean
  gameStatus: Status
  turn: XorO
  winner?: XorO | undefined
  gameStarted: boolean
  onBoardSizeChange: (value: string) => void
  onWinLengthChange: (value: string) => void
  onReset: () => void
}

export const ControlPanel = ({
  boardSizeInput,
  winLengthInput,
  boardSize,
  isBoardEmpty,
  gameStatus,
  turn,
  winner,
  gameStarted,
  onBoardSizeChange,
  onWinLengthChange,
  onReset,
}: ControlPanelProps) => {
  const statusText =
    gameStatus === 'won'
      ? `Winner: ${winner}`
      : gameStatus === 'draw'
        ? "It's a draw!"
        : `Current player: ${turn}`

  return (
    <div className="w-64 shrink-0 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="relative group">
            <span className="text-sm font-semibold cursor-help">Board size</span>
            <div className="absolute left-1/2 -top-8 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white shadow">
              Allowed range: 3–15
            </div>
          </div>
          <input
            type="number"
            min={3}
            max={15}
            value={boardSizeInput}
            disabled={!gameStarted}
            onChange={(e) => onBoardSizeChange(e.target.value)}
            className="w-20 shrink-0 rounded border border-slate-300 bg-white px-2 py-1 text-center text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <span
              className={`text-sm font-semibold cursor-help ${!isBoardEmpty ? 'opacity-50' : ''}`}
            >
              Win length
            </span>
            <div className="absolute left-1/2 -top-8 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white shadow">
              Editable only when board is empty
            </div>
          </div>
          <input
            type="number"
            min={3}
            max={boardSize}
            value={winLengthInput}
            onChange={(e) => onWinLengthChange(e.target.value)}
            disabled={!isBoardEmpty || !gameStarted}
            className={`w-20 shrink-0 rounded border border-slate-300 bg-white px-2 py-1 text-center text-sm ${
              !isBoardEmpty ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>

        <button
          onClick={onReset}
          disabled={!gameStarted}
          className={`rounded-lg px-4 py-3 text-sm font-semibold text-white transition ${
            gameStarted ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-400 cursor-not-allowed'
          }`}
        >
          Reset Game
        </button>

        <span className="text-sm">{statusText}</span>
      </div>
    </div>
  )
}
