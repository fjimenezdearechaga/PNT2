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
import { BonosProvider } from "../context/BonosContext";



export default function RootLayout(){

    const colorScheme = useColorScheme();

    return (
        <AuthProvider>
            <SaldoProvider>
                <TransactionProvider>
                    <LocationProvider>
                            <DolarProvider>
                                <AccionesProvider>
                                    <BonosProvider>
                                        <Stack>
                                            <Stack.Screen name="index" options={{ headerShown: false }} />
                                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                            <Stack.Screen name="perfil/cambiarPass" options={{headerShown:false}}/>
                                            <Stack.Screen name="perfil/cambiarImagen" options={{headerShown:false}}/>
                                            <Stack.Screen name="saldo/agregarDinero" options={{headerTitle: 'Depositar dinero'}}/>
                                            <Stack.Screen name="saldo/sacarDinero" options={{headerTitle: 'Retirar dinero'}}/>
                                            <Stack.Screen name="transactions/transactions" options={{headerTitle: 'Transacciones'}}/>
                                            <Stack.Screen name="transactions/addTransaction" options={{headerTitle: 'Agregar Transaccion'}}/>
                                            <Stack.Screen name="transactions/removeTransaction/[id]" options={{headerTitle: 'Eliminar Transaccion'}}/>
                                            <Stack.Screen name="homeViews/acciones" options={{headerTitle: 'Acciones'}}/>
                                            <Stack.Screen name="homeViews/bonos" options={{headerTitle: 'Bonos'}}/>
                                            <Stack.Screen name="homeViews/dolar" options={{headerTitle: 'Dolares'}}/>
                                        </Stack>
                                    </BonosProvider>
                                </AccionesProvider>
                            </DolarProvider>
                    </LocationProvider>
                </TransactionProvider>
            </SaldoProvider>
        </AuthProvider>
        
    )
}