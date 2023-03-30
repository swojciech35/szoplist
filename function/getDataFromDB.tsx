import {useAppSelector} from 'hooks';
import {addListData, setListData, setListId} from 'redux/listSlice';
import {storeData} from './async-storage';
import {getList, getUserIdList} from './database';

export const getListFromDBFirstLogin =
  (array: any) => async (useAppDispatch: any) => {
    if (array.length > 0) {
      await Promise.all(
        array.map(async (_: {id: any}) => {
          const listData = await getList(_.id);
          useAppDispatch(addListData(listData));
        }),
      );
    }
  };

export const getListIdAndListData =
  (usrId: string) => async (useAppDispatch: any) => {
    const listID: any = await getUserIdList(usrId);
    let arrayOfList: any = [];
    if (listID.length > 0) {
      await Promise.all(
        listID.map(async (_: {id: any}) => {
          arrayOfList.push(await getList(_.id));
        }),
      );
    }
    useAppDispatch(setListData(arrayOfList));
    useAppDispatch(setListId(listID));
    storeData('@ListId', listID);
    storeData('@ListData', arrayOfList);
  };
