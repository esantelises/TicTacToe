'use client';
import Board, { BoardItem } from '../Board';
import {
  getGameStatus,
  determineWinner,
  calculateNextPlayer,
  getGameStatusText,
} from '@/utils';
import { useState } from 'react';
import styles from './game.module.css';
import GameHistory from '@/components/GameHistory';
import GameStatistics from '@/components/GameStatistics';

export type GameStatus = 'done' | 'draw' | 'inProgress';
export interface GameStatisticsType {
  playerX: number;
  playerO: number;
  tie: number;
}

const INITIAL_STATS: GameStatisticsType = {
  playerO: 0,
  playerX: 0,
  tie: 0,
};

export default function Game() {
  const [history, setHistory] = useState<BoardItem[][]>([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [gameStats, setGameStats] = useState<GameStatisticsType>(INITIAL_STATS);

  const currentSquares = history[currentStep];
  const nextPlayer = calculateNextPlayer(currentSquares);
  const winner = determineWinner(currentSquares);
  const status = getGameStatus(winner, currentSquares);

  const onPlayerAction = (index: number) => {
    if (winner || currentSquares[index]) {
      return; // Prevent action if game is over or square is already filled.
    }

    const newSquares = [...currentSquares];
    newSquares[index] = nextPlayer;
    // Update history and step.
    const newHistory = history.slice(0, currentStep + 1);
    setHistory([...newHistory, newSquares]);
    setCurrentStep(newHistory.length);

    // Update game statistics based on the result.
    const newWinner = determineWinner(newSquares);
    const newStatus = getGameStatus(newWinner, newSquares);
    updateGameStats(newWinner, newStatus);
  };

  const updateGameStats = (winner: BoardItem, status: GameStatus) => {
    setGameStats((prevStats) => {
      const newStats = { ...prevStats };
      if (status === 'draw') {
        newStats.tie += 1;
      } else if (status === 'done') {
        if (winner === 'X') {
          newStats.playerX += 1;
        } else if (winner === 'O') {
          newStats.playerO += 1;
        }
      }
      return newStats;
    });
  };

  const onGameReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  };

  const onChangeHistory = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <div className={styles.game}>
        <div className={styles.boardContainer}>
          <div className={styles.boardHeader}>
            <p>{getGameStatusText(status, winner, nextPlayer)}</p>
            <button onClick={onGameReset}>
              {status !== 'inProgress' ? 'New' : 'Reset'}
            </button>
          </div>
          <div className={winner ? styles.blinkMe : ''}>
            <Board gameSquares={currentSquares} onClick={onPlayerAction} />
          </div>
          <GameHistory
            currentStep={currentStep}
            history={history}
            changeHistory={onChangeHistory}
          />
        </div>
        <GameStatistics
          stats={gameStats}
          OnReset={() => setGameStats(INITIAL_STATS)}
        />
      </div>
    </div>
  );
}
