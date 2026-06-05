import React, { useState } from 'react'
interface ControlPanelProps {
  boardSize: number
  isBoardEmpty: boolean
  statusText: string
  gameStarted: boolean
  onBoardSizeChange: (value: number) => void
  onWinLengthChange: (value: number) => void
  onReset: () => void
}

export const ControlPanel = ({
  boardSize,
  isBoardEmpty,
  statusText,
  gameStarted,
  onBoardSizeChange,
  onWinLengthChange,
  onReset,
}: ControlPanelProps) => {
  const [boardSizeInput, setBoardSizeInput] = useState(String(boardSize))
  const [winLengthInput, setWinLengthInput] = useState('3')

  const handleBoardSizeChange = (value: string) => {
    setBoardSizeInput(value)
    const parsed = Number(value)
    if (!Number.isInteger(parsed) || parsed < 3 || parsed > 15) return
    onBoardSizeChange(parsed)
  }

  const handleWinLengthChange = (value: string) => {
    setWinLengthInput(value)
    const parsed = Number(value)
    if (!Number.isInteger(parsed) || parsed < 3 || parsed > boardSize) return
    onWinLengthChange(parsed)
  }
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
            onChange={(e) => handleBoardSizeChange(e.target.value)}
            className={`w-20 shrink-0 rounded border border-slate-300 bg-white px-2 py-1 text-center text-sm ${
              !isBoardEmpty || !gameStarted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
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
            onChange={(e) => handleWinLengthChange(e.target.value)}
            disabled={!isBoardEmpty || !gameStarted}
            className={`w-20 shrink-0 rounded border border-slate-300 bg-white px-2 py-1 text-center text-sm ${
              !isBoardEmpty || !gameStarted ? 'opacity-50 cursor-not-allowed' : ''
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
