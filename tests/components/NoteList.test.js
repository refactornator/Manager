import React from 'react';

import { shallow } from 'enzyme';

import NoteList from '../../components/NoteList';
import NoteListItem from '../../components/NoteListItem';

const notes = [{ key: 1, text: 'This is my note' }];
const props = {
  notes,
  editHandler: () => {},
  deleteHandler: () => {}
};

let render;
beforeEach(() => {
  render = shallow(<NoteList {...props} />);
});

it('renders a list of notes', () => {
  expect(render).toMatchSnapshot();
});

it('renders each note', () => {
  const item = notes[0];

  const received = JSON.stringify(render.instance().renderItem({ item }));
  const expected = JSON.stringify(
    <NoteListItem note={item} editHandler={() => {}} deleteHandler={() => {}} />
  );

  expect(received).toBe(expected);
});
