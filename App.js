import { useState, useEffect } from "react";
import Display from "./Display";
import CircleGrid from "./CircleGrid";
import "./App.css";

const randomGenerator = (minLimit, maxLimit) => {
  let diff = maxLimit - minLimit + 1;
  return Math.floor(Math.random() * diff) + minLimit;
};

function updateStats(
  level,
  target,
  maxAttempt,
  attempt,
  roll,
  score,
  numOfCircles
) {
  return {
    level,
    target,
    maxAttempt,
    attempt,
    roll,
    score,
    numOfCircles,
  };
}

function generateCircles(gameStats) {
  let circlesArray = [];
  for (let i = 0; i < gameStats.numOfCircles; i++) {
    circlesArray[i] = <div key={i} className="circle"></div>;
  }
  return circlesArray;
}

function gameStart(setGameStats, setIsGameFinished) {
  let currentGameStats = updateStats(
    localStorage.level,
    randomGenerator(25, 50),
    randomGenerator(0, 25),
    0,
    "",
    0,
    0
  );
  setGameStats(currentGameStats);
  setIsGameFinished(false);
}

function checkForGameFinish(currentGameStats, setGameStats, setIsGameFinished) {
  if (currentGameStats.score === currentGameStats.target) {
    setIsGameFinished(true);
    currentGameStats.level++;
    setGameStats(currentGameStats);
    localStorage.level = currentGameStats.level;
    setTimeout( () => {
      alert(`Congratulations on getting to level ${currentGameStats.level}`);
    }, 500)
  }
  if (currentGameStats.attempt === currentGameStats.maxAttempt) {
    currentGameStats.level = 0;
    localStorage.level = 0;
    setGameStats(currentGameStats);
    setIsGameFinished(true);
    setTimeout( () => {
      alert("Better luck next time");
    }, 500)
  }
}

function handleClick(gameStats, setGameStats, setIsGameFinished) {

  let currentGameStats = updateStats(
    gameStats.level,
    gameStats.target,
    gameStats.maxAttempt,
    gameStats.attempt,
    gameStats.roll,
    gameStats.score,
    gameStats.numOfCircles
  );

  let rollResult = randomGenerator(1, 5);
  if (rollResult + gameStats.score <= gameStats.target) {
    currentGameStats.roll = rollResult;
    currentGameStats.score += rollResult;
    currentGameStats.numOfCircles += rollResult;
  } else {
    currentGameStats.roll = "more than target";
  }
  currentGameStats.attempt++;
  console.log(currentGameStats, gameStats);
  setGameStats(currentGameStats);
  checkForGameFinish(currentGameStats, setGameStats, setIsGameFinished);
}

function App() {
  const [isGameFinished, setIsGameFinished] = useState(true);
  const [gameStats, setGameStats] = useState({
    level: localStorage.level,
    target: 0,
    maxAttempt: 0,
    attempt: 0,
    roll: 0,
    score: 0,
    numOfCircles: 0,
  });

  if (isGameFinished) {
    setTimeout( () => {
      gameStart(setGameStats, setIsGameFinished)
    }, 1000);
  }

  return (
    <div className="main-container">
      <Display
        target={gameStats.target}
        roll={gameStats.roll}
        maxAttempt={gameStats.maxAttempt}
        attempt={gameStats.attempt}
        score={gameStats.score}
        level={gameStats.level}
      />
      {!isGameFinished && <button className="play-button" onClick={() => handleClick(gameStats, setGameStats, setIsGameFinished)}>
        Play
      </button>}
      <CircleGrid circles={() => {return generateCircles(gameStats)}} />
    </div>
  );
}

export default App;
