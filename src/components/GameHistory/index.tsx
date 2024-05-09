import React from 'react';
import { BoardItem } from '@/components/Board';
import styles from './history.module.css';

type GameHistoryProps = {
  currentStep: number;
  history: BoardItem[][];
  changeHistory: (step: number) => void;
};

const GameHistory: React.FunctionComponent<GameHistoryProps> = ({
  history,
  changeHistory,
  currentStep,
}) => {
  return (
    <>
      <h3 className={styles.title}>Game History:</h3>
      <ol className={styles.historyList}>
        {history.map((stepSquares, step) => {
          const desc = step ? `Go to move #${step}` : 'Go to game start';
          const isCurrentStep = step === currentStep;
          return (
            <li key={step} className={styles.historyItem}>
              <button
                disabled={isCurrentStep}
                onClick={() => changeHistory(step)}
              >
                {desc} {isCurrentStep ? '(current)' : null}
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default GameHistory;
