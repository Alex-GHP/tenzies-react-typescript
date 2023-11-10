import { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const dieMax = 6;
const gameSize = 10;

function App() {
  const [tenzies, setTenzies] = useState(false);
  const [counter, setCounter] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [firstRender, setFirstRender] = useState(true);

  const generateNewDie = () => {
    return {
      value: Math.floor(Math.random() * dieMax + 1),
      isHeld: false,
      id: nanoid(),
    };
  };

  const allNewDice = () => {
    let newDice = [];
    for (let i = 0; i < gameSize; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };

  const [dice, setDice] = useState(allNewDice());

  const allHeld = dice.every((die) => die.isHeld);
  const firstValue = dice[0].value;
  const allSameValue = dice.every((die) => die.value === firstValue);

  useEffect(() => {
    if (allHeld && allSameValue) {
      setTenzies(true);
      if (firstRender) {
        setBestScore(counter);
        setFirstRender(false);
      }
    }
  }, [dice]);

  const holdDice = (id: string) => {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      })
    );
  };

  const diceElements = dice.map((die) => (
    <Die
      holdDice={() => holdDice(die.id)}
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
    />
  ));

  const rollDice = () => {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld === true ? die : generateNewDie();
      })
    );
    setCounter((prevCounter) => ++prevCounter);
  };

  const newGame = () => {
    setTenzies(false);
    setDice(allNewDice());
    setCounter(0);
    if (bestScore > counter) setBestScore(counter);
  };

  return (
    <main className="bg-[#F5F5F5]">
      {tenzies && <Confetti />}
      <h1 className="title text-5xl font-bold mt-20">Tenzies</h1>
      <p className="instructions text-2xl w-1/2 text-center">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container pt-24 x-32 pb-12">{diceElements}</div>
      <p className="font-bold">Best Score: {bestScore}</p>
      <p className="mb-4">Score: {counter}</p>
      <button
        onClick={tenzies === true ? newGame : rollDice}
        className="bg-[#5035FF] text-white font-bold px-12 py-2 mb-10"
      >
        {tenzies === true ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
