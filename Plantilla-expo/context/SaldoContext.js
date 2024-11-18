import { createContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"

export const SaldoContext = createContext()

export const SaldoProvider = ({children}) => {
    const [saldo, setSaldo] = useState()
    const router = useRouter()

    const fetchSaldo = async () => {
        try{
            const userData = await AsyncStorage.getItem('userData');
            const dataParsed = await JSON.parse(userData)
            const email = dataParsed.email
            if(email){ 

                const uri = 'https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo?userId=' + email
                const respuesta = await fetch(uri)  
                
                const data = await respuesta.json()

                if (!(typeof data === 'string' || data instanceof String || respuesta.status === 404)) {
                    const saldoActual = data[0].saldo
                    setSaldo(saldoActual) 
                }else{ 
                    await generarSaldo(email)
                    await fetchSaldo()
                }
            } else {
                console.error("Usuario es undefined")
            }

            }catch(error){
                console.error("error en el fetch de saldo: ",error)
            }
    }

    useEffect(()=>{
        fetchSaldo()
    },[saldo])
   


    const generarSaldo = async (userEmail) => {

        try {
            const body = JSON.stringify({
                "userId": userEmail,
                "saldo": 0
              })
            await fetch('https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: body
            })
        } catch (error) {
            console.error('Error en la carga de saldo', error)
        }
    }
    const addSaldo = async (saldoAgregado) => {
        const userData = await AsyncStorage.getItem('userData');
        const userEmail = await JSON.parse(userData).email
        const saldoFinal = saldo+saldoAgregado
        if (userEmail && saldoAgregado) {
            try {
                const body = JSON.stringify({
                    "userId": userEmail,
                    "saldo": saldoFinal,
                    })
                const respuesta = await fetch('https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo?userId=' + userEmail)
                const data = await respuesta.json()
                const idSaldoUsuario = data[0].id;
                const uri = `https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo/${idSaldoUsuario}`
                const response = await fetch(uri, {
                    method: 'PUT',
                    headers:{
                        'Content-Type':'application/json'
                        },
                    body:body
                })
                if (response.ok) {
                    alert('Operacion exitosa')
                    setSaldo(saldoFinal)
                }
                else{
                    console.error('Error en la operacion')

                }

            } catch (error) {
                console.error('Error en la operacion', error)
            }
            
        } else {
            console.error('Error en la operacion')
        }


    }

    const removeSaldo = async (saldoRemovido) => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                const userEmail = await JSON.parse(userData).email
                const respuestaGetSaldo = await fetch('https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo?userId=' + userEmail)
                const data = await respuestaGetSaldo.json()
                const saldoUsuario = data[0].saldo;
                const idSaldoUsuario = data[0].id
                const saldoFinal = saldoUsuario-saldoRemovido
                if(saldoFinal>=0){
                    const body = JSON.stringify({
                        "saldo":saldoFinal,
                      })
                    const uri = `https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo/${idSaldoUsuario}`
                    const response = await fetch(uri, {
                        method: 'PUT',
                        headers:{
                          'Content-Type':'application/json'
                         },
                        body:body
                        })
                    if (response.ok) {
                        alert('Operacion exitosa')
                        setSaldo(saldoFinal)

                    } else {
                         alert('Error en la reduccion operacion')
                }
                }else{
                    alert('Saldo insuficiente. El saldo actual es: ' + saldo)
                }
                  
            } catch (error) {
                console.error('Error en la reduccion operacion', error)
            }
        }

    return (
        <SaldoContext.Provider value={{ saldo, addSaldo, removeSaldo,fetchSaldo}}>
            {children}
        </SaldoContext.Provider>
    )
}

