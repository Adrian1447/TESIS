import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";
import Onboarding from "./onBoarding";
import PrincipalScreen from "./(tabs)/principal";
import HeartRateMonitor from "./heartRateMonitor"

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        {/*<Stack.Screen name="descriptionScreen1" component={DescriptionScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="descriptionScreen2" component={DescriptionScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="descriptionScreen3" component={DescriptionScreen3} options={{ headerShown: false }} />
        <Stack.Screen name="principal" component={HomeScreen} options={{ headerShown: false }} />*/}
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Principal"
          component={PrincipalScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="HeartRateMonitor"
        component={HeartRateMonitor}
        options={{ headerShown: false }}
        />
        {/* Agrega otras pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  background: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    color: "#FFF",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  image1: { position: "relative", aspectRatio: "0.89" },
});
