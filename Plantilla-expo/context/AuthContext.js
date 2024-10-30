import { createContext, useEffect,useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext()


export const AuthProvider = ({children})=>{

    const [status,setStatus] = useState('checking')
    const [user,setUser] = useState(null)

    useEffect(()=>{
        const cargarEstadoAuth = async()=>{
            const isAuthenticated = await AsyncStorage.getItem('isAuthenticated')
            const userData = await AsyncStorage.getItem('userData')
            if(isAuthenticated==='true' && userData){
                setUser(JSON.parse(userData))
                setStatus('authenticated')
            }else{
                setStatus('unauthenticated')
            }
        }
        cargarEstadoAuth()
    },[user])
  
    const login = async (usuario,password) => {
      try {                         //esta es la mockapi del grupo 9
        const response = await fetch('https://6705586b031fd46a830f9e40.mockapi.io/api/v1/usuarios');
        const data = await response.json()
        
        const user = data.find( u => u.usuario === usuario && u.password === password );
  
        if(user){
            await AsyncStorage.setItem('isAuthenticated','true')
            await AsyncStorage.setItem('userData',JSON.stringify(user))
            setUser(user)
            setStatus('authenticated')
        }else{
            setStatus('unauthenticated')
        }
      } catch (error) {
        console.error(error)
        alert('Error en la autenticacion')
      }
    }
  
    const register = async (usuario,password,email) => {
      try {
        const response = await fetch('https://6705586b031fd46a830f9e40.mockapi.io/api/v1/usuarios');
        const data = await response.json()
        
        const userExist = data.some( u => u.usuario === usuario);
        const emailExist = data.some( u => u.email === email);
  
        if(userExist){
          alert('Usuario ya registrado')
        }
        else if(emailExist){
          alert('Email ya registrado')
        }
        else{

          const body = JSON.stringify({
            userName: usuario,
            email: email,
            password: password,
            avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
          })
  
          const response = await fetch('https://6705586b031fd46a830f9e40.mockapi.io/api/v1/usuarios', {
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: body
          });
  
          if(response.ok){
            alert('Registro Exitoso') //si el registro es exitoso, lo guarda en el localstorage
            await AsyncStorage.setItem('isAuthenticated','true')
            await AsyncStorage.setItem('userData',JSON.stringify(body))
            setUser(body)
            setStatus('authenticated')
          }else{
            alert('Error al registrar el usuario')
          }
        }
      } catch (error) {
        console.error(error)
        alert('Error en la autenticacion')
      }
    }
  


    return (
        <AuthContext.Provider value={{login,register,status,user,setUser}}>
        {children}
        </AuthContext.Provider>
    )
}