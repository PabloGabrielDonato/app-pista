import {Colors, Typography, Spacings, ThemeManager} from 'react-native-ui-lib';

// Configuración de colores globales
Colors.loadColors({
  primary: '#007BFF',
  secondary: '#6C757D',
  danger: '#FF3B30',
  background: '#F5F9FF',
  card: '#FFFFFF',
  textPrimary: '#212529', // Texto principal
  textSecondary: '#6C757D', // Texto secundario
  accent: '#17A2B8',
});

// Configuración de tipografía global
Typography.loadTypographies({
  heading: {fontSize: 24, fontWeight: 'bold', color: Colors.textPrimary},
  subheading: {fontSize: 18, color: Colors.textSecondary},
  body: {fontSize: 14, color: Colors.textPrimary},
  link: {fontSize: 14, color: Colors.accent, textDecorationLine: 'underline'},
});

// Configuración de espaciados globales
Spacings.loadSpacings({
  page: 16,
  card: 12,
  button: 8,
  field: 10,
});

// Configuración del theme para componentes específicos
ThemeManager.setComponentTheme('Button', (props) => ({
  backgroundColor: props.outline ? Colors.secondary : Colors.primary,
  borderRadius: 10,
  paddingHorizontal: Spacings.button,
  color: Colors.card,
}));

// Configuración para TextField
ThemeManager.setComponentTheme('TextField', () => ({
  containerStyle: {
    borderColor: Colors.secondary,
    paddingHorizontal: 15, // Incrementa el padding horizontal
  },
  color: Colors.textPrimary, // Letra más oscura
  placeholderTextColor: Colors.textSecondary,
  text70: true, // Aplica un estilo de texto predefinido (más pequeño y centrado)
}));
