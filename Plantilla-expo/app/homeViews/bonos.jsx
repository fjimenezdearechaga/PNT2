import { useContext } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { BonosContext, BonosProvider } from "../../context/BonosContext";

function BonosList() {
    const { bonos } = useContext(BonosContext);

    if (!bonos) return <Text>No hay datos...</Text>;

    const renderItem = ({ item }) => (
        <View style={styles.dataContainer}>
            <Text style={styles.title}>Símbolo: {item.symbol}</Text>
            <Text style={styles.label}>Fecha: {item.fecha}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>Precio mas Alto: {item.rendimiento}</Text>
                <Text style={styles.name}>Apertura: {item["1. open"]}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>Precio mas Bajo: {item["3. low"]}</Text>
                <Text style={styles.name}>Cierre: {item["4. close"]}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={bonos}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
}

export default function Bonos() {
    return (
        <BonosProvider>
            <BonosList />
        </BonosProvider>
    );
}


// import { useContext } from "react";
// import { FlatList, StyleSheet, View, Text } from "react-native";
// import { BonosContext, BonosProvider } from "../../context/BonosContext";

// function BonosList() {

//     const { bonos } = useContext(BonosContext);

//     if (!bonos) return <Text>No hay datos...</Text>;

//     const renderItem = ({ item }) => (
        
//         <BonosContext>
//             <Bonos>
//         <View style={styles.dataContainer}>
//             <Text style={styles.title}>Símbolo: {item.symbol}</Text>
//             <Text style={styles.label}>Fecha: {item.fecha}</Text>
//             <View style={styles.infoContainer}>
//                 <Text style={styles.name}>Precio mas Alto: {item["2. high"]}</Text>
//                 <Text style={styles.name}>Apertura: {item["1. open"]}</Text>
//             </View>
//             <View style={styles.infoContainer}>
//                 <Text style={styles.name}>Precio mas Bajo: {item["3. low"]}</Text>
//                 <Text style={styles.name}>Cierre: {item["4. close"]}</Text>
//             </View>
//         </View>
//         </Bonos>
//         </BonosContext>
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={bonos}
//                 renderItem={renderItem}
//                 contentContainerStyle={styles.flatListContainer}
//             />
//         </View>
//     );
// }

// export default function Bonos(){
//     return (
//         <BonosProvider>
//             <BonosList></BonosList>
//         </BonosProvider>
//     )
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginBottom: 40,
        justifyContent: 'center'
    },
    button:{

    },
    dataContainer: {
        marginEnd: 40,
        marginStart: 40,
        flex: 1,
        padding: 10,
        marginBottom: 40,
        justifyContent: 'center',
        backgroundColor: 'black',
        borderColor: 'green',
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: '#8BC6EC',
        backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #d1e7e7 100%)'

    },
    infoContainer: {
        flex: 1,
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 40,
        marginRight: 40,
    },
    dateRefreshed: {
        marginTop: 5,
        marginStart: 40,
        fontStyle: 'italic',
        fontSize: 12
    },
    name: {

    },
    flatListContainer: {
        justifyContent: 'center'
    },
    touchable:{
        flex: 1,
        margin: 10,
        maxWidth: '45%'
    },
    venta:{
        fontWeight:800
    }
})