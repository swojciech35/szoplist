import {addListData, setListData} from 'redux/listSlice';
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

export const getAndSetListFromDB =
  (array: any) => async (useAppDispatch: any) => {
    if (array.length > 0) {
      let arrayOfList: any = [];
      await Promise.all(
        array.map(async (_: {id: any}) => {
          arrayOfList.push(await getList(_.id));
        }),
      );
      useAppDispatch(setListData(arrayOfList));
    }
  };
