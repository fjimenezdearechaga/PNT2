import { useContext } from "react";
import { FlatList, StyleSheet, View, Text, Button, TouchableOpacity} from "react-native";
import { useRouter } from 'expo-router';
import { TransactionContext } from "../../context/TransactionContext";

export default function Transactions(){


    const { transactions } = useContext(TransactionContext);

    const router  = useRouter();


    const renderItem = ({ item }) => (
        <View style={styles.dataContainer}>  
        <View style={styles.infoContainer}>
            <Text>Operacion de {item.amount > 0 ? 'compra': 'venta'}</Text>
            <TouchableOpacity
                    style={styles.buttonContainerDelete}
                    onPress={() => router.push(`/transactions/removeTransaction/${item.id}`)}
                    
            >
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
            <Text>Instrumento: {item.instrument}</Text>

        </View>
        <View style={styles.infoContainer}>
        <Text>
                Cantidad: <Text style={item.amount > 0 ? styles.positiveAmount: styles.negativeAmount}>
                    {item.amount}
                    </Text>
                </Text>
        </View>
        <View style={styles.infoContainer}>
            <Text>Cotizacion: {item.rate}</Text>
        </View>
        <View style={styles.infoContainer}>
        <Text>Total: <Text style={item.amount > 0 ? styles.positiveAmount: styles.negativeAmount}>{item.rate * item.amount}</Text></Text>

        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.dateRefreshed}>Fecha de transaccion: {new Date(item.transactionDate).toLocaleString()}</Text>
        </View>
        <View style={styles.infoContainer}>
        </View>

        </View>
    )

    return (
        <View style={styles.container}>
                <View style={styles.buttonContainerAdd}>
                    <Button
                    title="Nueva transaccion"
                    onPress={() => router.push('/transactions/addTransaction')}
                    />
                </View>

                <FlatList 
                    data={transactions} // si no es una lista con varios datos no muestra nada
                    keyExtractor={(item) => item.id} // Asegúrate de que casa sea único
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
    buttonContainerAdd:{
        marginEnd: 40,
        marginStart: 40,
        marginBottom: 40,
    },  
    buttonContainerDelete:{
        marginLeft: 40,
        marginBottom: 10,
        marginStart: 40,
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
        backgroundImage: 'linear-gradient(135deg, #fff  0%, #8b8b8b  100%)',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 5,
        paddingLeft: 30,
        justifyContent: 'center',
    },  
    dataContainer: {
        marginEnd: 40,
        marginStart: 40,
        flex: 1,
        padding: 10,
        marginBottom: 40,
        justifyContent: 'center',
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
        marginLeft: 10,
        marginRight: 10,
    },
    dateRefreshed: {
        fontStyle: 'italic',
        fontSize: 12
    },
    positiveAmount: {
        color: 'green'
    },
    negativeAmount: {
        color: 'red'
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