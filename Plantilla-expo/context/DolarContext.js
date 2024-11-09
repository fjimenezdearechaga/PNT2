import { createContext, useEffect, useState } from "react"

export const DolarContext = createContext()

export const DolarProvider = ({children}) => {

    const [dolares, setDolares] = useState([])

    const fetchDolares = async () => {
        try {
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