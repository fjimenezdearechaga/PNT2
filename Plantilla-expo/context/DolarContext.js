import { createContext, useEffect, useState, useContext } from "react"
import { LocationContext } from "../context/LocationContext";


export const DolarContext = createContext()

export const DolarProvider = ({children}) => {

    const { country } = useContext(LocationContext);
    const [dolares, setDolares] = useState([]);

    const fetchDolares = async () => {
        try {
            let respuesta;

            if(country == "Argentina"){
                respuesta = await fetch('https://dolarapi.com/v1/dolares'); 
            } else{
                respuesta = await fetch('https://dolarapi.com/v1/dolares/oficial'); 
            }

            
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