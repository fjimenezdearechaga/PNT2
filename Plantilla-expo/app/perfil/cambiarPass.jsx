import React, { useContext, useEffect, useState } from 'react'
import { View,StyleSheet,TextInput, Button,Text } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'expo-router'

export default function cambiarPass () {

const{cambiarPassword,user} = useContext(AuthContext)
const[password,setPassword] = useState('')
const[usuario,setUsuario] = useState({})
const router = useRouter()


useEffect(()=>{
        async function fetchData (){
            const response = await fetch('https://6705586b031fd46a830f9e40.mockapi.io/api/v1/usuarios');
            const data = await response.json()
            
            const usuario = data.find( u => u.userName === user.userName);
            setUsuario(usuario)
        }
        fetchData();
    },[])


const cambiarPass = ()=>{
    if(password){
    cambiarPassword(password,usuario)
    }else{
        router.push('/(tabs)/perfil')
    }
}

  return (
    <View style={styles.container}>
        <View style={styles.titulo}>
            <Text>Cambiar Password de Perfil</Text>
        </View>
        <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder='Ingrese nueva password'
        value={password}
        onChangeText={setPassword}/>
         <View style={styles.uploadContainer}>
            <Button title="Cambiar Password" style={styles.button} onPress={cambiarPass}/>
        </View>
    </View>

    </View>
    
  )
}


const styles = StyleSheet.create({
    container:{flex:1,justifyContent:'center',
        padding:20
    },
    titulo:{
        fontSize: 25,
        textAlign: 'left',
        marginTop: 50,
        marginBottom: 20,
        fontWeight: '800',
    },
    input:{
        height:40,
        borderColor:'grey',
        borderWidth:1,
        marginBottom:20,
        paddingHorizontal:10
    },
    button:{
        marginTop: 20,
        height:50,
        width:20
    },
    uploadContainer:{
        flexDirection: 'row',
        gap: 10, 
        marginBottom: 30
    }
}
)
