import ImageBiometria from '@assets/images/face-id.png';
import Button from '@components/Button';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import * as S from './styles';
const InitialPage = () => {
  const navigation = useNavigation();

  return (
    <S.Container>
      <S.Image source={ImageBiometria} />
      <S.Title>Reconhecimento facial</S.Title>
      <S.Description>
        Para continuar, precisamos que você faça o reconhecimento facial.
      </S.Description>

      <S.Submit>
        <Button
          text="Iniciar reconhecimento facial"
          onPress={() => navigation.navigate('BiometricCamera')}
          loading={false}
        />
      </S.Submit>
    </S.Container>
  );
};

export default InitialPage;
