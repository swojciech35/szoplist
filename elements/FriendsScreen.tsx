import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useAppSelector, useAppDispatch} from '../hooks';
import DrawerShowButton from './element/DrawerShowButton';
import {Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import Btn from './element/Btn';
import CustomTextInput from './element/CustomTextInput';

function FriendsScreen({navigation}: any): JSX.Element {
  const friends = useAppSelector(state => state.user.friends);
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
            function={() => setModalAddNewFriendVisibility(true)}
            minWidth={'65%'}
          />
        </View>
      </View>
    </Modal>
  );
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
        <DrawerShowButton navigation={navigation} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {modal}
          {modalAddNewFriend}
          <Text style={{color: 'black', fontSize: 40}}>Przyjazne Szopy</Text>
          {friends.length > 0 ? (
            <View style={{width: '100%'}}>
              <ScrollView style={{height: '80%'}}>
                {friends.map((_: any, i: any) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name={'user'}
                      type={'feather'}
                      color={'#000000'}
                      size={30}
                    />
                    <TouchableOpacity
                      style={{display: 'flex'}}
                      onPress={() => {
                        setPerson(_);
                        setModalVisibility(true);
                      }}>
                      <Text style={{color: 'black', fontSize: 40}}>
                        {' '}
                        {_.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>
        <Btn
          name={'Dodaj znajomego Szopa'}
          function={() => setModalAddNewFriendVisibility(true)}
          minWidth={'65%'}
        />
        <Btn
          name={'Udostępnij swoje ID'}
          function={() => console.log('kiedyś bedzie działało')}
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
