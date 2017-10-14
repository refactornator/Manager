import React, { Component } from 'react';

import NotesScreen from './NotesScreen';

export default class ReportScreen extends Component {
  render() {
    const report = this.props.navigation.state.params;

    return (
      <NotesScreen
        {...this.props}
        report={report}
        keyboardVerticalOffset={65}
      />
    );
  }
}
