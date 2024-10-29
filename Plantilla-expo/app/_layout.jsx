import { useColorScheme } from "react-native";
import { Stack } from 'expo-router';
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout(){

    const colorScheme = useColorScheme();

    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
        
    )
}