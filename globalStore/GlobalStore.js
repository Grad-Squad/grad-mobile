import AsyncStorage from '@react-native-async-storage/async-storage';
import localStorageKeys from 'localStorageKeys';
import { childrenPropType } from 'proptypes';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import initialState from './initialState';
import Reducer from './Reducer';
import ReducerActions from './ReducerActions';

const Context = createContext();

const GlobalStore = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    const setProfileIdFromStorage = async () => {
      const profileId = parseInt(
        (await AsyncStorage.getItem(localStorageKeys.profileId)) || -1,
        10
      );
      dispatch({ type: ReducerActions.setProfileId, payload: profileId });
    };

    setProfileIdFromStorage();
  }, []);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const useStore = () => useContext(Context);
export default GlobalStore;

GlobalStore.propTypes = {
  children: childrenPropType.isRequired,
};
