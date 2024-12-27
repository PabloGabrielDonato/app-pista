import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MisReservas = () => {
  const [activeTab, setActiveTab] = useState('Activas'); // Estado para la pestaña activa
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
  };

  const handleTabPress = (tabName) => {
    setActiveTab(tabName); // Cambia la pestaña activa al presionar
  };

  return (
    <View style={styles.container}>
      {/* Barra de filtros */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => handleTabPress('Activas')}>
          <Text style={[styles.tab, activeTab === 'Activas' && styles.activeTab]}>
            Activas (0)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Finalizadas')}>
          <Text style={[styles.tab, activeTab === 'Finalizadas' && styles.activeTab]}>
            Finalizadas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Canceladas')}>
          <Text style={[styles.tab, activeTab === 'Canceladas' && styles.activeTab]}>
            Canceladas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Mensaje sin reservas */}
      <View style={styles.noReservations}>
        <Text style={styles.message}>No tienes reservas.</Text>
        <TouchableOpacity style={styles.addButton} onPress={goToHome}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    paddingTop: 40,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 20,
  },
  tab: {
    marginHorizontal: 20,
    fontSize: 16,
    color: '#007AFF',
  },
  activeTab: {
    color: '#3BA0C6', // Cambia el color si es la pestaña activa
    fontWeight: 'bold', // Opcional: negrita para resaltar más
  },
  noReservations: {
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#4A4A4A',
    marginBottom: 20,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3BA0C6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    fontSize: 36,
    color: '#3BA0C6',
  },
});

export default MisReservas;