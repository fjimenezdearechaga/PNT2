import { createContext, useContext, useEffect, useState } from "react"





export const TransactionContext = createContext()

export const TransactionProvider = ({children}) => {

   // const { user, setUser, status } = useContext(AuthContext)

    const [transactions, setTransactionHistory] = useState([])
   // const [cartItems, setCartItems] = useState( user?.cart  || [])

    const fetchTransactions = async () => {
        try {
            //const respuesta = await fetch('https://66fc865cc3a184a84d173c40.mockapi.io/api/v1/productos')
            const respuesta = await fetch('https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/transactions') 
            const data = await respuesta.json()
            setTransactionHistory(data)
        } catch (error) {
            console.error('Error en el fetch: ', error)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])


    return (
        <TransactionContext.Provider value={{ transactions, fetchTransactions }}>
            {children}
        </TransactionContext.Provider>
    )
}