import React, { useState } from 'react';
import { View } from 'react-native';
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
        { name, lastName: last_name, dni },
      ]);
          
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <View>
      <View>
        <Input variant="rounded" size="md">
          <InputField
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Nombre"
          />
        </Input>
      </View>
      <View>
        <Input variant="rounded" size="md">
          <InputField
            value={last_name}
            onChangeText={(text) => setLastName(text)}
            placeholder="Apellido"
          />
        </Input>
      </View>
      <View>
        <Input variant="rounded" size="md">
          <InputField
            value={dni}
            onChangeText={(text) => setDni(text)}
            placeholder="DNI"
          />
        </Input>
      </View>
      <Button onPress={handleOnSubmit}>
        <ButtonText>Agregar Participante</ButtonText>
      </Button>
    </View>
  );
};

export default RepeaterInvites;
