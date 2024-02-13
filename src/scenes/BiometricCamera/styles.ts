import {widthPercentageToDP} from '@utils/DeviceResolution';
import {Camera} from 'expo-camera';
import {PixelRatio} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {PREVIEW_RECT, PREVIEW_SIZE} from './helpers/constants';

export const WhiteBackground = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Container = styled.View`
  border-radius: ${PREVIEW_SIZE / 2}px;
  height: ${PREVIEW_SIZE}px;
  width: ${PREVIEW_SIZE}px;
  align-self: center;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  margin-top: ${PixelRatio.get() <= 2 ? 10 : 32}px;
  margin-bottom: ${PixelRatio.get() <= 2 ? 10 : 24}px;
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.fontFamilies.bold};
  padding-horizontal: 24px;
`;

export const CameraView = styled(Camera)`
  width: ${widthPercentageToDP('100%')}px;
  height: 500px;
`;

export const CircularProgress = styled(AnimatedCircularProgress)`
  width: ${PREVIEW_SIZE}px;
  height: ${PREVIEW_SIZE}px;
  margin-left: ${PREVIEW_RECT.minX}px;
`;

export const InstructionsContainer = styled.View`
  padding-horizontal: 24px;
  position: absolute;
  width: 100%;
  align-items: center;
`;
export const Instructions = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.fontFamilies.bold};
  text-align: center;
`;

export const WarningTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.danger};
  font-family: ${({theme}) => theme.fontFamilies.bold};
  text-align: center;
`;

export const WarningText = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.danger};
  font-family: ${({theme}) => theme.fontFamilies.regular};
  text-align: center;
`;
