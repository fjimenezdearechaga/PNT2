import React, {createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyD8z8UA02zF_TovyeVrffTNuFQIvhHRjkQ";

export const LocationContext  = createContext()

export const LocationProvider = ({children}) => {
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso para acceder a ubicacion fue denegado");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

    const { latitude, longitude } =  userLocation.coords;

    //URUGUAY
    // const coords = {
    //   latitude: -33.115404,
    //   longitude: -56.472096
    // };
    // const { latitude, longitude } = coords;

    setCoords({ latitude, longitude });

      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
        );
        const addressComponents = response.data.results[0].address_components;
        const countryData = addressComponents.find(comp => comp.types.includes("country"));


        setCountry(countryData ? countryData.long_name : "Pais no encontrado");
      //  setCountry(countryData.long_name == "Argentina" ? "si" : "Pais no encontrado");
        
      } catch (error) {
        console.error("Error fetching country:", error);
        setCountry("No fue posible determinar el pais");
      }
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ location, country, errorMsg, coords }}>
      {children}
    </LocationContext.Provider>
  );
}