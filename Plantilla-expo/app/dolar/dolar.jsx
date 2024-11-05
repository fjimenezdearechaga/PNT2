import { useContext } from "react";
import { FlatList, StyleSheet, View,Text } from "react-native";
// import { ProductContext } from "../../context/ProductContext";
// import { ProductCard } from "../../components/products/ProductCard";
// import { useRouter } from 'expo-router';
import { DolarContext } from "../../context/DolarContext";

export default function Dolar(){


    const { dolares } = useContext(DolarContext);

    // const router  = useRouter();


    const renderItem = ({ item }) => (
        <View  style={styles.dataContainer}>  
            <View style={styles.infoContainer}>
                <Text style={styles.name}>Moneda: {item.moneda}</Text>
                <Text style={styles.name}>Compra: <b>{item.compra}</b></Text>
                
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>Nombre: {item.nombre}</Text>
                <Text style={styles.name}>Venta: <b>{item.venta}</b></Text>
            </View>
            <Text style={styles.dateRefreshed}>Ultima Actualización: {new Date(item.fechaActualizacion).toLocaleString()}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
                <FlatList 
                    data={dolares} // si no es una lista con varios datos no muestra nada
                    keyExtractor={(item) => item.casa} // Asegúrate de que casa sea único
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContainer}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginBottom: 40,
        justifyContent: 'center'
    },
    button:{
        
    },
    dataContainer: {
        marginEnd: 40,
        marginStart: 40,
        flex: 1,
        padding: 10,
        marginBottom: 40,
        justifyContent: 'center',
        backgroundColor: 'black',
        borderColor: 'green',
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: '#8BC6EC',
        backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #d1e7e7 100%)'

    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 40,
        marginRight: 40,
    },
    dateRefreshed: {
        marginTop: 5,
        marginStart: 40,
        fontStyle: 'italic',
        fontSize: 12
    },
    name: {

    },
    flatListContainer: {
        justifyContent: 'center'
    },
    touchable:{
        flex: 1,
        margin: 10,
        maxWidth: '45%'
    }
})