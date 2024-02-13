import {Platform} from 'react-native';

interface Actions {
  FACE_DETECTED: 'yes' | 'no';
  FACE_TOO_BIG: 'yes' | 'no';
  SAVE_FACE: string;
  NEXT_DETECTION: null;
}

interface Action<T extends keyof Actions> {
  type: T;
  payload: Actions[T];
}

type PossibleActions = {
  [K in keyof Actions]: Action<K>;
}[keyof Actions];

export const detections = {
  BLINK: {
    instruction: 'Pisque seus olhos',
    minProbability: 0.4,
  },
  TURN_HEAD_LEFT: {
    instruction: 'Gire, suavemente, sua cabeça para a esquerda',
    maxAngle: Platform.OS === 'ios' ? -30 : 340,
    minAngle: Platform.OS === 'ios' ? -60 : 310,
  },
  TURN_HEAD_RIGHT: {
    instruction: 'Gire, suavemente, sua cabeça para a direita',
    minAngle: 30,
    maxAngle: 60,
  },
  SMILE: {
    instruction: 'Dê um sorriso para nós',
    minProbability: 0.7,
  },
  TAKE_PICTURE: {
    instruction: 'É hora da selfie!',
  },
};

type DetectionActions = keyof typeof detections;

const detectionsList: DetectionActions[] = [
  'BLINK',
  'TURN_HEAD_LEFT',
  'TURN_HEAD_RIGHT',
  'SMILE',
  'TAKE_PICTURE',
];

export const initialState = {
  faceDetected: 'no' as 'yes' | 'no',
  faceTooBig: 'no' as 'yes' | 'no',
  detectionsList,
  currentDetectionIndex: 0,
  progressFill: 0,
  processComplete: false,
  face: '',
};

export const detectionReducer = (
  state: typeof initialState,
  action: PossibleActions,
): typeof initialState => {
  switch (action.type) {
    case 'FACE_DETECTED':
      if (action.payload === 'yes') {
        return {
          ...state,
          faceDetected: action.payload,
          progressFill: 100 / (state.detectionsList.length + 1),
        };
      } else {
        // Reset
        return initialState;
      }
    case 'FACE_TOO_BIG':
      return {...state, faceTooBig: action.payload};

    case 'NEXT_DETECTION':
      // next detection index
      const nextDetectionIndex = state.currentDetectionIndex + 1;

      // skip 0 index
      const progressMultiplier = nextDetectionIndex + 1;

      const newProgressFill =
        (100 / (state.detectionsList.length + 1)) * progressMultiplier;

      if (nextDetectionIndex === state.detectionsList.length) {
        // success
        return {
          ...state,
          processComplete: true,
          progressFill: newProgressFill,
        };
      }
      // next
      return {
        ...state,
        currentDetectionIndex: nextDetectionIndex,
        progressFill: newProgressFill,
      };
    default:
      throw new Error('Unexpected action type.');
  }
};
