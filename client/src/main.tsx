import React, { useState } from 'react'
import { XorO } from './types'

const INITIAL_BOARD = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ]

export const Main = () => {

  const [board, setBoard] = useState<(XorO | undefined)[][]>(INITIAL_BOARD)

  const [turn, setTurn] = useState<XorO>('X')

  const [gameOver, setGameOver] = useState(false)

  const [winner, setWinner] = useState<XorO | undefined>(undefined)

  const checkWinner = (board: (XorO | undefined)[][]) => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0]
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i]
    }
      if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0]
      if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2]
      return undefined
  }

  const handleClick = (row: number, column: number) => {
    if (gameOver) return
    if (board[row][column] !== undefined) return

    const newBoard = board.map(r => [...r])
    newBoard[row][column] = turn
    setBoard(newBoard)
    setTurn(turn === 'X' ? 'O' : 'X')
    const winningPlayer = checkWinner(newBoard)

    if (winningPlayer) {
      setGameOver(true)
      setWinner(winningPlayer)
    }

    else if (newBoard.every(r => r.every(c => c !== undefined))) {
      setGameOver(true)
    }
  } 

  const reset = () => {
      setBoard(INITIAL_BOARD)
      setTurn('X')
      setGameOver(false)
      setWinner(undefined)
  }

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <div className='flex flex-col gap-1 items-center'>
      {board.map((row, rowIndex) => <div className='flex gap-1' key={rowIndex}>
        {row.map((column, columnIndex) => <div className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex' key={columnIndex} onClick={() => handleClick(rowIndex, columnIndex)}>
          {column}
        </div>)}
      </div>)}
    <button className="bg-blue-500 text-white px-4 py-3 rounded-lg w-full max-w-[140px] text-sm" onClick={reset}>
      Reset Game
    </button>

    <div className="text-lg font-semibold text-center w-full max-w-[240px]">
      {winner
    ? `Winner: ${winner}`
    :
    gameOver
    ? `It's a draw!`
    : `Current player: ${turn}`}
    </div>

    </div>
  </div>
}
