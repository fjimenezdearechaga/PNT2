import { useContext, useEffect, useState } from "react";
import { Text, View,StyleSheet,Image,Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function TabPerfil(){

    const{user} = useContext(AuthContext)
    const router= useRouter()

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Perfil de Usuario</Text>
            <View style={styles.userContainer}>
                <Image style={styles.image} source={{uri:user.avatar}}/>
                <Button 
                title="Cambiar Imagen"
                style={styles.button}
                onPress={()=>router.push('/perfil/cambiarImagen')}/>
            </View>
            <View style={styles.userContainer}>
            <Text>Nombre de Usuario: {user.userName}</Text>
            </View>
            <View style={styles.userContainer}>
            <Text>Password: {user.password}</Text>
            <Button 
                title="Cambiar Password"
                style={styles.button}
                onPress={()=>router.push('/perfil/cambiarPass')}/>
            </View>
            <View style={styles.userContainer}>
            <Text>Email: {user.email}</Text>
            </View>
           
        </View>
    )

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    userContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#c1bdbd',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 5,
        
        marginTop:10,
        marginBottom:20
    },
    infoContainer: {
        flex: 1
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    titulo:{
        fontSize: 25,
        textAlign: 'left',
        marginTop: 50,
        marginBottom: 20,
        fontWeight: '800',
    },
    detalle:{
        fontSize: 16,
        color: '#666'
    },
    button:{
        backgroundColor: '#000', // Fondo negro
        paddingVertical: 10, // Espaciado vertical
        paddingHorizontal: 200, // Espaciado horizontal
        borderRadius: 5, // Bordes redondeados
        alignItems: 'center', // Centra el contenido
        marginTop: 10, // Margen superior
        width: 100,
        marginHorizontal:20
    },
    buttonText: {
        color: 'white', // Color del texto
        
    },
    
})