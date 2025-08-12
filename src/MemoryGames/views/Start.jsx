import React, { useState } from 'react';

function Start({dispatch}){
  return(
    <button onClick={() => dispatch({ type: 'MENU'})}>Start</button>
  )
}

export default Start