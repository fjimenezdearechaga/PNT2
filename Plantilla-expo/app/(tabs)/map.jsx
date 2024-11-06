import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyD8z8UA02zF_TovyeVrffTNuFQIvhHRjkQ";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso para acceder a ubicacion fue denegado");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      const { latitude, longitude } = userLocation.coords;
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
        );
        const addressComponents = response.data.results[0].address_components;
        const countryData = addressComponents.find(comp => comp.types.includes("country"));
        setCountry(countryData ? countryData.long_name : "Pais no encontrado");
      } catch (error) {
        console.error("Error fetching country:", error);
        setCountry("No fue posible determinar el pais");
      }
    })();
  }, []);

  if (errorMsg) return <Text>{errorMsg}</Text>;
  if (!location) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        //provider={PROVIDER_GOOGLE} // Use Google Maps
        style={{ flex: 1 }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Estas aca"
          description={`Pais: ${country}`}
        />
      </MapView>
      <View style={styles.container}>
            <Text style={styles.name}>Pais: {country}</Text>
           
            <TouchableOpacity
                    style={styles.button}                    
            >
                <Text style={styles.buttonText}>Valores {country}</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    userContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#c1bdbd',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image:{
        width: 'auto',
        height: '30vw',
        borderRadius: 15,
        
        marginTop:20,
    },
    infoContainer: {
        flex: 1
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    titulo:{
        fontSize: 25,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 20,
        fontWeight: '800',
    },
    detalle:{
        fontSize: 16,
        color: '#666'
    },
    button:{
        backgroundColor: '#000', // Fondo negro
        paddingVertical: 10, // Espaciado vertical
        paddingHorizontal: 20, // Espaciado horizontal
        borderRadius: 5, // Bordes redondeados
        alignItems: 'center', // Centra el contenido
        marginTop: 20, // Margen superior
        width: 'auto',
        height:'50px',
    },
    buttonText: {
        color: 'white', // Color del texto
        
    },
    
})


// import { useContext, useEffect, useState } from "react";
// import { Text, View,StyleSheet,Image,Button, TextInput } from "react-native";
// import { AuthContext } from "../../context/AuthContext";
// import { useRouter } from "expo-router";
// import * as Location from "expo-location";
// import { StatusBar } from "react-native-web";
// import React from 'react';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// export default function TabMap(){

//     const { location, setlocation } = useState();
//     const { adress, setAdress } = useState();

//     useEffect(() => {
//         const getPermissions = async () => {
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted'){
//                 console.log("Permitir acceso a localizacion");
//                 return;
//             }

//             console.log("Probando")

//             let currentLocation = await Location.getCurrentPositionAsync({});
//             setlocation(currentLocation);
//             console.log("Location");
//             console.log(currentLocation);
//         };
//         getPermissions();
//     })

//     const geocode = async() => {
//         const geocodedLocation = await Location.geocodeAsync(adress);
//         console.log("Geocoded Adress:");
//         console.log(geocodedLocation);
//     }

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 placeHolder="Adress"
//                 value={adress}
//                 onChangeText={setAdress}/>
//             <Button title="Geocode Adress" onPress={geocode}></Button>
//             <MapView style={styles.map} />
//             <StatusBar style="auto" />      
//         </View>
//     ) 
// }

//     const styles = StyleSheet.create({
//         container: {
//           flex: 1,
//         },
//         map: {
//           width: '100%',
//           height: '100%',
//         },
//       });
      

