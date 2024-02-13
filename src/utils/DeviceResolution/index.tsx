import { Dimensions, PixelRatio } from 'react-native';

/**
 * É perceptível em algumas resoluções, como a do Pixel 3 ou 3a, que o uso da lib
 * react-native-responsive-fontsize para atribuições de espaçamento não possui o efeito
 * esperado.
 * 
 * Em um blog antigo é descrito uma forma de "corrigir" esse problema usando
 * a seguinte abaixo.
 * 
 * https://blog.rocketseat.com.br/react-native-dicas-ux/
 */

export const widthPercentageToDP = (widthPercent: string) => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel(
    (screenWidth * parseFloat(widthPercent)) / 100,
  );
};

export const heightPercentageToDP = (heightPercent: string) => {
  const screenHeight = Dimensions.get('window').height;
  return PixelRatio.roundToNearestPixel(
    (screenHeight * parseFloat(heightPercent)) / 100,
  );
};