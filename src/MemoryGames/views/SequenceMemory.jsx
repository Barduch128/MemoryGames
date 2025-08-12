import React, { useEffect, useState } from 'react';

function Generate({game, setGame, setView}) {
  useEffect(() => {
    show(game, setGame);
  }, []);
  const rows = [];

  for (let i=0; i<3; i++) {
    const row = [];

    for (let j=0; j<3; j++) {
      const backgroundColor = game.bright == i*3 + j + 1 ? 'green' : 'gray';
      row.push(
        <div
          key={`${i*3}+${j}+${1}`}
          style={{
            width: '130px',
            height: '130px',
            backgroundColor,
            borderRadius: '26px',
            margin: '7px',
          }}
          onClick={() => check(`${i*3 + j + 1}`,game, setGame, setView)}
        />
      );
    }

    rows.push(
      <div key={`row-${i}`} style={{ display: 'flex' }}>
        {row}
      </div>
    );
  }

  return <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div>
      {rows}
    </div>
  </div>
}

function check(click, game, setGame, setView){
  if(game.allow){
    if(click==game.sequence[game.count]){
      const newCount = game.count + 1
      const updatedGame = {
        ...game,
        count: newCount,
        bright: click,
        allow: false
      }
      setGame(updatedGame)

      setTimeout(() => {
        if(newCount < game.level){
          setGame(prev => ({
            ...prev,
            allow: true
          }))
        } 
        setGame(prev => ({
          ...prev,
          bright: null
        }))
      }, 100)

      if (newCount >= game.level) {
        setTimeout(() => {
          const updatedGame = {
            ...game,
            count: 0,
            allow: false
          }
          setGame(updatedGame)
          add(updatedGame, setGame);
        }, 400);
      }
    }
    else{
      setGame(prev => ({
        ...prev,
        count: 0,
      }))
      setView(1)
    }
  }
}

function add(game, setGame){
  const newLevel = game.level + 1
  setGame(prev => ({
    ...prev,
    level: newLevel
  }))

  const newElements = [];
  for (let i = game.sequence.length; i < newLevel; i++) {
    newElements.push(random(game.sequence[game.sequence.length-1]));
  }
  const updatedSequence = [...game.sequence, ...newElements];
  const updatedGame = {
    ...game,
    level: newLevel,
    sequence: updatedSequence,
    bright: null,
  };
  setGame(updatedGame);
  show(updatedGame, setGame);
}

function show(game, setGame) {
  let index = 0;

  const interval = setInterval(() => {
    if (index < game.sequence.length) {
      const updatedGame = {
        ...game,
        bright: game.sequence[index]
      }
      setGame(updatedGame)
      index++;
    } else {
      clearInterval(interval);
      setGame(prev => ({
        ...prev,
        bright: null,
        allow: true
      }))
    }
  }, 1000);
}

function random(blacklist = null){
  let next = Math.floor(Math.random()*9+1)
  if(next == blacklist){
    while(next == blacklist){
      next = Math.floor(Math.random()*9+1)
    }
  }
  return next
}

function Bad({game, setGame, setView}) {
  return(
    <>
      <h1>Level {game.level}</h1>
      <h2 style={{ color: 'red' }}>Failed</h2>
      <button
        onClick={() => {
          setGame(prev => ({
            ...prev,
            level: 1,
            sequence: [random()],
          }));
          setView(0);
        }}
      >Try Again</button>
    </>
  )
}

function SequenceMemory({ dispatch }) {
  const [view, setView] = useState(0);
  const [game, setGame] = useState({
    level: 1,
    sequence: [random()],
    count: 0,
    bright: null,
    allow: false
  });

  return (
    <>
      {view === 0 && (
        <>
          <h1>Level {game.level}</h1>
          <Generate 
            game={game} setGame={setGame} setView={setView}>
          </Generate>
        </>
      )}
      {view === 1 && (
        <Bad 
          game={game} setGame={setGame} setView={setView}>
        </Bad>
      )}
    </>
  );
}

export default SequenceMemory;