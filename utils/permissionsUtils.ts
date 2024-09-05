import { Alert, Linking, Platform, PermissionsAndroid } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import * as Device from "expo-device";

// Función para manejar la denegación de permisos
export const handlePermissionDenied = () => {
  Alert.alert(
    "Permiso bloqueado",
    "Uno o más permisos fueron denegados. Para continuar, habilita los permisos manualmente en la configuración.",
    [
      { text: "Abrir configuración", onPress: () => Linking.openSettings() },
      { text: "Cancelar", style: "cancel" },
    ]
  );
};

// Solicitar permisos para Android 31 o superior
export const requestAndroid31Permissions = async () => {
  try {
    if (Platform.OS === "android") {
      const scanPermission = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
      if (scanPermission !== RESULTS.GRANTED) {
        return handlePermissionDenied();
      }

      const connectPermission = await request(
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
      );
      if (connectPermission !== RESULTS.GRANTED) {
        return handlePermissionDenied();
      }

      const locationPermission = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      if (locationPermission !== RESULTS.GRANTED) {
        return handlePermissionDenied();
      }

      // Si todos los permisos son concedidos

      // alert("Permisos Bluetooth concedidos");
      return true;
    }
  } catch (error) {
    console.error("Error solicitando permisos Bluetooth:", error);
    return false;
  }
};

// Solicitar permisos de Bluetooth
export const requestBluetoothPermission = async () => {
  if (Platform.OS === "android") {
    if ((Device.platformApiLevel ?? -1) < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permiso de ubicación",
          message: "Bluetooth requiere acceso a la ubicación.",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const isAndroid31PermissionsGranted = await requestAndroid31Permissions();
      return isAndroid31PermissionsGranted;
    }
  } else {
    return true;
  }
};
