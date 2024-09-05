import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { requestBluetoothPermission } from "@/utils/permissionsUtils";

export const useBluetoothPermissions = () => {
  const [isPermissionsGranted, setIsPermissionsGranted] =
    useState<boolean>(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const granted = await requestBluetoothPermission();
      if (!granted) {
        Alert.alert(
          "Permisos Bluetooth necesarios",
          "Por favor, habilita los permisos Bluetooth para continuar."
        );
      }
      setIsPermissionsGranted(!!granted);
    };

    checkPermissions();
  }, []);

  return isPermissionsGranted;
};
