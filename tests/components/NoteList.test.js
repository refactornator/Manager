import React from 'react';
import renderer from 'react-test-renderer';

import NoteList from '../../components/NoteList';

it('renders a list of notes', () => {
  const rendered = renderer.create(<NoteList />).toJSON();
  expect(rendered).toMatchSnapshot();
});
