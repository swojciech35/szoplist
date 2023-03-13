import {Image, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
function Btn(props: any): JSX.Element {
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        borderWidth: 2,
        borderRadius: 8,
        padding: 5,
        minWidth: props.minWidth,
        margin: 10,
        backgroundColor: '#699A41',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      {props.googleLogo ? (
        <Image
          source={require('./search.png')}
          style={{width: 30, height: 30}}
        />
      ) : null}

      <Text
        style={{fontSize: 20, color: 'black', textAlign: 'center'}}
        onPress={props.function}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
}
export default Btn;
