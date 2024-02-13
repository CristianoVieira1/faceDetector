import {widthPercentageToDP} from '@utils/DeviceResolution';
import React from 'react';
import {Progress, ProgressArea} from './styles';

interface Props {
  totalSteps?: number;
  currentStep: number;
}

export const StepProgress = ({currentStep, totalSteps = 10}: Props) => {
  const progressWidth =
    (currentStep * widthPercentageToDP('100%')) / totalSteps;

  return (
    <ProgressArea>
      <Progress width={progressWidth} />
    </ProgressArea>
  );
};
