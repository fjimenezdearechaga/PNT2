import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import AsyncStorage from '@react-native-async-storage/async-storage';



export const DolarContext = createContext()

export const DolarProvider = ({children}) => {

   // const { user, setUser, status } = useContext(AuthContext)

    const [dolares, setDolares] = useState([])
   // const [cartItems, setCartItems] = useState( user?.cart  || [])

    const fetchDolares = async () => {
        try {
            //const respuesta = await fetch('https://66fc865cc3a184a84d173c40.mockapi.io/api/v1/productos')
            const respuesta = await fetch('https://dolarapi.com/v1/dolares') 
            const data = await respuesta.json()
            setDolares(data)
        } catch (error) {
            console.error('Error en el fetch: ', error)
        }
    }

    useEffect(() => {
        fetchDolares()
    }, [])


    return (
        <DolarContext.Provider value={{ dolares, fetchDolares }}>
            {children}
        </DolarContext.Provider>
    )
}