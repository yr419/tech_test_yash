import { useEffect, useState } from 'react'
import { Status, XorO } from '../types'
import { createBoard, checkWinner, isBoardEmpty } from '../utils/game'

export const useGameState = () => {
  const [playerX, setPlayerX] = useState('')
  const [playerO, setPlayerO] = useState('')

  const [boardSize, setBoardSize] = useState<number>(3)
  const [winLength, setWinLength] = useState<number>(3)

  const [board, setBoard] = useState<(XorO | undefined)[][]>(createBoard(3))
  const [turn, setTurn] = useState<XorO>('X')
  const [gameStatus, setGameStatus] = useState<Status>('waiting')
  const [winner, setWinner] = useState<XorO | undefined>(undefined)

  const currentPlayerName = turn === 'X' ? playerX : playerO
  const winnerName = winner ? (winner === 'X' ? playerX : playerO) : undefined

  const statusText =
    gameStatus === 'won'
      ? `Winner: ${winnerName}`
      : gameStatus === 'draw'
        ? "It's a draw!"
        : gameStatus === 'playing'
          ? `Current player: ${currentPlayerName}`
          : ''

  const startGame = (nameX: string, nameO: string) => {
    setPlayerX(nameX)
    setPlayerO(nameO)
    setBoard(createBoard(boardSize))
    setTurn('X')
    setGameStatus('playing')
    setWinner(undefined)
  }

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
    setGameStatus('waiting')
    setWinner(undefined)
  }

  const handleWinLengthChange = (value: number) => {
    setWinLength(value)
  }

  const handleBoardSizeChange = (value: number) => {
    setBoardSize(value)
    setBoard(createBoard(value))
    setTurn('X')
    setGameStatus('playing')
    setWinner(undefined)
  }

  useEffect(() => {
    if (gameStatus === 'won' || gameStatus === 'draw') {
      const winnerName =
        gameStatus === 'won' && winner ? (winner === 'X' ? playerX : playerO) : null
      const gameResult = {
        playerX,
        playerO,
        winner: winnerName ?? null,
        status: gameStatus,
        boardSize,
        winLength,
      }

      fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameResult),
      })
        .then((res) => res.json())
        .then((data) => console.log('Game saved:', data))
        .catch((err) => console.error('Failed to save game:', err))
    }
  }, [gameStatus])

  return {
    startGame,
    board,
    gameStatus,
    statusText,
    boardSize,
    isBoardEmpty: isBoardEmpty(board),
    handleClick,
    reset,
    handleBoardSizeChange,
    handleWinLengthChange,
  }
}
