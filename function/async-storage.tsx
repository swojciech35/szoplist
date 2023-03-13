import AsyncStorage from '@react-native-async-storage/async-storage';
async function getData(key: string) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log('read ', key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

async function storeData(key: string, value: any) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('add ', key);
  } catch (e) {
    console.log(e);
  }
}

export {getData, storeData};
