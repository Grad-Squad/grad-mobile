import { childrenPropType } from 'proptypes';
import React, { createContext, useContext, useReducer } from 'react';
import initialState from './initialState';
import Reducer from './Reducer';

const Context = createContext();

const GlobalStore = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const useStore = () => useContext(Context);
export default GlobalStore;

GlobalStore.propTypes = {
  children: childrenPropType.isRequired,
};
