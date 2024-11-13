import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '../../constants/Colors'
import { useColorScheme } from 'react-native'

export default function TabLayout(){

    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons size={28} name={focused ? 'home' : 'home-outline'} color={color}/>
                    )
                }}
            />
            <Tabs.Screen
                name="perfil"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons size={28} name={focused ? 'person' : 'person-outline'} color={color}/>
                    )
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: "Map",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons size={28} name={focused ? 'person' : 'person-outline'} color={color}/>
                    )
                }}
            />
            <Tabs.Screen
                name="saldo"
                options={{
                    title: "Saldo",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons size={28} name={focused ? 'cash' : 'cash-outline'} color={color}/>
                    )
                }}
            />
        </Tabs>
    )
}