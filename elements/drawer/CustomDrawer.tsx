import {
  DrawerContentScrollView,
  useDrawerProgress,
} from '@react-navigation/drawer';
import React, {useReducer} from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import Btn from 'elements/element/Btn';
import {useAppSelector, useAppDispatch} from '../../hooks';
import GoogleLoginBtn from 'elements/element/googleLoginBtn';
import auth from '@react-native-firebase/auth';
import {setFriends, setUser} from '../../redux/userSlice';
import {storeData} from '../../function/async-storage';
import { setListData } from 'redux/listSlice';
const DrawerItem = ({
  title,
  onPress,
  tabBarTestID,
  nameIcon,
  iconType,
  activeItemColor,
  color,
  visible,
}: any) => {
  return (
    <>
      {visible ? (
        <TouchableOpacity
          onPress={onPress}
          testID={tabBarTestID}
          accessibilityRole="button"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            padding: 8,
            backgroundColor: activeItemColor,
            borderRadius: 10,
          }}>
          <Icon name={nameIcon} type={iconType} color={color} size={30} />
          <Text style={{color: color, fontSize: 24, marginLeft: 8}}>
            {title}
          </Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const CustomDrawer = (props: any): JSX.Element => {
  const dispatch = useAppDispatch();

  function signOut() {
    if (usr != null) {
      auth()
        .signOut()
        .then(() => {
          dispatch(setUser(null));
          storeData('@User', null);
            dispatch(setFriends([]));
            storeData('@Friends',[])
            dispatch(setListData([]));
            storeData('@ListData',[])
            storeData('@ListId',[])
          console.log('User signed out!');
        });
    }
  }
  const {state, descriptors, navigation} = props;
  const drawerProgress = useDrawerProgress() as Animated.SharedValue<number>;
  const usr: any = useAppSelector(state => state.user.userData);
  const animation1 = (type: string) =>
    useAnimatedStyle(() => {
      const val = type === 'top' ? -100 : 100;
      const translateY = interpolate(drawerProgress.value, [0, 1], [val, 0]);
      const opacity = interpolate(drawerProgress.value, [0, 1], [0, 1]);
      return {
        transform: [{translateY}],
        opacity,
      };
    });
  const [show, toggleFooter] = useReducer(s => !s, false);

  const progress = useDerivedValue(() => {
    return show ? withSpring(1) : withSpring(0);
  });
  const animation2 = useAnimatedStyle(() => {
    const scaleY = interpolate(progress.value, [0, 1], [0, 1]);
    return {transform: [{scaleY}]};
  });

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          animation1('top'),
          {
            backgroundColor: '#739FB7',
            borderRadius: 9,
            padding: 15,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
          },
        ]}>
        <Image
          source={require('./icon.png')}
          style={{width: 100, height: 100}}
        />
        <Text style={{color: '#000000', textAlign: 'center', fontSize: 30}}>
          Cześć!
        </Text>
        <Icon name={'hand'} type={'entypo'} color={'#FFD700'} size={50} />
      </Animated.View>

      <DrawerContentScrollView
        {...props}
        style={{
          borderRadius: 9,
          marginVertical: 10,
        }}>
        <View
          style={{
            backgroundColor: '#739FB7',
            borderRadius: 16,
            paddingVertical: 20,
            borderWidth: 2,
          }}>
          {state.routes.map((route: any, index: any) => {
            const isFocused = state.index === index;
            const {options} = descriptors[route.key];

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            const color = isFocused ? '#000000' : '#3f3f34';
            const drawerItem = options;
            const activeItemColor = isFocused ? '#699A41' : null;
            return (
              <DrawerItem
                key={index}
                title={drawerItem.item.label}
                tabBarTestID={options.tabBarTestID}
                onPress={onPress}
                nameIcon={options.item.iconName}
                iconType={options.item.iconType}
                color={color}
                activeItemColor={activeItemColor}
                visible={options.item.display}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>
      <Animated.View
        style={[
          animation2,
          {
            backgroundColor: '#739FB7',
            paddingVertical: 10,
            borderRadius: 16,
            marginBottom: 10,
            borderWidth: 2,
          },
        ]}>
        {usr != null ? (
          <Btn
            name={'Wyloguj się'}
            function={() => {
              signOut();
            }}
          />
        ) : (
          <>
            <Btn
              name={'Zaloguj się '}
              function={() => {
                props.navigation.navigate('Login');
                toggleFooter();
              }}
            />
            <GoogleLoginBtn navigation={navigation} />

            <Btn
              name={'Zarejestruj się'}
              function={() => {
                props.navigation.navigate('Register');
                toggleFooter();
              }}
            />
          </>
        )}
      </Animated.View>
      <TouchableOpacity onPress={() => toggleFooter()}>
        <Animated.View
          style={[
            animation1('bottom'),
            {
              backgroundColor: '#739FB7',
              paddingVertical: 8,
              borderRadius: 16,
              marginBottom: 10,
              borderWidth: 2,
            },
          ]}>
          {usr != null ? (
            <View style={{alignItems: 'center'}}>
              <Icon
                name={show ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                type={'AntDesign'}
                color={'#000000'}
                size={20}
              />
              <Text
                style={{fontSize: 20, color: '#000000', marginVertical: 10}}>
                ZALOGOWANY SZOP
              </Text>
              <Text style={{fontSize: 15, color: '#000000', marginBottom: 10}}>
                {usr.email}
              </Text>
            </View>
          ) : (
            <>
              <View style={{alignItems: 'center'}}>
                <Icon
                  name={show ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                  type={'AntDesign'}
                  color={'#000000'}
                  size={20}
                />
                <Text
                  style={{fontSize: 20, color: '#000000', marginBottom: 10}}>
                  DOŁĄCZ DO SZOPÓW
                </Text>
              </View>
            </>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};
export default CustomDrawer;
