import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
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
        setErrorMsg("Permission to access location was denied");
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
        setCountry(countryData ? countryData.long_name : "Country not found");
      } catch (error) {
        console.error("Error fetching country:", error);
        setCountry("Unable to determine country");
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
          title="You are here"
          description={`Country: ${country}`}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;


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
      

