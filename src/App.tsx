import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';

import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import {UserSessionProvider} from './contex/Session';
import Routes, {navigationRef} from './routes';
import {theme} from './theme';

function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (fontsLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar style="dark" translucent backgroundColor="transparent" />
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    );
  }
  return null;
}

export default () => (
  <UserSessionProvider>
    <App />
  </UserSessionProvider>
);
