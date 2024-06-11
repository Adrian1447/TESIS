import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import DescriptionScreen1 from '@/app/(tabs)/descriptionScreen1';
import DescriptionScreen2 from '@/app/(tabs)/descriptionScreen2';
import DescriptionScreen3 from './(tabs)/descriptionScreen3';

const { width, height } = Dimensions.get('window');

function Onboarding() {
  return (
    <Swiper
    loop={false}
    dot={<View style={styles.dot} />}
    activeDot={<View style={styles.activeDot} />}
    paginationStyle={styles.pagination}>
        <View style={styles.slide}>
            <DescriptionScreen1 />
        </View>
        <View style={styles.slide}>
            <DescriptionScreen2 />
        </View>
        <View style={styles.slide}>
            <DescriptionScreen3 />
        </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    width,
    height,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  pagination: {
    bottom: 20,
  },
});

export default Onboarding;
