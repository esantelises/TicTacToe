import React from 'react';
import styles from './board.module.css';

export type BoardItem = 'X' | 'O' | null;
type BoardProps = {
  gameSquares: BoardItem[];
  onClick: (index: number) => void;
};

const Board: React.FunctionComponent<BoardProps> = ({
  gameSquares,
  onClick,
}) => {
  return (
    <div className={styles.board}>
      {gameSquares.map((item, key) => (
        <div
          role="button"
          key={`key-${key}-${item}`}
          className={styles.square}
          onClick={() => onClick(key)}
        >
          {gameSquares[key]}
        </div>
      ))}
    </div>
  );
};

export default Board;
