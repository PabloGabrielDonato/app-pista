import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, InputField } from '@/components/ui/input';
import { Button, Colors } from 'react-native-ui-lib';
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
      alert('invitado agregado')
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <View>
      <View>
        <Input variant="rounded">
          <InputField
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Nombre"
          />
        </Input>
      </View>
      <View>
        <Input variant="rounded">
          <InputField
            value={last_name}
            onChangeText={(text) => setLastName(text)}
            placeholder="Apellido"
          />
        </Input>
      </View>
      <View>
        <Input variant="rounded">
          <InputField
            value={dni}
            onChangeText={(text) => setDni(text)}
            placeholder="DNI"
          />
        </Input>
      </View>
      <OutlinedButton
        onPress={handleOnSubmit}
        style={{
          borderColor: 'red',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <AntDesign name="plus" size={24} color="black" style={{ marginRight: 8 }} />
          <Text>Agregar Invitado</Text>
        </View>
      </OutlinedButton>
    </View>
  );
};

export default RepeaterInvites;