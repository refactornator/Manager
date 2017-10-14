import React from 'react';
import styled from 'styled-components/native';

import NotesScreen from './NotesScreen';

export default props => {
  return (
    <Container>
      <NotesScreen {...props} report={null} keyboardVerticalOffset={0} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 30px;
  background-color: #f4f4f4;
`;
