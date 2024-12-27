import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'expo-image';
import useLocationStore from '../../store/location.store';

const { width, height } = Dimensions.get('window'); // Obtiene las dimensiones de la pantalla

const LocationCarouselItem = ({ location, setSelectedLocation }) => {
  const {setCurrentLocation, currentLocation }  = useLocationStore();

  return (
  <TouchableOpacity
    key={location.id}
    style={{
        ...styles.imageContainer,
        borderColor: currentLocation?.id === location.id ? '#3BA0C6' : '#fff',
      }}
    onPress={() => {setCurrentLocation(location)}}
  >
    <Image 
      source={ location?.image ?? require('./../../assets/images/skating_rink.jpg') } 
      style={styles.image} 
      contentFit='cover'
    />
    {/* Información de la locación */}
    <View style={styles.infoContainer}>
      <View>
        <Text style={styles.location}>
          {location.name || 'Pista de entrenamiento profesional'}
        </Text>
        <Text style={styles.pabellon}>
          {location.pavilion || 'Pabellón Europa'}
        </Text>
        <Text style={styles.description}>
          {location.description || 'Sin descripción disponible'}
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={16} color="#A0A0A0" />
        <Text style={styles.place}>
          {location.address || 'Ubicación no especificada'}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 15,
    borderRadius: 10,
    borderWidth: 3,
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: width * 0.9, // 90% del ancho de la pantalla
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 10,
  },
  infoContainer: {
    padding: 10,
  },
  image: {
    width: '100%', // Ocupa todo el ancho del contenedor
    height: height * 0.25, // 25% de la altura de la pantalla
  },
  location: {
    fontSize: width > 360 ? 18 : 16, // Aumenta el tamaño en pantallas más grandes
    fontWeight: 'bold',
    color: '#333',
  },
  pabellon: {
    fontSize: width > 360 ? 14 : 12,
    color: '#777',
  },
  description: {
    fontSize: width > 360 ? 14 : 12,
    color: '#777',
    marginTop: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  place: {
    fontSize: width > 360 ? 16 : 14,
    marginLeft: 5,
  },
});

export default LocationCarouselItem;