import { useContext } from "react";
import { View, StyleSheet, Button, Text} from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router";
import { TransactionContext } from "../../../context/TransactionContext";



export default function removeTransactionScreen(){

    const router = useRouter()
    const { id } = useLocalSearchParams();
    
    const { removeTransaction } = useContext(TransactionContext)

    const deleteTransaction = async () => {
        removeTransaction(id)
        router.push('/transactions/transactions')
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seguro desea eliminar la transaccion?</Text>

            <Button title="Eliminar Transaccion" style={styles.button} onPress={deleteTransaction}/>
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