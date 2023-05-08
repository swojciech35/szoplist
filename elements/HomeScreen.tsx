import {View, Text, SafeAreaView, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native';
import DrawerShowButton from './element/DrawerShowButton';
import {useAppDispatch, useAppSelector} from 'hooks';
import React from 'react';
import {storeData} from 'function/async-storage';
import Btn from './element/Btn';
import {ScrollView} from 'react-native-gesture-handler';
import {
  getListIdAndListData,
  getSharedListIdAndListData,
} from 'function/getDataFromDB';
function HomeScreen({navigation}: any): JSX.Element {
  const dispatch = useAppDispatch();

  const listData = useAppSelector(state => state.list.listData);
  const sharedListData = useAppSelector(state => state.list.sharedListData);
  const usr = useAppSelector(state => state.user.userData);
  const [isFocusedMyList, setIsFocusedMyList] = React.useState(true);
  const internetConnection = useAppSelector(
    state => state.internet.internetConnection,
  );
  const [firstLoad, setFirstLoad] = React.useState(true);
  React.useEffect(() => {
    if (firstLoad && internetConnection && usr) {
      dispatch(getListIdAndListData(usr.uid));
      setFirstLoad(false);
    }
    listData.length > 0 ? storeData('@ListData', listData) : null;
  }, [listData, usr]);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
        <View>
          <DrawerShowButton navigation={navigation} />
        </View>
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <Text style={{color: 'black', fontSize: 35}}>LISTY ZAKUPOWE</Text>
          <View style={{flexDirection: 'row'}}>
            <Btn
              name={'Moje Listy'}
              function={() => setIsFocusedMyList(true)}
              color={isFocusedMyList ? '#009A41' : null}
            />
            <Btn
              name={'Udostępnione Listy'}
              function={() => {
                if (internetConnection) {
                  if (usr) {
                    dispatch(getSharedListIdAndListData(usr.uid));
                  } else {
                    ToastAndroid.show('zaloguj się', ToastAndroid.SHORT);
                  }
                } else {
                  ToastAndroid.show('Brak internetu', ToastAndroid.SHORT);
                }
                setIsFocusedMyList(false);
              }}
              color={isFocusedMyList ? null : '#009A41'}
            />
          </View>
          <ScrollView>
            {isFocusedMyList
              ? listData.map((_: any, i: any) => (
                  <TouchableOpacity
                    style={{
                      borderWidth: 2,
                      borderRadius: 100,
                      marginVertical: 10,
                      alignItems: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 3,
                      backgroundColor: '#5a8196',
                      minWidth: '90%',
                    }}
                    key={i}
                    onPress={() =>
                      navigation.navigate('Show List', {
                        listId: _.id,
                      })
                    }>
                    <Text style={{fontSize: 50, color: '#000000'}}>
                      {_.name}
                    </Text>
                  </TouchableOpacity>
                ))
              : sharedListData.map((_: any, i: any) => (
                  <TouchableOpacity
                    style={{
                      borderWidth: 2,
                      borderRadius: 100,
                      marginVertical: 10,
                      alignItems: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 3,
                      backgroundColor: '#5a8196',
                      minWidth: '90%',
                    }}
                    key={i}
                    onPress={() =>
                      navigation.navigate('Show List', {
                        listId: _.id,
                      })
                    }>
                    <Text style={{fontSize: 50, color: '#000000'}}>
                      {_.name}
                    </Text>
                  </TouchableOpacity>
                ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
export default HomeScreen;
