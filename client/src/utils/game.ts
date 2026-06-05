import { XorO } from '../types'

export const createBoard = (size: number) =>
  Array.from({ length: size }, () =>
    Array.from({ length: size }, () => undefined as XorO | undefined)
  )

export const checkWinner = (board: (XorO | undefined)[][], length: number) => {
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

export const isBoardEmpty = (board: (XorO | undefined)[][]) =>
  board.every((r) => r.every((c) => c === undefined))
