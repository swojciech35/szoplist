import NetInfo from '@react-native-community/netinfo';
import {setInternetConnection} from 'redux/internetSlice';
import {addListData} from 'redux/listSlice';
import {getList} from './database';

export const getListFromDB = (array: any) => async (useAppDispatch: any) => {
  if (array.length > 0) {
    await Promise.all(
      array.map(async (_: {id: any}) => {
        const listData = await getList(_.id);
        useAppDispatch(addListData(listData));
      }),
    );
  }
};
