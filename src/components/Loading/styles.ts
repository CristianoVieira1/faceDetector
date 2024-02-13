import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
`;
