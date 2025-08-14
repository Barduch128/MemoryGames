import React, { useEffect, useState, useRef } from 'react';

function random(game, setGame){
  const numtable = []
  for(let i=0; i<game.level+2; i++){
    let number = Math.floor(Math.random()*game.size**2+1)
    while(numtable.includes(number)){
      number = Math.floor(Math.random()*game.size**2+1)
    }
    numtable.push(number)
  }
  const updatedGame = {
    ...game,
    bright: [...numtable],
    allow: false
  }
  setGame(updatedGame);
  setTimeout(() => {
    setGame({
      ...game,
      bright: [],
      keys: [...numtable],
      allow: true
    })
  }, 1500)
}
function Generate({game, setGame, setView}){
  useEffect(() => {
      random(game, setGame);
    }, []);
  const rows = [];
  for (let i=0; i<game.size; i++) {
    const row = [];

    for (let j=0; j<game.size; j++) {
      let backgroundColor = game.bright.includes(i*game.size+j+1) ? '#cccccc' : '#777777'
      if(game.goods.includes(i*game.size+j+1)){backgroundColor = '#aaccaa'}
      if(game.bads.includes(i*game.size+j+1)){backgroundColor = '#ccaaaa'}
      row.push(
        <div
          key={`${i*game.size}+${j}+${1}`}
          style={{
            width: `${450/game.size}px`,
            height: `${450/game.size}px`,
            borderRadius: `${90/game.size}px`,
            margin: `${25/game.size}px`,
            backgroundColor
          }}
          onClick={() => check((i*game.size + j + 1),game, setGame, setView)}
        />
      );
    }

    rows.push(
      <div key={`row-${i}`} style={{ display: 'flex' }}>
        {row}
      </div>
    );
  }
  return(
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        {rows}
      </div>
    </div>
  )
}
function check(x, game, setGame, setView){
  if(game.allow){
    if(game.keys.includes(x)){
      if(!game.goods.includes(x)){
        const updatedGame = {
          ...game,
          goods: [...game.goods, x]
        }
        setGame(updatedGame)
        if(updatedGame.goods.length >= game.level+2){
          next(game, setGame)
        }
      }
    }
    else{
      const updatedGame = {
        ...game,
        bads: [...game.bads, x]
      }
      setGame(updatedGame)
      if(updatedGame.bads.length >= 3 && game.goods.length < game.level + 2){setView(1)}
    }
  }
}
function next(game, setGame){

  setTimeout(() =>{
    const updatedGame = {
      ...game,
      goods: [],
      bads: [],
      level: game.level + 1,
      size: Math.max(3, Math.ceil(Math.sqrt(game.level*2+1)+1))
    }
    setGame(updatedGame)
    random(updatedGame, setGame)
  }, 400)
}
function Bad({game, setGame, setView}){
  return(
    <>
      <h1>Level {game.level}</h1>
      <h2 style={{ color: 'red' }}>Failed</h2>
      <button
        onClick={() => {
          setGame(prev => ({
            ...prev,
            level: 1,
            size: 3,
            goods: [],
            bads: []
          }));
          setView(0);
        }}
      >Try Again</button>
    </>
  )
}
function VisualMemory({ dispatch }) {
  const [view, setView] = useState(0)
  const [game, setGame] = useState({
    level: 1,
    size: 3,
    bright: [3, 5],
    allow: false,
    keys: [],
    goods: [],
    bads: [],
  })
  return (
    <>
      {view === 0 && (
        <>
          <h1>Level {game.level}</h1>
          <Generate game={game} setGame={setGame} setView={setView}></Generate>
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

export default VisualMemory;