import styled from 'styled-components/native';

export const ProgressArea = styled.View`
  height: 4px;
  width: ${({theme}) => theme.device.width}px;
  background-color: ${({theme}) => theme.colors.lightPrimary};
`;

interface ProgressSchema {
  width: number;
}

export const Progress = styled.View<ProgressSchema>`
  height: 4px;
  width: ${({width}) => width}px;
  background-color: ${({theme}) => theme.colors.white};
`;
