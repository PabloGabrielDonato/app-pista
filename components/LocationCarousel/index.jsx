import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import LocationCarouselItem from './LocationCarouselItem';
import { Carousel, Spacings, View } from 'react-native-ui-lib';


const LocationCarousel = ({ locations }) => (
  <Carousel
   itemSpacings={Spacings.s3} 
  >
    {
      locations.map((location) => (
        <LocationCarouselItem
          key={location.id}
          location={location}
        />
      ))}
  </Carousel>
);

export default LocationCarousel;  