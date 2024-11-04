import { createContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"





export const TransactionContext = createContext()

export const TransactionProvider = ({children}) => {
    const [transactions, setTransactionHistory] = useState([])

    const fetchTransactions = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const userEmail = JSON.parse(JSON.parse(userData)).email
            const uri = 'https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/transactions?userId=' + userEmail
            const respuesta = await fetch(uri) 
            const data = await respuesta.json()
            const dataSorted = data.sort((a, b) => b.transactionDate - a.transactionDate);
            setTransactionHistory(dataSorted)
        } catch (error) {
            console.error('Error en el fetch: ', error)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])


    const addTransaction = async (newTransaction) => {

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
                const dataSorted = ( prevProducts) => [...prevProducts, transactionCreated].sort((a, b) => b.transactionDate - a.transactionDate);

                setTransactionHistory(dataSorted)
            } else{
                alert('Error en la carga de la transaccion')
            }
        } catch (error) {
            console.error('Error en la carga de la transaccion', error)
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
                const userEmail = JSON.parse(JSON.parse(userData)).email
                const uri = 'https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/transactions?userId=' + userEmail
                const respuesta = await fetch(uri) 
                const data = await respuesta.json()
                const dataSorted = data.sort((a, b) => b.transactionDate - a.transactionDate);
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