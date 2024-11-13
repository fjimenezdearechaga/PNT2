import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';
import { AuthProvider } from "../context/AuthContext";
import { DolarProvider } from "../context/DolarContext";
import { TransactionProvider } from "../context/TransactionContext";
import { LocationProvider } from "../context/LocationContext";
import React from "react";
import ReactDOM from "react-dom";
import { AccionesProvider } from "../context/AccionesContext";
import { SaldoProvider } from "../context/SaldoContext";



export default function RootLayout(){

    const colorScheme = useColorScheme();

    return (
        <AuthProvider>
            <SaldoProvider>
                <TransactionProvider>
                <LocationProvider>
                        <DolarProvider>
                            <AccionesProvider>
                                <Stack>
                                    <Stack.Screen name="index" options={{ headerShown: false }} />
                                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                    <Stack.Screen name="perfil/cambiarPass" options={{headerShown:false}}/>
                                    <Stack.Screen name="perfil/cambiarImagen" options={{headerShown:false}}/>
                                    <Stack.Screen name="saldo/agregarDinero" options={{headerShown:false}}/>
                                <Stack.Screen name="saldo/sacarDinero" options={{headerShown:false}}/>
                                <Stack.Screen name="transactions/transactions" options={{headerTitle: 'Transacciones'}}/>
                                    <Stack.Screen name="transactions/addTransaction" options={{headerTitle: 'Agregar Transaccion'}}/>
                                    <Stack.Screen name="transactions/removeTransaction/[id]" options={{headerTitle: 'Eliminar Transaccion'}}/>
                                </Stack>
                            </AccionesProvider>
                        </DolarProvider>
                </LocationProvider>
                </TransactionProvider>
            </SaldoProvider>
        </AuthProvider>
        
    )
}