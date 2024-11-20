import { createContext, useEffect, useState, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SaldoContext } from "./SaldoContext"
import { useRouter } from "expo-router"


export const TransactionContext = createContext()


export const TransactionProvider = ({children}) => {
    const [transactions, setTransactionHistory] = useState([])
    const { saldo } = useContext(SaldoContext)
    const { removeSaldo } = useContext(SaldoContext)
    const { addSaldo } = useContext(SaldoContext)
    const router = useRouter()
    

    const fetchTransactions = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const userEmail = await JSON.parse(userData).email
            const uri = 'https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/transactions?userId=' + userEmail
            const respuesta = await fetch(uri) 
            const data = await respuesta.json()
            let dataSorted = {}
            if (!(typeof data === 'string' || data instanceof String)) {
                dataSorted = data.sort((a, b) => b.transactionDate - a.transactionDate);
            }

            setTransactionHistory(dataSorted)
        } catch (error) {
            console.error('Error en el fetch: ', error)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])


    const addTransaction = async (newTransaction) => {
        const transactionAmount = newTransaction.amount * newTransaction.rate
        let sumSaldo = false
        if (transactionAmount < 0) {
            sumSaldo = true;
        }
        const puedeHacerTransaccion = ((transactionAmount < saldo && !sumSaldo) || (transactionAmount < 0 && sumSaldo))
        if (puedeHacerTransaccion) {
            try {
                const response = await fetch('https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
    
                    },
                    body: JSON.stringify(newTransaction)
                })
                if (response.ok) {
                    const transactionCreated = await response.json();
                    let dataSorted = []
                    if (transactions.length > 0) {
                        dataSorted = (transactions) => [...transactions, transactionCreated].sort((a, b) => b.transactionDate - a.transactionDate);
                    } else {
                        dataSorted = [transactionCreated];
    
                    }
                    if (sumSaldo) {
                        addSaldo(transactionAmount * -1)
                        router.push('/transactions/transactions')
                    } else {
                        removeSaldo(transactionAmount)
                        router.push('/transactions/transactions')
                    }
    
                    
                    setTransactionHistory(dataSorted)
                } else{
                    alert('Error en la carga de la transaccion')
                }
            } catch (error) {
                console.error('Error en la carga de la transaccion', error)
            }
        } else {
            alert("Saldo insuficiente")
        }

    }

    const removeTransaction = async (newTransaction) => {

        try {
            const uri = 'https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/transactions/'+ newTransaction
            const response = await fetch(uri, {
                method: 'DELETE',
            })
            if (response.ok) {
                const userData = await AsyncStorage.getItem('userData');
                const userEmail = await JSON.parse(userData).email
                const uri = 'https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/transactions?userId=' + userEmail
                const respuesta = await fetch(uri)
                const data = await respuesta.json()
                let dataSorted = []
                if (!(typeof data === 'string' || data instanceof String)) {
                    dataSorted = data.sort((a, b) => b.transactionDate - a.transactionDate);
                }
                setTransactionHistory(dataSorted)
            } else {
                alert('Error en la eliminacion de la transaccion')
            }
        } catch (error) {
            console.error('Error en la eliminacion de la transaccion', error)
        }
    }


    return (
        <TransactionContext.Provider value={{ transactions, fetchTransactions, addTransaction, removeTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}