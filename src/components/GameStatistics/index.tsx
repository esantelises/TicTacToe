import React from 'react';
import styles from './stadistics.module.css';
import { GameStatisticsType } from '@/components/Game';

type GameStatisticsProps = {
  stats: GameStatisticsType;
  OnReset: () => void;
};

const GameStatistics: React.FunctionComponent<GameStatisticsProps> = ({
  stats,
  OnReset,
}) => {
  const { playerX, tie, playerO } = stats;
  return (
    <div className={styles.container}>
      <div>
        <dt className={styles.label}>Player X</dt>
        <dd className={styles.value}>{playerX}</dd>
      </div>
      <div>
        <dt className={styles.label}>Ties</dt>
        <dd className={styles.value}>{tie}</dd>
      </div>
      <div>
        <dt className={styles.label}>Player O</dt>
        <dd className={styles.value}>{playerO}</dd>
      </div>
      <div>
        <button onClick={OnReset}>Reset Stats</button>
      </div>
    </div>
  );
};

export default GameStatistics;
