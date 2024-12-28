import React from 'react';
import { Button as ReactUIButton } from 'react-native-ui-lib';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const Button = (props) => (
    <ReactUIButton {...props}>
        {typeof props.children === 'string' ? (
            <Text>{props.children}</Text>
        ) : (
            props.children
        )}
    </ReactUIButton>
);

export const PrimaryButton = (props) => (

  <TouchableOpacity
        style={{...styles.reserveButton, ...props.style }}
        onPress={ props.onPress ?? null }
      >
       {typeof props.children === 'string' ? (
            <Text style={styles.reserveButtonText}>{props.children}</Text>
        ) : (
            props.children
        )}
      </TouchableOpacity>
);

export const OutlinedButton = (props) => (
    <TouchableOpacity
        style={{...styles.OutlinedButton, ...props.style }}
        onPress={ props.onPress ?? null }
      >
       {typeof props.children === 'string' ? (
            <Text style={styles.OutlinedButtonText}>{props.children}</Text>
        ) : (
            props.children
        )}
      </TouchableOpacity>
);

const styles = StyleSheet.create({
  reserveButton: {
    backgroundColor: '#3BA0C6',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    margin: 8,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  OutlinedButton: {
    backgroundColor: '#fff',
    borderColor: '#3BA0C6',
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginVertical: 8,
  },
  OutlinedButtonText: {
    color: '#3BA0C6',
    fontSize: 18,
    fontWeight: 'bold',
  },
});