import React, { useContext, useEffect, useState } from 'react'
import { Button,Image, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function cambiarImagen () {

    const{cambiarImagen,user} = useContext(AuthContext)
    const[image,setImage] = useState('')
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




    const subirImagenGaleria = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if(!result.canceled){
            setImage(result.assets[0].uri)
          }
    }

    const subirImagenCamara = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if(!result.canceled){
            setImage(result.assets[0].uri)
          }
    }

    const subirImagen = async ()=>{
        if(image){
            await cambiarImagen(image,usuario)
        }else{
            router.push('/(tabs)/perfil')
        }
    }
  return (
    <View style={styles.container}>
        <View style={styles.titulo}>
            <Text>Cambiar Imagen de Perfil</Text>
        </View>
        <Image style={styles.image} source={{uri:image?image:usuario.avatar}}/>
        <View style={styles.uploadContainer}>
            <Button title="Subir Imagen Galeria" style={styles.button} onPress={subirImagenGaleria}/>
            <Button title="Subir Imagen Camara" style={styles.button} onPress={subirImagenCamara}/>
        </View>
        <View>
        <Button title="Terminar" style={styles.button} onPress={subirImagen}/>
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
    image:{
        width: '60%',
        height: 200,
        marginVertical: 20
    },
    button:{
        marginTop: 1,
        height:10,
        width:10,
        marginHorizontal:20
    },
    uploadContainer:{
        flexDirection: 'column',
        gap: 20, 
        marginBottom: 60
    }
}
)
