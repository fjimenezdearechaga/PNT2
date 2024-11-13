import { useContext, useEffect } from "react";
import { Text, View,StyleSheet,Image,Button } from "react-native";
import { useRouter } from "expo-router";
import { SaldoContext } from "../../context/SaldoContext";

export default function TabSaldo(){

    const{fetchSaldo,saldo} = useContext(SaldoContext)
    const router= useRouter()

    useEffect(()=>{
        fetchSaldo()
    })


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Billetera</Text>
    
            <View style={styles.userContainer}>
            <Text>Saldo: {saldo}</Text>
            </View>
            <View style={styles.userContainer}>
            <Button 
                title="Agregar dinero"
                style={styles.button}
                onPress={()=>router.push('/saldo/agregarDinero')}/>
            </View>
            <View style={styles.userContainer}>
            <Button 
                title="Sacar dinero"
                style={styles.button}
                onPress={()=>router.push('/saldo/sacarDinero')}/>
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