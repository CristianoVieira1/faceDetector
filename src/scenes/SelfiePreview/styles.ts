import styled from 'styled-components/native';

export const WhiteBackground = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  bounces: false,
})`
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 24px;
  line-height: 32px;
  margin: 32px 0 24px;
  color: ${({theme}) => theme.colors.primary};
`;

export const PicturePreview = styled.Image`
  align-self: center;
  border-radius: 6px;
  margin-bottom: 19px;
  width: ${({theme}) => theme.device.width}px;

  height: ${({theme}) => {
    const horizotalMargin: number = 48;
    return `${theme.device.width + horizotalMargin}px`;
  }};
`;
