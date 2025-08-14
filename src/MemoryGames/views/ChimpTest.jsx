import React, { useEffect, useState, useRef } from 'react';
import Timer from './components/Timer'

function random(count, size){
  const numtable = []
  for(let i=0; i<count; i++){
    let number = Math.floor(Math.random()*size**2*2+1)
    while(numtable.includes(number)){
      number = Math.floor(Math.random()*size**2*2+1)
    }
    numtable.push(number)
  }
  return(numtable)
}

const Num = ({siz=90, display='x', click, game, setGame, setView}) => (
  <div
    style={{
      width: `${siz}px`,
      height: `${siz}px`,
      border: `#232388 ${siz/18}px solid`,
      backgroundColor: '#dddddd',
      borderRadius: `${siz/5}px`,
      fontSize: `${siz*0.75}px`
    }}
  onClick={() => check(click, game, setGame, setView)}
  >{display}</div>
)

function Generate({game, setGame, setView}){
  useEffect(() => {
    setGame({
      ...game,
      numbers: random(game.level, game.size)
    })
  }, [])
  const rows = []
  for(let i=0; i<game.size; i++){
    const row = []
    for(let j=0; j<game.size*2; j++){
      row.push(
        <div
          key={`${i*game.size*2}+${j}+${1}`}
          style={{
            width: `${330/game.size}px`,
            height: `${330/game.size}px`,
          }}
        >
          {game.numbers.includes(i*game.size*2 + j + 1) && <Num siz={270/game.size} display={game.level <= game.numbers.length ? game.numbers.indexOf(i*game.size*2 + j + 1)+1 : ""} click={(i*game.size*2 + j + 1)} game={game} setGame={setGame} setView={setView}></Num>}
        </div>
      );
    }
    rows.push(
      <div key={`row-${i}`} style={{ display: 'flex' }}>
        {row}
      </div>  
    )
  }
  return(
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        {rows}
      </div>
    </div>
  )
}

function check(click, game, setGame, setView){
  if(game.numbers[0] == click){
    if(game.numbers.length <= 1){setView(1)}
    setGame({
      ...game,
      numbers: game.numbers.slice(1)
    })
  }
  else{
    setView(2)
  }
}

function Good({game, setGame, setView}){
   return(
    <>
      <h1>Level {game.level}</h1>
      <button
        onClick={() => {
          setGame({
            ...game,
            level: game.level + 1,
            size: Math.max(3, Math.ceil(Math.sqrt(game.level)))
          }), 
          setView(0)}}
      >Next Level</button>
    </>
  )
}
function Bad({game, setGame, setView}){
  return(
    <>
      <h1>Level {game.level}</h1>
      <h2>Failed</h2>
      <button
        onClick={() => {
          setGame({
            ...game,
            level: 1,
            numbers: [],
            size: 3
          }), 
          setView(0)}}
      >Retry</button>
    </>
  )
}
function ChimpTest({ dispatch }) {
  const [view, setView] = useState(0);
  const [game, setGame] = useState({
    level: 1,
    numbers: [],
    size: 3
  });

  return (
    <>
      {view === 0 && (
        <>
          <h1> Level {game.level} </h1>
          <Generate
            game={game} setGame={setGame} setView={setView}>
          </Generate>
          <Timer maxTime={game.level*3+7} setView={setView} endView={2} />
        </>
      )}
      {view === 1 &&(
        <Good game={game} setGame={setGame} setView={setView}></Good>
      )}
      {view === 2 &&(
        <Bad game={game} setGame={setGame} setView={setView}></Bad>
      )}
    </>
  );
}

export default ChimpTest;