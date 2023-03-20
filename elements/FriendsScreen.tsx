import {
  View,
  Text,
  ToastAndroid,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useAppSelector, useAppDispatch} from '../hooks';
import DrawerShowButton from './element/DrawerShowButton';
import {Icon} from 'react-native-elements';

function FriendsScreen({navigation}: any): JSX.Element {
  const friends = useAppSelector(state => state.user.friends);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
        <DrawerShowButton navigation={navigation} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontSize: 40}}>Przyjazne Szopy</Text>
          {friends.length > 0
            ? friends.map((_: any, i: any) => (
                <View
                  style={{
                    display: 'flex',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    minWidth: '80%',
                  }}>
                  <Text style={{color: 'black', fontSize: 50}}>{_.name}</Text>
                  <TouchableOpacity
                    style={{display: 'flex'}}
                    onPress={() => console.log(_.id)}>
                    <Icon
                      name={'trash-2'}
                      type={'feather'}
                      color={'red'}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              ))
            : null}
        </View>
      </SafeAreaView>
    </>
  );
}
export default FriendsScreen;
