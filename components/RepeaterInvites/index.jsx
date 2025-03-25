import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, InputField } from '@/components/ui/input';
import { Button } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import { Text } from '../ui/text';
import { OutlinedButton } from '../ui/button';

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
        { name, lastName: last_name, dni },
      ]);
      alert('Invitado agregado');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Invitado</Text>
      <View style={styles.inputContainer}>
        <Input variant="rounded">
          <InputField
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Nombre"
          />
        </Input>
      </View>
      <View style={styles.inputContainer}>
        <Input variant="rounded">
          <InputField
            value={last_name}
            onChangeText={(text) => setLastName(text)}
            placeholder="Apellido"
          />
        </Input>
      </View>
      <View style={styles.inputContainer}>
        <Input variant="rounded">
          <InputField
            value={dni}
            onChangeText={(text) => setDni(text)}
            placeholder="DNI"
          />
        </Input>
      </View>
      <OutlinedButton onPress={handleOnSubmit} style={styles.button}>
        <View style={styles.buttonContent}>
          <AntDesign name="plus" size={24} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Agregar Invitado</Text>
        </View>
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    borderColor: '#007AFF',
    marginTop: 20,
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RepeaterInvites;
