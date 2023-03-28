import {View, Text, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import DrawerShowButton from './element/DrawerShowButton';
import {useAppSelector} from 'hooks';
import React from 'react';
import {storeData} from 'function/async-storage';
import Btn from './element/Btn';
import {ScrollView} from 'react-native-gesture-handler';
function HomeScreen({navigation}: any): JSX.Element {
  const listData = useAppSelector(state => state.list.listData);
  const [isFocusedMyList, setIsFocusedMyList] = React.useState(true);
  React.useEffect(() => {
    listData.length > 0 ? storeData('@ListData', listData) : null;
  }, [listData]);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
        <View>
          <DrawerShowButton navigation={navigation} />
        </View>
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <Text style={{color: 'black', fontSize: 50}}>Listy Zakupowe</Text>
          <View style={{flexDirection: 'row'}}>
            <Btn
              name={'Moje Listy'}
              function={() => setIsFocusedMyList(true)}
              color={isFocusedMyList ? '#009A41' : null}
            />
            <Btn
              name={'Udostępnione Listy'}
              function={() => setIsFocusedMyList(false)}
              color={isFocusedMyList ? null : '#009A41'}
            />
          </View>
          <ScrollView>
            {isFocusedMyList ? (
              listData.map((_: any, i: any) => (
                <TouchableOpacity
                  style={{
                    borderWidth: 2,
                    borderRadius: 100,
                    marginVertical: 10,
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 3,
                    backgroundColor: '#5a8196',
                  }}
                  key={i}
                  onPress={() =>
                    navigation.navigate('Show List', {
                      listId: _.id,
                    })
                  }>
                  <Text style={{fontSize: 50, color: '#000000'}}>{_.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{color: 'black', fontSize: 50}}>udostępnione</Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
export default HomeScreen;
