export const initialState = 'start';

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START':
      return 'start';
    case 'MENU':
      return 'menu';
    case 'NUMBER_MEMORY':
      return 'number_memory';
    case 'SEQUENCE_MEMORY':
      return 'sequence_memory';
    case 'VISUAL_MEMORY':
      return 'visual_memory';
    default:
      return state;
  }
}