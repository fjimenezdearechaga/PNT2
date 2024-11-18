import { createContext, useEffect, useState } from "react";

export const BonosContext = createContext();

export const BonosProvider = ({ children }) => {
    const [bonos, setBonos] = useState([]);

    //Alpha Vantage
    //API Key: K8T3UDBRP2E42HIC
    const url = 'https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=3month&apikey=K8T3UDBRP2E42HIC';

    // const fetchBonos = async () => {
    //     try {
    //         const response = await fetch(url);
    //         const data = await response.json();

    //         // Verificamos si hay datos de yields
    //         if (data && data.data) {
    //             const bonosData = data.data.map(item => ({
    //                 fecha: item.date,
    //                 rendimiento: item.value,  // El valor del rendimiento
    //                 plazo: '10 años'  // Para identificar el plazo de estos bonos
    //             }));

    //             setBonos(bonosData);
    //         } else {
    //             console.error("Datos de bonos no disponibles.");
    //             setBonos([]);  // Restablecemos a un array vacío si no hay datos
    //         }
    //     } catch (error) {
    //         console.error("Error al obtener los datos de bonos:", error);
    //     }
    // };

    const fetchBonos = async () => {
        try {
            const response = await fetch(url);
            //console.log(response);
            // Verifica el tipo de contenido de la respuesta para confirmar que es JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("La respuesta no es JSON");
            }
    
            const data = await response.json();
    
            // Verificamos si hay datos de yields en la estructura esperada
            if (data && data.data) {
                const bonosData = data.data.map(item => ({
                    fecha: item.date,
                    rendimiento: item.value,  // El valor del rendimiento
                    plazo: '1 años'  // Para identificar el plazo de estos bonos
                }));
    
                setBonos(bonosData);
            } else {
                console.error("Datos de bonos no disponibles.");
                setBonos([]);  // Restablecemos a un array vacío si no hay datos
            }
        } catch (error) {
            console.error("Error al obtener los datos de bonos:", error);
            setBonos([]);  // Restablecemos a un array vacío en caso de error
        }
    };
    

    useEffect(() => {
        fetchBonos();
    }, []);

    return (
        <BonosContext.Provider value={{ bonos, fetchBonos }}>
            {children}
        </BonosContext.Provider>
    );
};
