import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import "react-native-reanimated";
import Onboarding from "./onBoarding";
import HeartRateMonitor from "./heartRateMonitor";
import DataMonitor from "./dataMonitor";
import DataMonitor2 from "./datMonitor2";
import Medicion from "./medicion";
import LoginScreen from "./login";
import ResultScreen from "./resultScreen";
import RegisterScreen from "./registerScreenOld";
import DashboardScreen from "./dashbord";
import ProfileScreen from "./profile";
import EditProfileScreen from "./editaProfile";
import UltimosResultados from "./ultimos_resultados";
import UltimasComparativa from "./ultimas_comparativas";
import { BluetoothProvider } from "@/context/BluetoothContext";


const Stack = createStackNavigator();

export default function HomeScreen() {
  return (

    <NavigationContainer independent={true}>
      <BluetoothProvider>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HeartRateMonitor"
          component={HeartRateMonitor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DataMonitor"
          component={DataMonitor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DataMonitor2"
          component={DataMonitor2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Medicion"
          component={Medicion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="UltimosResultados"
          component={UltimosResultados}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="UltimasComparativa"
          component={UltimasComparativa}
          options={{headerShown: false}}
        />
        {/* Agrega otras pantallas aquí */}
      </Stack.Navigator>
      </BluetoothProvider>
    </NavigationContainer>
  );
}
