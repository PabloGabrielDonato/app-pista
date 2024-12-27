import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import LocationCarouselItem from './LocationCarouselItem';

const { width } = Dimensions.get('window'); // Obtiene el ancho de la pantalla

const LocationCarousel = ({ locations }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.imageCarousel}
    contentContainerStyle={styles.carouselContent} // Asegura que los elementos estén bien alineados
  >
    {locations.map((location) => (
      <LocationCarouselItem 
        key={location.id} 
        location={location} 
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  imageCarousel: {
    marginVertical: 15,
  },
  carouselContent: {
    paddingHorizontal: width * 0.05, // Ajusta el padding horizontal como 5% del ancho de la pantalla
  },
});

export default LocationCarousel;  