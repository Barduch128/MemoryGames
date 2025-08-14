import React, { useState } from 'react';

function Menu({dispatch}){
  return(
    <>
      <h2>Select mode</h2>
      <button onClick={() => dispatch({type: 'NUMBER_MEMORY'})}>Number Memory</button>
      <button onClick={() => dispatch({type: 'SEQUENCE_MEMORY'})}>Sequence Memory</button>
      <button onClick={() => dispatch({type: 'VISUAL_MEMORY'})}>Visual Memory</button>
      <button onClick={() => dispatch({type: 'CHIMP_TEST'})}>Chimp Test</button>
    </>
  )
}

export default Menu