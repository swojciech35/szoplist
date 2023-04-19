import {ListToSaveType, ShopListProps} from 'navTypes';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import CustomCheckbox from './CustomCheckbox';
import DrawerShowButton from './element/DrawerShowButton';
import {ProgressBar} from 'react-native-paper';
import {SetStateAction, useEffect, useState} from 'react';
import Btn from './element/Btn';
import {Icon} from 'react-native-elements';
import {
  addListIdToShareUser,
  addNewList,
  addSharedListIdToFriend,
  deleteList,
  deleteListIdUser,
  deleteSharedList,
  deleteSharedListIdOfFriend,
  getFriends,
  getList,
} from 'function/database';
import {useAppSelector} from 'hooks';

function ShopList({route, navigation}: ShopListProps): JSX.Element {
  const [friends, setFriends] = useState([]);
  const usr = useAppSelector(state => state.user.userData);
  const netInfo = useAppSelector(state => state.internet.internetConnection);
  const myListsIds = useAppSelector(state => state.list.listId);
  const myListsData = useAppSelector(state => state.list.listData);
  const [list, setList] = useState({
    id: '',
    listOfProducts: [
      {
        category: '',
        products: [{name: '', checked: false}],
      },
    ],
    name: '',
  });
  const [marked, setMarked] = useState([[false]]);
  const [loading, setLoading] = useState(true);
  const [friendsWindow, setFriendsWindow] = useState(false);
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [finishWindow, setFinishWindow] = useState(false);

  const ifListOwner = () => {
    let result = false;
    myListsIds.forEach(value => {
      if (value.id == list.id) {
        result = true;
      }
    });
    return result;
  };

  const deleteListFunction = () => {
    deleteList(list.id);
    deleteListIdUser(usr.uid, list.id);

    friends.map(friend => {
      if (
        friend.sharedList != null &&
        Object.keys(friend.sharedList).includes(list.id)
      ) {
        deleteSharedListIdOfFriend(usr.uid, friend.id, list.id);
        deleteSharedList(friend.id, list.id);
      }
    });

    navigation.navigate('Home');
  };

  const markProduct = (catIndex: number, prodIndex: number) => {
    setMarked(check =>
      check.map((itemC, indexC) =>
        indexC === catIndex
          ? check[indexC].map((itemP, indexP) =>
              indexP === prodIndex ? !itemP : itemP,
            )
          : itemC,
      ),
    );
  };

  const getListFromDatabase = async () => {
    try {
      const json = await getList(route.params.listId);

      setMarked(
        Array(json.listOfProducts.length)
          .fill(null)
          .map((item, index) =>
            Array(json.listOfProducts[index].products.length)
              .fill(false)
              .map((prod, prodIndex) => {
                return json.listOfProducts[index].products[prodIndex].checked;
              }),
          ),
      );

      setList(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getListFromRedux = () => {
    myListsData.forEach(value => {
      if (value.id === route.params.listId) {
        setMarked(
          Array(value.listOfProducts.length)
            .fill(null)
            .map((item, index) =>
              Array(value.listOfProducts[index].products.length)
                .fill(false)
                .map((prod, prodIndex) => {
                  return value.listOfProducts[index].products[prodIndex]
                    .checked;
                }),
            ),
        );
        setList(value);
        setLoading(false);
      }
    });
  };

  const getFriendsFromDatabase = async () => {
    try {
      if (usr != null) {
        const json = await getFriends(usr.uid);
        setFriends(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const howMany = () => {
    let resultMarked = 0;
    let resultAll = 0;
    marked.forEach(category => {
      resultAll += category.length;

      resultMarked += category.filter(item => {
        return item;
      }).length;
    });

    return [resultMarked, resultAll];
  };

  const updateList = () => {
    let tmp = list;
    tmp.listOfProducts.forEach((category, categoryIndex) =>
      category.products.forEach(
        (product, productIndex) =>
          (product.checked = marked[categoryIndex][productIndex]),
      ),
    );
    return tmp;
  };

  useEffect(() => {
    if (netInfo) {
      getListFromDatabase();
      getFriendsFromDatabase();
    } else {
      getListFromRedux();
    }
  }, []);

  const mappedFriends = friends.map(friend => {
    return (
      <TouchableOpacity
        key={friend.name}
        style={{
          flexDirection: 'row',
          minWidth: '100%',
          margin: 3,
        }}
        onPress={() => {
          if (
            friend.sharedList == null ||
            !Object.keys(friend.sharedList).includes(list.id)
          ) {
            addSharedListIdToFriend(usr.uid, friend.id, list.id);
            addListIdToShareUser(friend.id, list.id);
          } else {
            {
              deleteSharedListIdOfFriend(usr.uid, friend.id, list.id);
              deleteSharedList(friend.id, list.id);
            }
          }
          getFriendsFromDatabase();
        }}>
        <CustomCheckbox
          isChecked={
            friend.sharedList != null
              ? Object.keys(friend.sharedList).includes(list.id)
              : false
          }
        />
        <Text
          style={{
            fontSize: 20,
            color: 'black',
          }}>
          {' '}
          {friend.name}
        </Text>
      </TouchableOpacity>
    );
  });

  let mappedList = list.listOfProducts.map((category, categoryIndex) =>
    category.products.map((product, productIndex) => (
      <TouchableOpacity
        key={product.name}
        onPress={() => markProduct(categoryIndex, productIndex)}
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 6,
          paddingVertical: 3,
        }}>
        <CustomCheckbox isChecked={marked[categoryIndex][productIndex]} />
        <Text style={{fontSize: 20, color: 'black'}}> {product.name}</Text>
        <Text style={{fontSize: 20, color: '#333333', fontStyle: 'italic'}}>
          {' '}
          ({category.category})
        </Text>
      </TouchableOpacity>
    )),
  );

  const deleteModal = (
    <Modal visible={deleteWindow} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <>
            <Text style={{color: 'black', fontSize: 20, marginBottom: 20}}>
              Czy na pewno chcesz usunąć listę {list.name}?
            </Text>
            <Btn
              function={() => {
                deleteListFunction();
              }}
              name="Tak"
              minWidth="60%"
            />
            <Btn
              function={() => {
                setDeleteWindow(!deleteWindow);
              }}
              name="Nie"
              minWidth="60%"
            />
          </>
        </View>
      </View>
    </Modal>
  );

  const finishModal = (
    <Modal visible={finishWindow} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <>
            <Text style={{color: 'black', fontSize: 20, marginBottom: 20}}>
              Skończono zakupy!
            </Text>
            <Btn
              function={() => {
                deleteListFunction();
              }}
              name="Usuń listę"
              minWidth="60%"
            />
            <Btn
              function={() => {
                setMarked(
                  Array(list.listOfProducts.length)
                    .fill(null)
                    .map((item, index) =>
                      Array(list.listOfProducts[index].products.length).fill(
                        false,
                      ),
                    ),
                );
                setFinishWindow(!finishWindow);
              }}
              name="Zresetuj listę"
              minWidth="60%"
            />
            <Btn
              function={() => {
                addNewList(list.id, updateList());
                navigation.navigate('Home');
              }}
              name="Wyjdź"
              minWidth="60%"
            />
          </>
        </View>
      </View>
    </Modal>
  );

  const friendsModal = (
    <Modal visible={friendsWindow} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <>
            <Text style={{color: 'black', fontSize: 30, marginBottom: 20}}>
              TWOI ZNAJOMI
            </Text>
            <ScrollView>{mappedFriends}</ScrollView>
            <Btn
              function={() => {
                setFriendsWindow(!friendsWindow);
              }}
              name="Powrót"
              minWidth="60%"
            />
          </>
        </View>
      </View>
    </Modal>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#739FB7'}}>
      <DrawerShowButton navigation={navigation} />

      {loading ? null : (
        <>
          {friendsModal}
          {deleteModal}
          {finishModal}

          <Text
            style={{
              color: 'black',
              fontSize: 30,
              marginVertical: 10,
              textAlign: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              marginHorizontal: 100,
            }}>
            {list.name}
          </Text>

          {(usr != null && ifListOwner()) || usr == null ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                position: 'absolute',
                alignSelf: 'flex-end',

                padding: 10,
              }}>
              <Icon
                name={'trash-2'}
                type={'feather'}
                color={'#FF0000'}
                size={30}
                onPress={() => setDeleteWindow(true)}
              />
              <Icon
                name={'edit'}
                type={'feather'}
                color={'#3c5925'}
                size={30}
                onPress={() => {
                  navigation.navigate('Create New List', {
                    id: list.id,
                    list: list.listOfProducts,
                    name: list.name,
                  });
                }}
              />
            </View>
          ) : null}

          <Text
            style={{
              fontSize: 20,
              color: 'black',
              textAlign: 'right',
              marginHorizontal: 10,
            }}>
            {howMany()[0]} / {howMany()[1]}
          </Text>
          <ProgressBar
            progress={howMany()[0] / howMany()[1]}
            color="#699A41"
            style={{margin: 15, borderWidth: 2, height: 15, borderRadius: 10}}
          />
          <ScrollView style={{marginHorizontal: 10}}>{mappedList}</ScrollView>
          {usr != null && ifListOwner() && netInfo ? (
            <Btn
              name="Udostępnij listę"
              function={() => {
                setFriendsWindow(true);
              }}
            />
          ) : null}

          <Btn
            name="Zapisz listę"
            function={() => {
              if (howMany()[0] == howMany()[1]) {
                setFinishWindow(true);
              } else {
                addNewList(list.id, updateList());
                navigation.navigate('Home');
              }
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}
export default ShopList;

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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 20,
    maxWidth: '70%',
    maxHeight: '40%',
  },
});
