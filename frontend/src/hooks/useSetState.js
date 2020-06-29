import { useReducer } from 'react';

const reducer = (newState, oldState) => ({ ...newState, ...oldState });

const useSetState = (initialState = {}) => {
  console.log(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);
  const setState = newStateData => dispatch(newStateData);

  return [state, setState];
};

export default useSetState;
