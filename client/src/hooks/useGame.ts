import { useState } from 'react'
import { Status, XorO } from '../types'
import { createBoard, checkWinner, isBoardEmpty } from '../utils/game'

export const useGameState = () => {
  const [boardSize, setBoardSize] = useState<number>(3)
  const [boardSizeInput, setBoardSizeInput] = useState<string>('3')

  const [winLength, setWinLength] = useState<number>(3)

  const [winLengthInput, setWinLengthInput] = useState<string>('3')

  const [board, setBoard] = useState<(XorO | undefined)[][]>(createBoard(3))

  const [turn, setTurn] = useState<XorO>('X')

  const [gameStatus, setGameStatus] = useState<Status>('playing')

  const [winner, setWinner] = useState<XorO | undefined>(undefined)

  const handleClick = (row: number, column: number) => {
    if (gameStatus !== 'playing') return
    if (board[row][column] !== undefined) return

    const newBoard = board.map((r) => [...r])
    newBoard[row][column] = turn
    setBoard(newBoard)
    const nextTurn = turn === 'X' ? 'O' : 'X'
    const winningPlayer = checkWinner(newBoard, winLength)
    if (winningPlayer) {
      setGameStatus('won')
      setWinner(winningPlayer)
    } else if (newBoard.every((r) => r.every((c) => c !== undefined))) {
      setGameStatus('draw')
    } else {
      setTurn(nextTurn)
    }
  }

  const reset = () => {
    const nextStarter = winner ? (winner === 'X' ? 'O' : 'X') : turn === 'X' ? 'O' : 'X'

    setBoard(createBoard(boardSize))
    setTurn(nextStarter)
    setGameStatus('playing')
    setWinner(undefined)
  }

  const handleWinLengthInput = (value: string) => {
    if (!isBoardEmpty(board)) return
    setWinLengthInput(value)

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

  return {
    board,
    turn,
    gameStatus,
    winner,
    boardSize,
    boardSizeInput,
    winLength,
    winLengthInput,
    isBoardEmpty: isBoardEmpty(board),
    handleClick,
    reset,
    handleBoardSizeInput,
    handleWinLengthInput,
  }
}
