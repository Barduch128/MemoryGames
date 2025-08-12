import React, { useReducer } from 'react';
import { gameReducer, initialState } from './reducer';
import Start from './views/Start.jsx';
import Menu from './views/Menu.jsx';
import NumberMemory from './views/NumberMemory.jsx';
import SequenceMemory from './views/SequenceMemory.jsx';
import VisualMemory from './views/VisualMemory.jsx';


function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {state === 'start' && <Start dispatch={dispatch} />}
      {state === 'menu' && <Menu dispatch={dispatch} />}
      {state === 'number_memory' && <NumberMemory dispatch={dispatch} />}
      {state === 'sequence_memory' && <SequenceMemory dispatch={dispatch} />}
      {state === 'visual_memory' && <VisualMemory dispatch={dispatch} />}
    </div>
  );
}

export default App;