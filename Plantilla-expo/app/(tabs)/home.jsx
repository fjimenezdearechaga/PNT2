import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { useRouter } from 'expo-router';

import acciones from '../../assets/acciones.jpg';
import dolar from '../../assets/dolar.png';
import bonos from '../../assets/bonos.jpg';
import transactions from '../../assets/transactions.jpg';


export default function HomeTabScreen() {
    const router  = useRouter();



  return (
    <ScrollView style={styles.container}>
        
        <Text style={styles.titulo}>Cotizaciones</Text>
        <View style={styles.container}>
            <Text style={styles.name}>Historial de transacciones</Text>
           
            <Image source={transactions}  style={styles.image}/>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/transactions/transactions')}
                    
            >
                <Text style={styles.buttonText}>Ver</Text>
            </TouchableOpacity>
        </View>
                <View style={styles.container}>
            <Text style={styles.name}>Dolar</Text>
           
            <Image source={dolar}  style={styles.image}/>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/homeViews/dolar')}
                    
            >
                <Text style={styles.buttonText}>Ver</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <Text style={styles.name}>Bonos</Text>
            <Image source={bonos}  style={styles.image}/>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => Alert.alert('Ir a vista de Bonos')}
                    
                    
            >
                <Text style={styles.buttonText}>Ver</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <Text style={styles.name}>Acciones</Text>
            <Image source={acciones} style={styles.image}/>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/homeViews/acciones')}
                
            >
                <Text style={styles.buttonText}>Ver</Text>
            </TouchableOpacity>
            
        </View>
    </ScrollView>
  )
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 30,
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
        width: 'auto',
        height: height * 0.1, // 10% de altura la pantalla del celular en el que se vea 
        borderRadius: 15,
        marginTop:20,
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
        textAlign: 'center',
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
        paddingHorizontal: 20, // Espaciado horizontal
        borderRadius: 5, // Bordes redondeados
        alignItems: 'center', // Centra el contenido
        marginTop: 20, // Margen superior
        width: 'auto',
        height:'50px',
    },
    buttonText: {
        color: 'white', // Color del texto
        
    },
    
})