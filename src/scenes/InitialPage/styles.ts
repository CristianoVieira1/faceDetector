import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({theme}) => theme.colors.background};
  padding: ${({theme}) => theme.spacings.small};
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fontFamilies.bold};
  font-size: ${({theme}) => theme.fontSizes.xxlarge};
  color: ${({theme}) => theme.colors.white};
  margin-top: ${({theme}) => theme.spacings.medium};
`;

export const Description = styled.Text`
  font-family: ${({theme}) => theme.fontFamilies.medium};
  font-size: ${({theme}) => theme.fontSizes.small};
  color: ${({theme}) => theme.colors.text};
  margin-top: ${({theme}) => theme.spacings.medium};
  text-align: center;
`;

export const Image = styled.Image``;

export const Submit = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
