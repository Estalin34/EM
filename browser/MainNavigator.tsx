import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "../screens/WelcomeScreen";
import Pantalla1Screen from "../screens/Pantalla1Screen";
import Pantalla2Screen from "../screens/Pantalla2Screen";
import Pantalla3Screen from "../screens/Pantalla3Screen";
import Pantalla4Screen from "../screens/Pantalla4Screen";
import Api from "../screens/Api";
import EditarPeliculaScreen from "../screens/EditarPeliculaScreen";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
  return <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Login" component={Pantalla1Screen} />
    <Stack.Screen name="Register" component={Pantalla2Screen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Drawer" component={MyDrawer} />
  </Stack.Navigator>;
}

function MyDrawer() {
  return <Drawer.Navigator initialRouteName="Visualizar API">
    <Drawer.Screen name="Ingresa un Producto" component={Pantalla3Screen} />
    <Drawer.Screen name="Detalle Producto" component={Pantalla4Screen} />
    <Drawer.Screen name="Visualizar API" component={Api} />
    <Drawer.Screen name="EditarPelicula" component={EditarPeliculaScreen} />
  </Drawer.Navigator>;
}

export default function MainNavigator(){
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
};