import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import defer from './defer';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const cleanup = (element) => {
  ReactDOM.unmountComponentAtNode(element);
  document.body.removeChild(element);
};

/* eslint react/no-multi-comp: 0 */
const showSnackbar = (snackbar, duration) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const dlg = ReactDOM.render(snackbar, div); // eslint-disable-line react/no-render-return-value

  return dlg.promise.then((result) => {
    setTimeout(() => cleanup(div), duration + 1000);
    return result;
  });
};

const defaultOptions = {
  duration: 3000,
  theme: {},
};

const simpleSnackbarOptions = Object.assign({}, defaultOptions, {
  centered: true,
});

export const show = (message, options = {}) => {
  const snackbarOptions = Object.assign({}, simpleSnackbarOptions, options);
  class SnackbarContainer extends Component {
    constructor() {
      super();
      this.deferred = defer();
      this.promise = this.deferred.promise;
      this.state = {
        open: false,
      };
    }

    componentWillMount() {
      setTimeout(() => {
        this.setState({ open: true });
        // setTimeout(() => {
          // this.setState({ open: false });
        // }, snackbarOptions.duration);
      }, 200);
    }

    handleRequestClose() {
      this.setState({
        open: false,
      });
      this.deferred.resolve();
    }

    render() {
      const theme = getMuiTheme(snackbarOptions.theme);
      return (
        <MuiThemeProvider muiTheme={theme}>
          <Snackbar
            bodyStyle={{ textAlign: snackbarOptions.centered ? 'center' : 'left' }}
            open={this.state.open}
            message={message}
            autoHideDuration={snackbarOptions.duration}
            onRequestClose={this.handleRequestClose.bind(this)}
          />
        </MuiThemeProvider>
      );
    }
  }
  return showSnackbar(<SnackbarContainer />, snackbarOptions.duration);
};

const withActionOptions = Object.assign({}, defaultOptions, { primaryButton: true });

export const showWithAction = (message, action, options = {}) => {
  const snackbarOptions = Object.assign({}, defaultOptions, options);
  class SnackbarContainer extends Component {
    constructor() {
      super();
      this.deferred = defer();
      this.promise = this.deferred.promise;
      this.state = {
        open: false,
      };
    }

    componentWillMount() {
      setTimeout(() => {
        this.setState({ open: true });
        // setTimeout(() => {
        //   this.setState({ open: false });
        // }, snackbarOptions.duration);
      }, 200);
    }

    handleRequestClose() {
      this.setState({
        open: false,
      });
      this.deferred.resolve();
    }

    render() {
      const theme = getMuiTheme(snackbarOptions.theme);
      return (
        <MuiThemeProvider muiTheme={theme}>
          <Snackbar
            open={this.state.open}
            message={message}
            action={action}
            onActionTouchTap={() => {
              this.setState({ open: false });
              this.deferred.resolve(true);
            }}
            autoHideDuration={snackbarOptions.duration}
            onRequestClose={this.handleRequestClose.bind(this)}
          />
        </MuiThemeProvider>
      );
    }
  }
  return showSnackbar(<SnackbarContainer />, snackbarOptions.duration);
};
