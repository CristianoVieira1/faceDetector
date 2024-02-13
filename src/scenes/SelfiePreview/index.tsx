import {StatusBar} from 'expo-status-bar';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import {useSession} from '../../contex/Session';
import {Content, PicturePreview, Title, WhiteBackground} from './styles';

export const SelfiePreview = () => {
  const navigation = useNavigation();
  const {session} = useSession();

  const goBackToInitialAccess = () => {
    navigation.goBack();
  };
  return (
    <WhiteBackground>
      <StatusBar style="dark" />
      <Header
        currentStep={5}
        title="imagem"
        onPress={goBackToInitialAccess}
        textLeft={true}
      />

      <Content>
        <Title>Sua imagem</Title>

        <PicturePreview
          resizeMode="contain"
          source={{uri: `data:image/png;base64,${session.image64}`} || ''}
        />

        <Button
          text="Voltar"
          onPress={() => navigation.navigate('InitialPage')}
          loading={false}
        />
      </Content>
    </WhiteBackground>
  );
};
