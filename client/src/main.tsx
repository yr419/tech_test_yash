import React, { useState } from 'react'
import { Status, XorO } from './types'

const createBoard = (size: number) =>
  Array.from({ length: size }, () =>
    Array.from({ length: size }, () => undefined as XorO | undefined)
  )

export const Main = () => {

  const [boardSize, setBoardSize] = useState<number>(3)
  const [boardSizeInput, setBoardSizeInput] = useState<string>('3')

  const [winLength, setWinLength] = useState<number>(3)

  const [winLengthInput, setWinLengthInput] = useState<string>('3')

  const [board, setBoard] = useState<(XorO | undefined)[][]>(createBoard(3))

  const [turn, setTurn] = useState<XorO>('X')

  const [gameStatus, setGameStatus] = useState<Status>('playing')

  const [winner, setWinner] = useState<XorO | undefined>(undefined)

  const checkWinner = (board: (XorO | undefined)[][], length: number) => {
    const size = board.length

    const inBounds = (row: number, column: number) =>
      row >= 0 && column >= 0 && row < size && column < size

    const hasRun = (row: number, column: number, dr: number, dc: number) => {
      const player = board[row][column]
      if (!player) return false

      for (let i = 1; i < length; i++) {
        const nextRow = row + dr * i
        const nextCol = column + dc * i
        if (!inBounds(nextRow, nextCol) || board[nextRow][nextCol] !== player) {
          return false
        }
      }

      return true
    }

    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        if (hasRun(row, column, 0, 1)) return board[row][column]
        if (hasRun(row, column, 1, 0)) return board[row][column]
        if (hasRun(row, column, 1, 1)) return board[row][column]
        if (hasRun(row, column, 1, -1)) return board[row][column]
      }
    }

    return undefined
  }

  const handleClick = (row: number, column: number) => {
    if (gameStatus !== 'playing') return
    if (board[row][column] !== undefined) return

    const newBoard = board.map(r => [...r])
    newBoard[row][column] = turn
    setBoard(newBoard)
    const nextTurn = turn === 'X' ? 'O' : 'X'
    const winningPlayer = checkWinner(newBoard, winLength)
    if (winningPlayer) {
      setGameStatus('won')
      setWinner(winningPlayer)
    }
    else if (newBoard.every(r => r.every(c => c !== undefined))) {
      setGameStatus('draw')
    }
    else {
      setTurn(nextTurn)
    }
  } 

  const reset = () => {
      const nextStarter = winner
        ? (winner === 'X' ? 'O' : 'X')
        : (turn === 'X' ? 'O' : 'X')

      setBoard(createBoard(boardSize))
      setTurn(nextStarter)
      setGameStatus('playing')
      setWinner(undefined)
  }

  const handleWinLengthInput = (value: string) => {
    setWinLengthInput(value)

    const isBoardEmpty = board.every(r => r.every(c => c === undefined))
    if (!isBoardEmpty) return

    const parsed = Number(value)
    if (!Number.isInteger(parsed) || parsed < 3 || parsed > boardSize) return

    setWinLength(parsed)
  }

  const handleBoardSizeInput = (value: string) => {
    setBoardSizeInput(value)

    const parsed = Number(value)
    if (!Number.isInteger(parsed) || parsed < 3 || parsed > 15) return

    setBoardSize(parsed)
    setBoard(createBoard(parsed))
    setTurn('X')
    setGameStatus('playing')
    setWinner(undefined)
  }

  const isBoardEmpty = board.every(r => r.every(c => c === undefined))

  return (
  <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <div className='flex gap-1 items-start w-full max-w-7xl mx-auto justify-between'>

      <div className='w-48 shrink-0 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
        <div className='flex flex-col gap-4'>
          <div className="flex items-center gap-2">
            <div className="relative group">
              <span className="text-sm font-semibold cursor-help">
                Board size
              </span>

              <div className="absolute left-1/2 -top-8 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white shadow">
                Allowed range: 3–15
              </div>
            </div>

            <input
              type="number"
              min={3}
              max={15}
              value={boardSizeInput}
              onChange={event => handleBoardSizeInput(event.target.value)}
              className="w-20 shrink-0 rounded border border-slate-300 bg-white px-2 py-1 text-center text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <span
                className={`text-sm font-semibold cursor-help ${
                  !isBoardEmpty ? 'opacity-50' : ''
                }`}
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
              onChange={event => handleWinLengthInput(event.target.value)}
              disabled={!isBoardEmpty}
              className={`w-20 shrink-0 rounded border border-slate-300 bg-white px-2 py-1 text-center text-sm ${
                !isBoardEmpty ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <button className="bg-blue-500 text-white px-4 py-3 rounded-lg w-[160px] min-w-[160px] text-sm" onClick={reset}>
          Reset Game
          </button>

          {gameStatus === 'won'
          ? `Winner: ${winner}`
          : gameStatus === 'draw'
          ? `It's a draw!`
          : `Current player: ${turn}`}
        </div>
      </div>
      <div className='flex flex-col gap-1 items-center flex-1 overflow-auto'>      
        {board.map((row, rowIndex) => <div className='flex gap-1' key={rowIndex}>
          {row.map((column, columnIndex) => <div className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex' key={columnIndex} onClick={() => handleClick(rowIndex, columnIndex)}>
            {column}
          </div>)}
        </div>)}
      </div>

    </div>
  </div>
  )
}
