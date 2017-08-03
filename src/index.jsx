import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import defer from 'es6-defer';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const cleanup = (element) => {
  ReactDOM.unmountComponentAtNode(element);
  document.body.removeChild(element);
};

/* eslint react/no-multi-comp: 0 */
const showSnackbar = (dialog) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const dlg = ReactDOM.render(dialog, div); // eslint-disable-line react/no-render-return-value

  return dlg.promise.then((result) => {
    setTimeout(() => cleanup(div), 2000);
    return result;
  });
};

const snackbarOptions = {
  duration: 3000,
  theme: {},
};

export const show = (message, options = {}) => {
  const dialogOptions = Object.assign({}, snackbarOptions, options);
  class SnackbarContainer extends Component {
    constructor() {
      super();
      this.deferred = defer();
      this.promise = this.deferred.promise;
      this.handleRequestClose = this.handleRequestClose.bind(this);
      this.state = {
        open: true,
      };
    }

    handleRequestClose() {
      this.setState({
        open: false,
      });
      this.promise.resolve();
    }

    render() {
      const theme = getMuiTheme(options.theme)
      return (
        <MuiThemeProvider muiTheme={theme}>
          <Snackbar
            open={this.state.open}
            message={message}
            autoHideDuration={options.duration}
            onRequestClose={this.handleRequestClose}
          />
        </MuiThemeProvider>
      );
    }
  }
  return showSnackbar(<SnackbarContainer />);
};

export const showWithAction = (message, action, options = {}) => {
  const dialogOptions = Object.assign({}, snackbarOptions, options);
  class SnackbarContainer extends Component {
    constructor() {
      super();
      this.deferred = defer();
      this.promise = this.deferred.promise;
      this.handleRequestClose = this.handleRequestClose.bind(this);
      this.state = {
        open: true,
      };
    }

    handleRequestClose() {
      this.setState({
        open: false,
      });
      this.promise.resolve();
    }

    render() {
      const theme = getMuiTheme(options.theme)
      return (
        <MuiThemeProvider muiTheme={theme}>
          <Snackbar
            open={this.state.open}
            message={message}
            action={action}
            onActionTouchTap={() => {
              this.promise.resolve(true);
            }}
            autoHideDuration={options.duration}
            onRequestClose={this.handleRequestClose}
          />
        </MuiThemeProvider>
      );
    }
  }
  return showSnackbar(<SnackbarContainer />);
};