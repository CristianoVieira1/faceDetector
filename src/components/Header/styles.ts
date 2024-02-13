import Constants from 'expo-constants';
import styled, {css} from 'styled-components/native';
import {heightPercentageToDP} from '../../utils/DeviceResolution';
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

import {Props} from '.';

const wrapperModifiers = {
  hideOnIcon: () => css`
    left: ${heightPercentageToDP('-18%')}px;
    position: absolute;
  `,
};

export const Content = styled.View`
  z-index: 10;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Container = styled.SafeAreaView`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${STATUS_BAR_HEIGHT}px 24px 0;
  background-color: ${({theme}) => theme.colors.background};
`;

export const CenteredLogoArea = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text<Props>`
  ${({theme, textLeft}) => css`
    font-weight: 800;
    font-size: 24px;
    line-height: 32px;
    font-family: ${theme.fontFamilies.bold};
    color: ${theme.colors.orange};
    margin: 10px;
    ${textLeft && wrapperModifiers.hideOnIcon}
  `}
`;
