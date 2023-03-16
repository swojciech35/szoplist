import React from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DrawerShowButton = ({width=75,navigation}:any) => {
  
  return (
    <View style={{position:'absolute',zIndex:2,marginTop:-10}}>
    <TouchableOpacity onPress={()=>navigation.openDrawer()}  >
      <Image
          source={require('../element/iconBackgroundClear.png')}
          style={{width: width, height: width}}
        />
    </TouchableOpacity></View>
  );
};


export default DrawerShowButton;