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
            if(dataParsed){
                const email = dataParsed.email
                const uri = 'https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo?userId=' + email
                const respuesta = await fetch(uri) 
                const data = await respuesta.json()
                if (!(typeof data === 'string' || data instanceof String || data[0]===undefined)) {
                    const saldoActual = data[0].saldo
                    setSaldo(saldoActual)
                }else{
                    await generarSaldo(email)
                    const respuesta = await fetch(uri) 
                    const data = await respuesta.json()
                    const saldoActual = data[0].saldo
                    setSaldo(saldoActual)
                    
                }
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
                userId: userEmail,
                saldo: 0
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
    const addSaldo = async (saldoAgregado,user) => {
        const saldoFinal = saldo+saldoAgregado
            try {
                const body = JSON.stringify({
                    userId:user.email,
                    saldo:saldoFinal,
                  })
                const respuesta = await fetch('https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo')
                const data = await respuesta.json()
                const saldoUsuario = data.find( u => u.userId===user.email );
                const uri = `https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo/${saldoUsuario.id}`
                const response = await fetch(uri, {
                    method: 'PUT',
                    headers:{
                        'Content-Type':'application/json'
                      },
                    body:body
                })
                
                if (response.ok) {
                    alert('agregacion de saldo exitosa')
                    setSaldo(saldoFinal)
                    router.push('/saldo')
                }
                else{
                    console.error('Error en la agregacion de saldo')

                }

            } catch (error) {
                console.error('Error en la agregacion de saldo', error)
            }

    }

    const removeSaldo = async (saldoRemovido,user) => {
            try {
                const respuesta = await fetch('https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo')
                const data = await respuesta.json()
                const saldoUsuario = data.find( u => u.userId===user.email );
                const saldoFinal = saldoUsuario.saldo-saldoRemovido
        
                if(saldoFinal>=0){
                    const body = JSON.stringify({
                        saldo:saldoFinal,
                        userId:user.email
                      })
                    const uri = `https://6726ad8c302d03037e6e174e.mockapi.io/api/v1/saldo/${saldoUsuario.id}`
                    const response = await fetch(uri, {
                        method: 'PUT',
                        headers:{
                          'Content-Type':'application/json'
                         },
                        body:body
                        })
                    if (response.ok) {
                        alert('reduccion de saldo exitosa')
                        setSaldo(saldoFinal)
                        router.push('/saldo')
                    } else {
                         alert('Error en la reduccion de saldo')
                }
                }else{
                    alert('Saldo insuficiente. El saldo actual es: ' + saldo)
                }
                  
            } catch (error) {
                console.error('Error en la reduccion de saldo', error)
            }
        }

    return (
        <SaldoContext.Provider value={{ saldo, addSaldo, removeSaldo,fetchSaldo}}>
            {children}
        </SaldoContext.Provider>
    )
}