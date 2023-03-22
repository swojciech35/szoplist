import {DrawerScreenProps} from '@react-navigation/drawer';

export type RootStackParamList = {
  Home: undefined;
  'Create New List': ListToSaveType;
  'Select products screen': ListToSaveType;
  'Show List': {listId: string};
  Login: undefined;
  Register: undefined;
};

export type ListToSaveType = {
  id?: string;
  name?: string;
  list: {category: string; products: {name: string; checked: boolean}[]}[];
};

export type CreateShopListProps = DrawerScreenProps<
  RootStackParamList,
  'Create New List'
>;

export type SelectProductsScreenProps = DrawerScreenProps<
  RootStackParamList,
  'Select products screen'
>;

export type ShopListProps = DrawerScreenProps<RootStackParamList, 'Show List'>;
