import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Share,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {useAppSelector, useAppDispatch} from '../hooks';
import DrawerShowButton from './element/DrawerShowButton';
import {Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import Btn from './element/Btn';
import CustomTextInput from './element/CustomTextInput';
import {addFriend, removeFriend} from 'redux/userSlice';
import {storeData} from 'function/async-storage';

function FriendsScreen({navigation}: any): JSX.Element {
  const dispatch = useAppDispatch();
  const friends: any = useAppSelector(state => state.user.friends);
  const usr = useAppSelector(state => state.user.userData);
  const [person, setPerson] = React.useState({name: null, id: null});
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [modalAddNewFriendVisibility, setModalAddNewFriendVisibility] =
    React.useState(false);
  const [name, setname] = React.useState('');
  const [friendId, setFriendId] = React.useState('');

  const modal = (
    <Modal visible={modalVisibility} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisibility(false);
              }}>
              <Icon
                name={'arrow-left'}
                type={'feather'}
                color={'#000000'}
                size={45}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 40, color: '#000000', maxWidth: '80%'}}>
              {person.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(removeFriend(person));
                setModalVisibility(false);
              }}>
              <Icon
                name={'trash-2'}
                type={'feather'}
                color={'#FF0000'}
                size={45}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  const modalAddNewFriend = (
    <Modal
      visible={modalAddNewFriendVisibility}
      animationType="slide"
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
            }}
            onPress={() => {
              setModalAddNewFriendVisibility(false);
            }}>
            <Icon
              name={'arrow-left'}
              type={'feather'}
              color={'#000000'}
              size={45}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              color: '#000000',
              maxWidth: '80%',
              textAlign: 'center',
            }}>
            Dodaj Szopa
          </Text>
          <CustomTextInput
            placeholder="Nazwa"
            onChangeText={setname}
            value={name}
            label="Nazwa"
          />
          <CustomTextInput
            placeholder="ID Szopa"
            onChangeText={setFriendId}
            value={friendId}
            label="ID Szopa"
          />
          <Btn
            name={'Dodaj znajomego Szopa'}
            function={() => {
              dispatch(addFriend({name: name, id: friendId}));
              setname('');
              setFriendId('');
              setModalAddNewFriendVisibility(false);
            }}
            minWidth={'65%'}
          />
        </View>
      </View>
    </Modal>
  );

  const onShare = async () => {
    if (usr != null) {
      try {
        await Share.share({
          message: `Cześć Szopie! Dodaj mnie do znajomych wpisując poniższe ID:\n ${usr.uid}`,
          title: 'SzopLIst',
        });
      } catch (error: any) {
        console.log(error.message);
      }
    } else {
      ToastAndroid.show('Zaloguj się aby pobrać ID', ToastAndroid.SHORT);
    }
  };

  React.useEffect(() => {
    storeData('@Friends', friends);
  }, [friends]);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
        <DrawerShowButton navigation={navigation} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {modal}
          {modalAddNewFriend}
          <Text style={{color: 'black', fontSize: 40}}>Przyjazne Szopy</Text>
          {friends != null && friends.length > 0 ? (
            <View style={{width: '100%'}}>
              <ScrollView style={{height: '80%'}}>
                {friends.map((_: any, i: any) => (
                  <TouchableOpacity
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setPerson(_);
                      setModalVisibility(true);
                    }}>
                    <Icon
                      name={'user'}
                      type={'feather'}
                      color={'#000000'}
                      size={30}
                    />
                    <Text style={{color: 'black', fontSize: 40}}>
                      {' '}
                      {_.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>
        <Btn
          name={'Dodaj znajomego Szopa'}
          function={() =>
            usr != null
              ? setModalAddNewFriendVisibility(true)
              : ToastAndroid.show(
                  'Zaloguj się aby dodać znajomych',
                  ToastAndroid.SHORT,
                )
          }
          minWidth={'65%'}
        />
        <Btn
          name={'Udostępnij swoje ID'}
          function={() => onShare()}
          minWidth={'65%'}
        />
      </SafeAreaView>
    </>
  );
}
export default FriendsScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#5a8196',
    borderRadius: 20,
    borderWidth: 2,
    padding: 15,
    minWidth: '80%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 20,
  },
});
