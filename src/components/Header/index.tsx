import {AntDesign} from '@expo/vector-icons';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';

import {SvgProps} from 'react-native-svg';
import {theme} from '../../theme';
import {StepProgress} from '../StepProgress';
import * as S from './styles';

export type Props = {
  onPress?: () => void;
  onAction?: () => void;
  currentStep: number;
  contentColor?: string;
  title?: string;
  icon?: FC<SvgProps>;
  iconRight?: FC<SvgProps>;
  textLeft?: boolean;
};

const Header = ({
  title,
  onPress,
  onAction,
  icon: Icon,
  iconRight: IconRight,
  currentStep,
  contentColor = theme.colors.orange,
  textLeft = true,
}: Props) => {
  return (
    <S.Content>
      <S.Container>
        <TouchableOpacity onPress={onPress}>
          <AntDesign name={'arrowleft'} size={24} color={contentColor} />
        </TouchableOpacity>

        <S.CenteredLogoArea>
          {Icon && <Icon />}
          <S.Title textLeft={textLeft} currentStep={currentStep}>
            {title}
          </S.Title>
        </S.CenteredLogoArea>

        <TouchableOpacity onPress={onAction}>
          {IconRight && <IconRight />}
        </TouchableOpacity>
      </S.Container>

      <StepProgress currentStep={currentStep} />
    </S.Content>
  );
};

export default Header;
