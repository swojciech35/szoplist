import {View, Text, ToastAndroid, SafeAreaView} from 'react-native';
import React from 'react';
function FriendsScreen({navigation}: any): JSX.Element {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
        <View>
            <Text>Friends Sceen</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
export default FriendsScreen;
