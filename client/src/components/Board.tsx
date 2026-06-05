import React from 'react'
import { XorO } from '../types'

interface BoardProps {
  board: (XorO | undefined)[][]
  onCellClick: (row: number, col: number) => void
}

export const Board = ({ board, onCellClick }: BoardProps) => (
  <div className="flex flex-col gap-1 items-center flex-1 overflow-auto">
    {board.map((row, rowIndex) => (
      <div className="flex gap-1" key={rowIndex}>
        {row.map((column, columnIndex) => (
          <div
            className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
            key={columnIndex}
            onClick={() => onCellClick(rowIndex, columnIndex)}
          >
            {column}
          </div>
        ))}
      </div>
    ))}
  </div>
)
