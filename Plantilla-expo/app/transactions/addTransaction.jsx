import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

import { TextInput, View, StyleSheet, Button, Text} from "react-native"
import {Picker} from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { TransactionContext } from "../../context/TransactionContext";
import { DolarContext } from "../../context/DolarContext";
import { AccionesContext } from "../../context/AccionesContext";
import { BonosContext } from "../../context/BonosContext";


export default function addTransactionScreen(){

    const { addTransaction } = useContext(TransactionContext)
    const { dolares } = useContext(DolarContext)
    const { acciones } = useContext(AccionesContext)
    const { bonos } = useContext(BonosContext)
    

    const [ instrument, setInstrument ] = useState('')
    const [ amount, setAmount ] = useState(0)
    const [ rate, setRate ] = useState(0)
    const router = useRouter()


    const registerTransaction = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const userDataParsed = await JSON.parse(userData)
        const currentTimestamp = Math.floor(Date.now() / 1000);


        const newTransaction = {
            id: Math.random.toString(),
            instrument: instrument,
            amount: amount,
            rate: parseFloat(rate),
            transactionDate: currentTimestamp,
            userId: userDataParsed.email
        }


        
        addTransaction(newTransaction)
        router.push('/transactions/transactions')
    }
    const generatePicklist = ()=>{

        
        const rows = []
        const rates = getListOfRates()

        Object.entries(rates).forEach(([key, value]) => {
            rows.push(<Picker.Item label={key} value={key} />);
        });
        return rows
    }
    const setRateLogic = (rateName)=>{
        const rate = getValueFromDict(getListOfRates(), rateName);
        return rate
    }

    const getListOfRates = ()=>{
        // const dataBonos = getListOfBonos(bonos)  # Comentado hasta que tengamos una api de bonos copada
        const dataAcciones = getListOfAcciones(acciones)
        const dataUsd = getListOfUsd(dolares)
        const rates = Object.assign({}, dataUsd, dataAcciones);
        return rates
    }
    const getListOfAcciones = (accionesData)=>{
        let rates = {}
        let data = []
        function getValues(item) {
            rates["Accion " + item["symbol"]] = item["4. close"];
          }

        if (Array.isArray(accionesData)) {
            data = accionesData
        } else {
            data.push(accionesData)
        }

        
        data.forEach(getValues);


        return rates
    }
    const getListOfBonos = (bonosData)=>{
        let rates = {}
        let data = []
        function getValues(item) {
            rates["Accion " + item["symbol"]] = item["4. close"];
          }
        if (Array.isArray(bonosData)) {
            data = bonosData
        } else {
            data.push(bonosData)
        }
        data.forEach(getValues);

        return rates
    }

    const getListOfUsd = (dolaresData)=>{
        let rates = {}
        let data = []

        function getValues(item) {
            rates["Dolar " + item["nombre"]] = item["venta"];
          }
        if (Array.isArray(dolaresData)) {
            data = dolaresData
        } else {
            data.push(dolaresData)
        }

        data.forEach(getValues);
        return rates
    }

    const getValueFromDict = (dict, key)=> {
        return dict[key] !== undefined ? dict[key] : 0;
    }

    const updateValuesFromPicker = (itemValue)=> {
        setInstrument(itemValue)
        setRate(setRateLogic(itemValue))
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Instrumento</Text>
            <Picker
                selectedValue={instrument}
                onValueChange={(itemValue, itemIndex) =>
                updateValuesFromPicker(itemValue)
                }>
                <Picker.Item label="Select" value='Select' />
                {generatePicklist()}
            </Picker>
            <Text style={styles.rate}>Valor de mercado: {rate}</Text>
            <Text style={styles.title}>Cantidad</Text>
            <TextInput
                inputMode='numeric'
                style={styles.input}
                placeholder="0"
                value={amount}
                onChangeText={setAmount}
            />
            <Button title="Registrar transacion" style={styles.button} onPress={registerTransaction}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textAlignn: 'center'
    },
    rate: {
        fontSize: 15,
        textAlignn: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    input:{
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
    }

}
)