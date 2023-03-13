import {Image, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-element-textinput';
function CustomTextInput(props: any): JSX.Element {
  return (
    <TextInput
            style={{
              flex: 1,
              maxHeight: 80,
              minHeight: 65,
              margin: 20,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#000000',
              backgroundColor: '#FFFFFF',
            }}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            value={props.value}
            label={props.label}
            mode={props.mode}
            labelStyle={{color: 'black'}}
            placeholderStyle={{color: 'gray'}}
          />
  );
}
export default CustomTextInput;
