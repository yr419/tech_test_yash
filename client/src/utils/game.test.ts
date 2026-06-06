import { createBoard, checkWinner, isBoardEmpty } from './game'


// ----------- check winner tests
describe('checkWinner', () => {
  it('returns undefined when board is empty', () => {
    const board = createBoard(3)
    expect(checkWinner(board, 3)).toBeUndefined()
  })

  it('detects horizontal win', () => {
    const board = createBoard(3)
    board[0][0] = 'X'
    board[0][1] = 'X'
    board[0][2] = 'X'
    expect(checkWinner(board, 3)).toBe('X')
  })

  it('detects vertical win', () => {
    const board = createBoard(3)
    board[0][0] = 'O'
    board[1][0] = 'O'
    board[2][0] = 'O'
    expect(checkWinner(board, 3)).toBe('O')
  })

  it('detects diagonal win (top-left to bottom-right)', () => {
    const board = createBoard(3)
    board[0][0] = 'X'
    board[1][1] = 'X'
    board[2][2] = 'X'
    expect(checkWinner(board, 3)).toBe('X')
  })

  it('detects diagonal win (top-right to bottom-left)', () => {
    const board = createBoard(3)
    board[0][2] = 'O'
    board[1][1] = 'O'
    board[2][0] = 'O'
    expect(checkWinner(board, 3)).toBe('O')
  })

  it('returns undefined when no winner', () => {
    const board = createBoard(3)
    board[0][0] = 'X'
    board[0][1] = 'O'
    board[1][0] = 'O'
    expect(checkWinner(board, 3)).toBeUndefined()
  })

  it('detects win on larger board with custom win length', () => {
    const board = createBoard(5)
    // Create 4 in a row
    board[0][0] = 'X'
    board[0][1] = 'X'
    board[0][2] = 'X'
    board[0][3] = 'X'
    expect(checkWinner(board, 4)).toBe('X')
  })

  it('returns undefined when win length not met on larger board', () => {
    const board = createBoard(5)
    board[0][0] = 'X'
    board[0][1] = 'X'
    board[0][2] = 'X'
    expect(checkWinner(board, 4)).toBeUndefined()
  })
})

describe('createBoard', () => {
    it('creates a 3x3 board', () => {
        const board = createBoard(3)
        expect(board).toHaveLength(3)
        expect(board[0]).toHaveLength(3)
        expect(board[1]).toHaveLength(3)
        expect(board[2]).toHaveLength(3)
    })  
    it('all cells are undefined', () => {
        const board = createBoard(3)
        expect(board.every(row => row.every(cell => cell === undefined))).toBe(true)
    })
})

describe('isBoardEmpty', () => {
    it('returns true when board is empty', () => {
        const board = createBoard(3)
        expect(isBoardEmpty(board)).toBe(true)
    })
    it('returns false when board is not empty', () => {
        const board = createBoard(3)
        board[0][0] = 'X'
        expect(isBoardEmpty(board)).toBe(false)
    })
})