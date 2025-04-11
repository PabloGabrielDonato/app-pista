module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],  // Configuración básica para Expo
    plugins: [
      'react-native-reanimated/plugin',  // Plugin para React Native Reanimated
      // 'nativewind/babel'  // Descomentar si necesitas NativeWind, pero revisa la configuración
    ],
  };
};
