import { DrawerScreenProps } from "@react-navigation/drawer";

export type RootStackParamList ={
    "Home": undefined;
    "Create New List": {list: {category: string; products: {name: string;checked:boolean;}[];}[]};
    "Select products screen": {list: {category: string; products: {name: string;checked:boolean;}[];}[]};
    "Show List": {listId: string};
    "Login": undefined;
    "Register": undefined;
  }
  

export type CreateShopListProps = DrawerScreenProps<RootStackParamList,"Create New List">

export type SelectProductsScreenProps = DrawerScreenProps<RootStackParamList,"Select products screen">

export type ShopListProps = DrawerScreenProps<RootStackParamList,"Show List">