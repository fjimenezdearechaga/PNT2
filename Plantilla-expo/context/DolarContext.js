import { createContext, useEffect, useState, useContext } from "react"
import { LocationContext } from "../context/LocationContext";
import { AuthContext } from "../context/AuthContext";


export const DolarContext = createContext()

export const DolarProvider = ({children}) => {
    const [dolares, setDolares] = useState([]);
    const { country } = useContext(LocationContext);
    const { login } = useContext(AuthContext);

    const fetchDolares = async () => {
        try {
            let respuesta;

            if(country == "Argentina"){
                respuesta = await fetch('https://dolarapi.com/v1/dolares'); 
            } else{
                respuesta = await fetch('https://dolarapi.com/v1/dolares/oficial'); 
            }
            
            
            const data = await respuesta.json()
            // console.log('dolares:');
            //console.log(data);
            
            setDolares(data)
        } catch (error) {
            console.error('Error en el fetch: ', error)
        }
    }

    useEffect(() => {
        fetchDolares()
    }, [login.success, country])


    return (
        <DolarContext.Provider value={{ dolares, fetchDolares }}>
            {children}
        </DolarContext.Provider>
    )
}