import React, { useEffect, useState, useRef } from 'react';
import Timer from './components/Timer'

function Number({ level, setNumber }) {
  useEffect(() => {
    let newNumber = "";
    for (let i = 0; i < level; i++) {
      const digit = Math.floor(Math.random() * 10);
      newNumber += digit;
    }
    setNumber(newNumber);
  }, [level, setNumber]);

  return null;
}

function Check({ number, setView, input, setInput}) {

  return (
    <>
      <input
        type='number'
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          if (number === input) {
            setView(2)
          } else {
            setView(3)
          }
        }}
      >
        Check
      </button>
    </>
  );
}

function Good({number, level, setView, setLevel}) {
  return(
    <>
      <h1>Level {level}</h1>
      <h2 style={{ color: 'green' }}>{number}</h2>
      <button
        onClick={() => {setLevel(level+1), setView(0)}}
      >Next Level</button>
    </>
  )
}
function Bad({number, input, level, setView, setLevel}) {
  return(
    <>
      <h1>Level {level}</h1>
      <h2 style={{ color: 'red' }}>{number}</h2>
      <h2>{input}</h2>
      <button
        onClick={() => {setLevel(1), setView(0)}}
      >Try Again</button>
    </>
  )
}

function NumberMemory({ dispatch }) {
  const [number, setNumber] = useState('');
  const [level, setLevel] = useState(1);
  const [view, setView] = useState(0);
  const [input, setInput] = useState('');

  return (
    <>
      {view === 0 && (
        <>
          <h1>Level {level}</h1>
          <Number level={level} setNumber={setNumber} />
          <h2>{number}</h2>
          <Timer maxTime={level+1} setView={setView} endView={1} />
        </>
      )}
      {view === 1 && (
        <Check number={number} setView={setView} input={input} setInput={setInput}/>
      )}
      {view === 2 && (
        <Good number={number} level={level} setView={setView} setLevel={setLevel}/>
      )}
      {view === 3 && (
        <Bad number={number} input={input} level={level} setView={setView} setLevel={setLevel}/>
      )}
    </>
  );
}

export default NumberMemory;