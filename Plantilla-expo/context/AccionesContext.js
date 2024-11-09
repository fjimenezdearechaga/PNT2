import { createContext, useEffect, useState } from "react"

export const AccionesContext = createContext()

export const AccionesProvider = ({children}) => {

    const [acciones, setAcciones] = useState([])

    const urls = [
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MBG.DEX&outputsize=full&apikey=demo',
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSCO.LON&outputsize=full&apikey=demo',
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GPV.TRV&outputsize=full&apikey=demo',
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo',
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=RELIANCE.BSE&outputsize=full&apikey=demo'
    ];


    const fetchAcciones = async () => {
        try {
            const respuesta = await Promise.all(urls.map(url => fetch(url)));
            const data =await Promise.all(respuesta.map(res => res.json()));

            // Obtenemos todas las fechas del Time Series y tomamos la última
            const accionesData = data.map(stockData => {
                const timeSeries = stockData["Time Series (Daily)"];
                const fechas = Object.keys(timeSeries);
                const ultimaFecha = fechas.sort((a, b) => new Date(b) - new Date(a))[0];
                const valoresUltimaFecha = timeSeries[ultimaFecha];

                return {
                    symbol: stockData["Meta Data"]["2. Symbol"],
                    fecha: ultimaFecha,
                    ...valoresUltimaFecha
                };
            });

            setAcciones(accionesData)
        } catch (error) {
            console.error('Error en el fetch: ', error)
        }
    }

    useEffect(() => {
        fetchAcciones()
    }, [])


    return (
        <AccionesContext.Provider value={{ acciones, fetchAcciones }}>
            {children}
        </AccionesContext.Provider>
    )
}