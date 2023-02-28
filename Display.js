import {useState} from 'react'

function ScoreDisplay({target, roll, maxAttempt, attempt, score, level}) {

    return (
      <>
        <h1 className="game-name">Lucky Roll</h1>
        <h2 className="level-shower">Level: {level}</h2>
        <h2 className="target">Target: {target}</h2>
        <h2 className="max-attempt-shower">Max Attempt: {maxAttempt}</h2>
        <h3 className="score">Score: {score}</h3>
        <h3 className="attempt-counter">Attempts: {attempt}</h3>
        <h3 className="roll-result">You rolled: {roll}</h3>
      </>
    );
}

export default ScoreDisplay;