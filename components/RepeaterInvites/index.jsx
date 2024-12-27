import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';

const RepeaterInvites = ({ setInvites }) => {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [dni, setDni] = useState('');

  const handleOnSubmit = () => {
    if (name && last_name && dni) {
      setName('');
      setLastName('');
      setDni('');
      setInvites((prevInvites) => [
        ...prevInvites,
        { name, last_name, dni },
      ]);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Input variant="rounded" size="md">
          <InputField
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Nombre"
            placeholderTextColor="#FFFFFF"
            style={styles.inputText}
          />
        </Input>
      </View>
      <View style={styles.inputContainer}>
        <Input variant="rounded" size="md">
          <InputField
            value={last_name}
            onChangeText={(text) => setLastName(text)}
            placeholder="Apellido"
            placeholderTextColor="#FFF"
            style={styles.inputText}
          />
        </Input>
      </View>
      <View style={styles.inputContainer}>
        <Input variant="rounded" size="md">
          <InputField
            value={dni}
            onChangeText={(text) => setDni(text)}
            placeholder="DNI"
            placeholderTextColor="#FFFFFF"
            style={styles.inputText}
          />
        </Input>
      </View>
      <Button onPress={handleOnSubmit}>
        <ButtonText style={styles.boton} >Agregar Participante</ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10, // Espacio entre inputs
  },
  inputText: {
    color: '#FFF', // Texto blanco
  },

});

export default RepeaterInvites;
