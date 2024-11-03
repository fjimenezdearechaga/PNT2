import { useContext } from "react";
import { FlatList, StyleSheet, View, Text, Button } from "react-native";
import { useRouter } from 'expo-router';
import { TransactionContext } from "../../context/TransactionContext";

export default function Transactions(){


    const { transactions } = useContext(TransactionContext);

    const router  = useRouter();


    const renderItem = ({ item }) => (
        <View style={styles.dataContainer}>  
        <View style={styles.infoContainer}>
            <Text>Operacion de {item.amount > 0 ? 'compra': 'venta'}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text>Instrumento: {item.instrument}</Text>
                <Text>
                Cantidad: <b style={item.amount > 0 ? styles.positiveAmount: styles.negativeAmount}>
                    {item.amount}
                    </b>
                </Text>
        </View>
        <View style={styles.infoContainer}>
            <Text>Cotizacion: {item.rate}</Text>
            <Text>Total: <b style={item.amount > 0 ? styles.positiveAmount: styles.negativeAmount}>{item.rate * item.amount}</b></Text>
        </View>
        <Text style={styles.dateRefreshed}>Fecha de transaccion: {new Date(item.transactionDate).toLocaleString()}</Text>

        </View>
    )

    return (
        <View style={styles.container}>
                <View style={styles.buttonContainer}>
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
    buttonContainer:{
        marginEnd: 40,
        marginStart: 40,
        marginBottom: 40,
        color: 'yellow'
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