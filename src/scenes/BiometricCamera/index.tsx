import OrangeArrowLeft from '@assets/icons/orange-arrow-left.svg';
import OrangeArrowRight from '@assets/icons/orange-arrow-right.svg';
import MaskedView from '@react-native-masked-view/masked-view';
import {useNavigation} from '@react-navigation/native';
import {Camera, FaceDetectionResult} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {StatusBar} from 'expo-status-bar';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import * as S from './styles';

import * as ImageManipulator from 'expo-image-manipulator';
import {FaceDetection, PREVIEW_RECT, PREVIEW_SIZE} from './helpers/constants';
import {detectionReducer, detections, initialState} from './helpers/detection';

import {StackActions} from '@react-navigation/native';

import Header from '@components/Header';
import {useSession} from '../../contex/Session';
import {theme} from '../../theme';
import {Rect, contains} from './helpers/contains';

const BiometricCamera: React.FC = () => {
  const navigation = useNavigation();
  const {setSession} = useSession();
  const [state, dispatch] = useReducer(detectionReducer, initialState);

  const camRef = useRef<Camera>(null);
  const timerId = useRef<NodeJS.Timeout>();
  const [countdown, setCountdown] = useState(3);
  const [restarting, setRestarting] = useState(false);
  const [canTakePicture, setCanTakePicture] = useState(false);
  const [marginTop, setMarginTop] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);

  const totalTime = 3 * 1000;

  const startTimer = useCallback(() => {
    clearTimeout(timerId?.current);
    timerId.current = setTimeout(() => {
      if (canTakePicture) {
        takePicture();
      }
    }, totalTime);

    return () => clearTimeout(timerId?.current);
  }, [canTakePicture]);

  useEffect(() => {
    setCountdown(3);
    startTimer();
  }, [canTakePicture]);

  useEffect(() => {
    if (canTakePicture) {
      countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
    }
  }, [canTakePicture, countdown]);

  useEffect(() => {
    if (!restarting) {
      return;
    }

    setCanTakePicture(false);
    const timer = setTimeout(() => {
      setRestarting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [restarting]);

  async function cropImage(uri: string, width: number, heigth: number) {
    const newWidth = width / 4;
    const newHeight = heigth / 4;
    const dataImage = await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          resize: {
            width: newWidth,
            height: newHeight,
          },
        },
      ],
      {
        compress: 1,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      },
    );

    return await ImageManipulator.manipulateAsync(
      dataImage.uri,
      [
        {
          crop: {
            originX: 10,
            originY: 10,
            width: newWidth - 5,
            height: newHeight - 20,
          },
        },
      ],
      {
        compress: 1,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      },
    ).catch(function (error) {});
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef?.current?.takePictureAsync({
        quality: 0.7,
        base64: true,
      });

      if (Platform.OS == 'ios') {
        let uri = data?.uri;
        if (uri) {
          const dimensions = Image.getSize(
            uri,
            async (width, height) => {
              if (uri) {
                const resizedPhoto = await cropImage(uri, width, height);
                const image64 = resizedPhoto?.base64?.replace(' ', '+');

                if (image64) {
                  setSession(prevSession => ({...prevSession, image64}));
                  const popAction = StackActions.pop(1);
                  navigation.dispatch(popAction);

                  navigation.navigate('SelfiePreview');
                }
              }
            },
            error => {
              console.error(`Couldn't get the image size: ${error.message}`);
            },
          );
        }
      } else {
        const image64 = data?.base64?.replace(' ', '+');
        if (image64) {
          setSession(prevSession => ({...prevSession, image64}));
          const popAction = StackActions.pop(1);
          navigation.dispatch(popAction);

          navigation.navigate('SelfiePreview');
        }
      }
    }
  }

  async function onFacesDetected(result: FaceDetectionResult) {
    if (restarting) {
      return;
    }
    if (result.faces.length !== 1) {
      dispatch({type: 'FACE_DETECTED', payload: 'no'});
      setRestarting(true);
      return;
    }

    const face: FaceDetection = result.faces[0];
    const faceRect: Rect = {
      minX: face.bounds.origin.x,
      minY: face.bounds.origin.y,
      width: face.bounds.size.width,
      height: face.bounds.size.height,
    };

    const edgeOffset = 50;
    const faceRectSmaller: Rect = {
      width: faceRect.width - edgeOffset,
      height: faceRect.height - edgeOffset,
      minY: faceRect.minY + edgeOffset / 2,
      minX: faceRect.minX + edgeOffset / 2,
    };
    const previewContainsFace = contains({
      outside: PREVIEW_RECT,
      inside: faceRectSmaller,
    });

    if (!previewContainsFace) {
      dispatch({type: 'FACE_DETECTED', payload: 'no'});
      setRestarting(true);

      return;
    }

    if (state.faceDetected === 'no') {
      const faceMaxSize = PREVIEW_SIZE - 90;
      if (faceRect.width >= faceMaxSize && faceRect.height >= faceMaxSize) {
        dispatch({type: 'FACE_TOO_BIG', payload: 'yes'});
        return;
      }

      if (state.faceTooBig === 'yes') {
        dispatch({type: 'FACE_TOO_BIG', payload: 'no'});
      }
    }

    if (state.faceDetected === 'no') {
      dispatch({type: 'FACE_DETECTED', payload: 'yes'});
    }

    const detectionAction = state.detectionsList[state.currentDetectionIndex];

    switch (detectionAction) {
      case 'BLINK':
        const leftEyeClosed =
          face.leftEyeOpenProbability <= detections.BLINK.minProbability;
        const rightEyeClosed =
          face.rightEyeOpenProbability <= detections.BLINK.minProbability;

        if (leftEyeClosed && rightEyeClosed) {
          dispatch({type: 'NEXT_DETECTION', payload: null});
        }
        return;

      case 'TURN_HEAD_LEFT':
        if (
          face.yawAngle >= detections.TURN_HEAD_LEFT.minAngle &&
          face.yawAngle <= detections.TURN_HEAD_LEFT.maxAngle
        ) {
          dispatch({type: 'NEXT_DETECTION', payload: null});
        }
        return;

      case 'TURN_HEAD_RIGHT':
        if (
          face.yawAngle >= detections.TURN_HEAD_RIGHT.minAngle &&
          face.yawAngle <= detections.TURN_HEAD_RIGHT.maxAngle
        ) {
          dispatch({type: 'NEXT_DETECTION', payload: null});
        }
        return;
      case 'SMILE':
        if (face.smilingProbability >= detections.SMILE.minProbability) {
          dispatch({type: 'NEXT_DETECTION', payload: null});
        }
        return;

      case 'TAKE_PICTURE':
        dispatch({type: 'NEXT_DETECTION', payload: null});
        setCanTakePicture(true);
        return;
    }
  }

  function getInstructions() {
    if (state.faceDetected === 'no' && state.faceTooBig === 'no') {
      return 'Esteja em um ambiente iluminado e sem pessoas e objetos ao fundo.';
    }

    if (state.faceTooBig === 'yes') {
      return 'Você está muito perto da camera. Mova-se para longe.';
    }

    if (state.faceDetected === 'yes' && state.faceTooBig === 'no') {
      return detections[state.detectionsList[state.currentDetectionIndex]]
        .instruction;
    }
  }

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <S.WhiteBackground>
      <StatusBar style="dark" />
      <Header
        currentStep={5}
        title="Hora da selfie!"
        onPress={() => navigation.goBack()}
        textLeft={true}
      />
      <S.Title
        onLayout={({nativeEvent}) =>
          setMarginTop(nativeEvent.layout.height + nativeEvent.layout.y + 15)
        }>
        {'Movimente lentamente e mantenha o rosto na área.'}
      </S.Title>
      <MaskedView
        maskElement={<S.Container style={{marginTop: marginTop}} />}
        style={StyleSheet.absoluteFill}>
        <S.CameraView
          style={{marginTop: marginTop}}
          ref={camRef}
          type="front"
          autoFocus={Camera.Constants.AutoFocus.on}
          zoom={Platform.OS === 'ios' ? 0 : 0}
          onFacesDetected={onFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 125,
            tracking: false,
          }}>
          <AnimatedCircularProgress
            style={{
              width: PREVIEW_SIZE,
              height: PREVIEW_SIZE,
              marginLeft: PREVIEW_RECT.minX,
            }}
            size={PREVIEW_SIZE}
            width={5}
            backgroundWidth={7}
            fill={state.progressFill}
            tintColor={theme.colors.orange}
            backgroundColor="#e8e8e8"
          />
        </S.CameraView>
      </MaskedView>

      <S.InstructionsContainer style={{marginTop: marginTop + 330}}>
        {restarting ? (
          <>
            <S.WarningTitle>Reiniciando reconhecimento facial</S.WarningTitle>
            <S.WarningText>
              Mantenha o seu rosto na área de captura e siga as instruções.
            </S.WarningText>
          </>
        ) : (
          <>
            <S.Instructions>{getInstructions()}</S.Instructions>
            {canTakePicture && <S.Instructions>{countdown}</S.Instructions>}
            {state.currentDetectionIndex === 1 && <OrangeArrowLeft />}
            {state.currentDetectionIndex === 2 && <OrangeArrowRight />}
          </>
        )}
      </S.InstructionsContainer>
    </S.WhiteBackground>
  );
};

export default BiometricCamera;
