import React, { useContext, useEffect, useState } from 'react'
import { View,StyleSheet,TextInput, Button,Text } from 'react-native'
import { useRouter } from 'expo-router'
import { SaldoContext } from '../../context/SaldoContext'
import { AuthContext } from '../../context/AuthContext'

export default function sacarDinero () {

const{removeSaldo} = useContext(SaldoContext)
const{user} = useContext(AuthContext)
const[saldoRemovido,setSaldoRemovido] = useState('')
const router = useRouter()


const finalizarExtraccion = ()=>{
    if(saldoRemovido){
        removeSaldo(parseFloat(saldoRemovido))
    }
    router.push('/(tabs)/saldo')        

}

  return (
    <View style={styles.container}>
        <View style={styles.titulo}>
            <Text>Sacar Dinero</Text>
        </View>
        <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder='Ingrese cantidad'
        value={saldoRemovido}
        onChangeText={setSaldoRemovido}/>
         <View style={styles.uploadContainer}>
            <Button title="Finalizar extraccion" style={styles.button} onPress={finalizarExtraccion}/>
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