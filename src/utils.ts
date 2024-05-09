import { BoardItem } from '@/components/Board';
import { GameStatus } from '@/components/Game';

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function determineWinner(squares: BoardItem[]) {
  for (let line of WINNING_LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function getGameStatus(
  winner: BoardItem,
  squares: BoardItem[]
): GameStatus {
  return winner ? 'done' : squares.every(Boolean) ? `draw` : `inProgress`;
}

export const getGameStatusText = (
  status: GameStatus,
  winner: BoardItem,
  nextPlayer: BoardItem
) => {
  const labels = {
    done: `Winner: ${winner}`,
    draw: 'No Winners',
    inProgress: `Next player: ${nextPlayer}`,
  };
  return labels[status];
};

export function calculateNextPlayer(squares: BoardItem[]): BoardItem {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}
