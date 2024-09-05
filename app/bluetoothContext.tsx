import React, { createContext, useState } from 'react';
import { ReactNode } from 'react';

interface BluetoothContextType {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}
interface BluetoothProviderProps {
  children: ReactNode;
}

// Crea el contexto con un valor por defecto
export const BluetoothContext = createContext<BluetoothContextType>({
  message: "",
  setMessage: () => {},
});

// Proveedor del contexto
export const BluetoothProvider = ({ children }: BluetoothProviderProps) => {
  const [message, setMessage] = useState('');

  return (
    <BluetoothContext.Provider value={{ message, setMessage }}>
      {children}
    </BluetoothContext.Provider>
  );
};
