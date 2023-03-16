import CreateShopList from "elements/CreateShopList";
import HomeScreen from "elements/HomeScreen";
import LoginScreen from "elements/LoginScreen";
import RegisterScreen from "elements/RegisterScreen";
import SelectProductsScreen from "elements/SelectProductsScreen";
import ShopList from "elements/ShopList";
export const ScreenArray=[
    {route: "Home",label:'Moje Listy',component:HomeScreen,unmountOnBlur:false,initialParams:{},headerShown:false,iconName:'list-alt',iconType:"",display:true},
    {route: "Create New List",label:'Nowa Lista ',component:CreateShopList,unmountOnBlur:true,initialParams:{list:[]},headerShown:false,iconName:'plus',iconType:"feather",display:true},
    {route: "Select products screen",label:'Wybierz produkty ',component:SelectProductsScreen,initialParams:{list:[]},unmountOnBlur: true,headerShown:false,iconName:'hand-pointer-o',iconType:'font-awesome',display:false},
    {route: "Show List",label:'Pokaż listę ',component:ShopList,initialParams:{},unmountOnBlur: false,headerShown:false,iconName:'list-alt',iconType:"",display:false},
    {route: "Login",label:'Zaloguj się ',component:LoginScreen,initialParams:{},unmountOnBlur: false,headerShown:false,iconName:'log-in',iconType:"feather",display:false},
    {route: "Register",label:'Zarejestruj się ',component:RegisterScreen,initialParams:{},unmountOnBlur: false,headerShown:false,iconName:'app-registration',iconType:"",display:false},
]