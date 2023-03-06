import { DrawerScreenProps } from "@react-navigation/drawer";

export type RootStackParamList ={
    "Home": undefined;
    "Create New List": {list: object};
    "Select products screen": {list: object};
    "Show List": {listId: string};
    "Login": undefined;
    "Register": undefined;
  }
  

export type CreateShopListProps = DrawerScreenProps<RootStackParamList,"Create New List">

export type SelectProductsScreenProps = DrawerScreenProps<RootStackParamList,"Select products screen">

export type ShopListProps = DrawerScreenProps<RootStackParamList,"Show List">