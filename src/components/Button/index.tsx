import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import Loading from '../Loading';
import * as S from './styles';

export interface ButtonModel extends TouchableOpacityProps {
  text: string;
  loading?: boolean;
}

const Button = ({text, loading, ...rest}: ButtonModel) => {
  return (
    <S.Container {...rest}>
      <S.GradientContainer colors={['#14c5d8', '#11daae']}>
        {loading ? <Loading /> : <S.Text>{text}</S.Text>}
      </S.GradientContainer>
    </S.Container>
  );
};

export default Button;
