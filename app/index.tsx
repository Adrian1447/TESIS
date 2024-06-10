import DescriptionScreen1 from '@/app/(tabs)/descriptionScreen1';
import DescriptionScreen2 from '@/app/(tabs)/descriptionScreen2';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    Dimensions, 
    View,
    Text,
    StyleSheet,
    Image,
 } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import DescriptionScreen3 from './(tabs)/descriptionScreen3';


const Stack = createStackNavigator();

export default function HomeScreen() {
  return(
<NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="descriptionScreen1">
        <Stack.Screen name="descriptionScreen1" component={DescriptionScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="descriptionScreen2" component={DescriptionScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="descriptionScreen3" component={DescriptionScreen3} options={{ headerShown: false }} />
        <Stack.Screen name="principal" component={HomeScreen} options={{ headerShown: false }} />
        {/* Agrega otras pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
)}

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