import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../store/user.store';
import { apiEndpoint } from '../configs/routes.config';
import { Ionicons } from '@expo/vector-icons';

const MisReservas = () => {
  const [activeTab, setActiveTab] = useState('Activas'); // Pestaña activa
  const [bookings, setBookings] = useState([]); // Lista de reservas
  const [loading, setLoading] = useState(true); // Estado de carga
  const { token } = useUserStore(); // Obtener el token del usuario
  const navigation = useNavigation();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiEndpoint.bookings.get}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        setBookings(data || []);
      } else {
        console.error('Error en la respuesta del servidor:', data.message);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchBookings();
  }, []); // Se ejecuta una vez al montar el componente

  const goToHome = () => {
    navigation.navigate('Home');
  };

  const handleTabPress = (tabName) => {
    setActiveTab(tabName); // Cambia la pestaña activa
  };

  // Obtener la fecha actual sin la hora
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filtrar reservas según la pestaña activa
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    bookingDate.setHours(0, 0, 0, 0);

    if (activeTab === 'Activas') {
      return bookingDate >= today;
    }
    if (activeTab === 'Finalizadas') {
      return bookingDate < today;
    }
    return false;
  });

  return (
    <View style={styles.container}>
      {/* Barra de pestañas */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => handleTabPress('Activas')}>
          <Text style={[styles.tab, activeTab === 'Activas' && styles.activeTab]}>
            Activas ({bookings.filter((booking) => new Date(booking.date) >= today).length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Finalizadas')}>
          <Text style={[styles.tab, activeTab === 'Finalizadas' && styles.activeTab]}>
            Finalizadas ({bookings.filter((booking) => new Date(booking.date) < today).length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de reservas */}
      {loading ? (
        <Text style={styles.loadingText}>Cargando reservas...</Text>
      ) : filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          keyExtractor={(booking) => booking.id.toString()}
          renderItem={({ item: booking }) => (
            <View style={styles.reservationCard}>
              <Text style={styles.reservationTitle}>Reserva #{booking.id}</Text>
              <View style={styles.reservationDetails}>
                <Text style={styles.detailText}>
                  <Text style={styles.label}>Fecha:</Text> {booking.date}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={styles.label}>Hora:</Text> {booking.time_slots[0].start_time}
                </Text>
                <Text style={styles.detailText}>
                <Text style={styles.label}>Estado de pago:</Text>{' '}
                <Text
                  style={{
                    color:
                      booking.payment.status === 'approved'
                        ? 'green'
                        : booking.payment.status === 'rejected'
                        ? 'red'
                        : booking.payment.status === 'pending_approval'
                        ? 'orange'
                        : 'black',
                  }}
                >
                  {booking.payment.status === 'approved'
                    ? 'Aprobado'
                    : booking.payment.status === 'rejected'
                    ? 'Rechazado'
                    : booking.payment.status === 'pending_approval'
                    ? 'Pendiente'
                    : booking.payment.status}
                </Text>
              </Text>
              </View>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => console.log(`Ver detalles de reserva ${booking.id}`)}
              >
                <Text style={styles.actionButtonText}>Ver Detalles</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={styles.noReservations}>
          <Text style={styles.message}>No tienes reservas en esta categoría.</Text>
          <TouchableOpacity style={styles.circularButton} onPress={goToHome}>
            <Ionicons name="add" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 80,
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
    color: '#3BA0C6',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    color: '#777',
    marginVertical: 20,
  },
  reservationCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    minWidth: '80%', // Ajusta este valor para hacerlo más ancho
    alignSelf: 'center', // Asegura que la tarjeta esté centrada
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reservationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reservationDetails: {
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  noReservations: {
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#4A44A4',
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
  circularButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3BA0C6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default MisReservas;