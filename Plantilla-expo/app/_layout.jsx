import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';
import { AuthProvider } from "../context/AuthContext";
import { DolarContext, DolarProvider } from "../context/DolarContext";
import React from "react";
import ReactDOM from "react-dom";



export default function RootLayout(){

    const colorScheme = useColorScheme();

    return (
        <AuthProvider>
            <DolarProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="cambiarPass" options={{headerShown:false}}/>
                    <Stack.Screen name="cambiarImagen" options={{headerShown:false}}/>
                </Stack>
            </DolarProvider>
        </AuthProvider>
        
    )
}