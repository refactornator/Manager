import { Text } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export default () => (
  <Container>
    <Text>Loading...</Text>
  </Container>
);

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;
