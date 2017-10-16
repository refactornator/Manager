import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';

import NoteListItem from '../../components/NoteListItem';

const note = {
  key: 'abc',
  text: 'This is my note content.',
  createdAt: new Date('05/22/1987')
};

it('renders a note list item', () => {
  const render = shallow(
    <NoteListItem note={note} editHandler={() => {}} deleteHandler={() => {}} />
  );
  expect(render).toMatchSnapshot();
});

describe('when the delete button is pressed', () => {
  it('calls the delete handler passing the note key as a parameter', () => {
    const deleteHandlerSpy = sinon.spy();
    const render = shallow(
      <NoteListItem
        note={note}
        editHandler={() => {}}
        deleteHandler={deleteHandlerSpy}
      />
    );

    render
      .find('TouchableOpacity')
      .at(0)
      .simulate('press');

    expect(deleteHandlerSpy.calledWith('abc')).toBe(true);
  });
});

describe('when the text is pressed', () => {
  it('calls the edit handler passing the note key as a parameter', () => {
    const editHandlerSpy = sinon.spy();
    const render = shallow(
      <NoteListItem
        note={note}
        editHandler={editHandlerSpy}
        deleteHandler={() => {}}
      />
    );

    render
      .find('TouchableOpacity')
      .at(1)
      .simulate('press');

    expect(editHandlerSpy.calledWith('abc')).toBe(true);
  });
});
