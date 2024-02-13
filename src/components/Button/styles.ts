import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const GradientContainer = styled(LinearGradient)`
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 55px;
  margin-top: ${({theme}) => theme.spacings.xlarge};
  margin-bottom: ${({theme}) => theme.spacings.xlarge};
  width: 80%;
`;

export const Text = styled.Text`
  font-family: ${({theme}) => theme.fontFamilies.bold};
  font-size: ${({theme}) => theme.fontSizes.large};
  color: white;
  margin-left: ${({theme}) => theme.spacings.xxsmall};
`;
