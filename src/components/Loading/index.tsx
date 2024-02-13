import React from 'react';
import {ActivityIndicator} from 'react-native';
import {theme} from '../../theme';
import * as S from './styles';

const Loading = () => {
  return (
    <S.Container>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </S.Container>
  );
};

export default Loading;
