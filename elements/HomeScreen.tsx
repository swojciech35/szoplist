import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import DrawerShowButton from './element/DrawerShowButton';
import {getList, getUserIdList} from 'function/database';
import {useAppDispatch, useAppSelector} from 'hooks';
import {addListData} from 'redux/listSlice';
import React from 'react';
import {getData, storeData} from 'function/async-storage';
function HomeScreen({navigation}: any): JSX.Element {
  const usr = useAppSelector(state => state.user.userData);
  const listId = useAppSelector(state => state.list.listId);
  const listData = useAppSelector(state => state.list.listData);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    listData.length > 0 ? storeData('@ListData', listData) : null;
  }, [listData]);

  return (
    <>
      <View>
        <DrawerShowButton navigation={navigation} />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'black'}}>Home Screen</Text>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Create New List');
            navigation.navigate('Show List', {
              listId: '0c4bd965-7407-4e92-b242-99e17f623b7f',
            });
          }}>
          <Text>Utwórz nową listę</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            // navigation.navigate('Create New List');
            // dispatch(addListData( await getList("c692168d-89b4-4d6d-af79-c797624d875f")))
            console.log(listData);
          }}>
          <Text style={{color: 'black'}}>test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            // navigation.navigate('Create New List');
            console.log(listId);
            console.log(await getData('@ListData'));
          }}>
          <Text style={{color: 'black'}}>test</Text>
        </TouchableOpacity>

        {listData.map((_: any, i: any) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigation.navigate('Show List', {
                listId: _.id,
              })
            }>
            <Text style={{fontSize: 50, color: '#000000'}}>{_.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
export default HomeScreen;
