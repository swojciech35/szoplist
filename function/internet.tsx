import NetInfo from '@react-native-community/netinfo';
import {setInternetConnection} from 'redux/internetSlice';

export const checkInternetConnection = () => {
  return async (useAppDispatch: any) => {
    try {
      const response = await NetInfo.fetch();
      useAppDispatch(setInternetConnection(response.isConnected));
    } catch (error) {
      useAppDispatch({type: 'setInternetConnection', error});
    }
  };
};
