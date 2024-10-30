import { useContext } from "react";
import { FlatList, StyleSheet, View,Text } from "react-native";
// import { ProductContext } from "../../context/ProductContext";
// import { ProductCard } from "../../components/products/ProductCard";
// import { useRouter } from 'expo-router';
import { DolarContext } from "../../context/DolarContext";

export default function Dolar(){


    const { dolares } = useContext(DolarContext);

    console.log(dolares);
    // const router  = useRouter();


    const renderItem = ({ item }) => (
        <View  style={styles.container}>  
            <Text style={styles.name}>Moneda: {item.moneda}</Text>
            <Text style={styles.name}>Nombre: {item.nombre}</Text>
            <Text style={styles.name}>Compra: {item.compra}</Text>
            <Text style={styles.name}>Venta: {item.venta}</Text>
            <Text style={styles.name}>Fecha de Actualización: {new Date(item.fechaActualizacion).toLocaleString()}</Text>
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
    flatListContainer: {
        justifyContent: 'center'
    },
    touchable:{
        flex: 1,
        margin: 10,
        maxWidth: '45%'
    }
})