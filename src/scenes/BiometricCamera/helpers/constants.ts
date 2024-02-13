import { Dimensions } from 'react-native'

const { width: windowWidth } = Dimensions.get('window')

export const PREVIEW_SIZE = 325
export const PREVIEW_RECT = {
  minX: (windowWidth - PREVIEW_SIZE) / 2,
  minY: 0,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
}

export interface FaceDetection {
  rollAngle: number
  yawAngle: number
  smilingProbability: number
  leftEyeOpenProbability: number
  rightEyeOpenProbability: number
  bounds: {
    origin: {
      x: number
      y: number
    }
    size: {
      width: number
      height: number
    }
  }
}
