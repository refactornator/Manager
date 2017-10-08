import React from 'react';

import renderer from 'react-test-renderer';

import NoteListItem from '../../components/NoteListItem';

const note = {
  key: 'abc',
  text: 'This is my note content.',
  createdAt: new Date('05/22/1987')
};

it('renders a note list item', () => {
  const rendered = renderer
    .create(<NoteListItem note={note} deleteHandler={() => {}} />)
    .toJSON();
  expect(rendered).toMatchSnapshot();
});

describe('when the close button is clicked', () => {
  it('calls the delete handler passing the note key as a parameter', () => {});
});
