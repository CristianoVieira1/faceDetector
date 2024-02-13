import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InitialPage from '@scenes/InitialPage';

import BiometricCamera from '@scenes/BiometricCamera';
import {SelfiePreview} from '@scenes/SelfiePreview';
import React from 'react';

const Stack = createNativeStackNavigator();

export const PublicRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="InitialPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="InitialPage" component={InitialPage} />
      <Stack.Screen name="BiometricCamera" component={BiometricCamera} />
      <Stack.Screen name="SelfiePreview" component={SelfiePreview} />
    </Stack.Navigator>
  );
};
