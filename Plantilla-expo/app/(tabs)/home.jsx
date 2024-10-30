import { View, Text, ScrollView, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useRouter } from 'expo-router';
import { useEffect, useState, useContext } from 'react';
import { DolarContext } from "../../context/DolarContext";


import acciones from '../../assets/acciones.jpg';
import dolar from '../../assets/dolar.png';
import bonos from '../../assets/bonos.jpg';

export default function HomeTabScreen() {
    
    const [users, setUsers] = useState([])
    const { dolares } = useContext(DolarContext);
    
    const router  = useRouter();

    /*Se ejecuta al inciar la vista*/ 
    useEffect(() => { 
      const fetchUsers = async () => {
        try {
            const respuesta = await fetch('https://randomuser.me/api/?results=1500')
            const data = await respuesta.json()
            setUsers(data.results)
        } catch (error) {
            console.error('error: ', error)
        }
      }

      fetchUsers()
    }, [])
    


  return (
    <View style={styles.container}>
        
        <Text style={styles.titulo}>Cotizaciones</Text>
        <View style={styles.container}>
            <Text style={styles.name}>Dolar</Text>
           
            <Image source={dolar}  style={styles.image}/>
            <TouchableOpacity
                    style={styles.button}
                    //onPress={() => Alert.alert('Ir a vista de Dolar')}
                    onPress={() => router.push('/dolar/dolar')}
                    
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
                    onPress={() => Alert.alert('Ir a vista de Acciones')}
                
            >
                <Text style={styles.buttonText}>Ver</Text>
            </TouchableOpacity>
            
        </View>

        
        
       {/* Lista de usuarios */}
        {/* <FlatList
            data={users}
            keyExtractor={(item) => item.login.uuid}
            renderItem={({item}) => (
                <View key={item.login.uuid} style={styles.userContainer}>
                    <Image source={{ uri: item.picture.large}} style={styles.image}/>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
                        <Text style={styles.detalle}>Nacionalidad: {item.nat}</Text>
                        <Text style={styles.detalle}>Edad: {item.dob.age}</Text>
                    </View>
                </View>
            )}
        >
        </FlatList>  */}

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
        width: 'auto',
        height: 100,
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
        width: 'auto'
    },
    buttonText: {
        color: 'white', // Color del texto
        
    },
    
})