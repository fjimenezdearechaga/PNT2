import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

import { TextInput, View, StyleSheet, Button, Text} from "react-native"
import { useRouter } from "expo-router";
import { TransactionContext } from "../../context/TransactionContext";


export default function addTransactionScreen(){

    const { addTransaction } = useContext(TransactionContext)

    const [ instrument, setInstrument ] = useState('')
    const [ amount, setAmount ] = useState('')
    const [ rate, setRate ] = useState('')
    const router = useRouter()

    const registerTransaction = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const userDataParsed = JSON.parse(JSON.parse(userData))
        const currentTimestamp = Math.floor(Date.now() / 1000);

        const newTransaction = {
            id: Math.random.toString(),
            instrument: instrument,
            amount: amount,
            rate: parseFloat(rate),
            transactionDate: currentTimestamp,
            userId: userDataParsed.email
        }
        console.log("Nueva transaccion es: ", newTransaction);
        addTransaction(newTransaction)
        router.push('/transactions/transactions')
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Titulo</Text>
            <TextInput
                style={styles.input}
                placeholder="Instrument"
                value={instrument}
                onChangeText={setInstrument}
            />
            <TextInput
                style={styles.input}
                placeholder="Cantidad"
                value={amount}
                onChangeText={setAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio por unidad"
                value={rate}
                onChangeText={setRate}
            />
            <Button title="Registrar transacion" style={styles.button} onPress={registerTransaction}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlignn: 'center'
    },
    input:{
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
    }
}
)