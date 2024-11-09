import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';
import { AuthProvider } from "../context/AuthContext";
import { DolarContext, DolarProvider } from "../context/DolarContext";
import { TransactionProvider } from "../context/TransactionContext";
import React from "react";
import ReactDOM from "react-dom";
import { AccionesProvider } from "../context/AccionesContext";



export default function RootLayout(){

    const colorScheme = useColorScheme();

    return (
        <AuthProvider>
            <TransactionProvider>
                <DolarProvider>
                    <AccionesProvider>
                        <Stack>
                            <Stack.Screen name="index" options={{ headerShown: false }} />
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="cambiarPass" options={{headerShown:false}}/>
                            <Stack.Screen name="cambiarImagen" options={{headerShown:false}}/>
                            <Stack.Screen name="transactions/transactions" options={{headerTitle: 'Transacciones'}}/>
                            <Stack.Screen name="transactions/addTransaction" options={{headerTitle: 'Agregar Transaccion'}}/>
                            <Stack.Screen name="transactions/removeTransaction/[id]" options={{headerTitle: 'Eliminar Transaccion'}}/>
                        </Stack>
                    </AccionesProvider>
                </DolarProvider>
            </TransactionProvider>
        </AuthProvider>
        
    )
}