# mui-simple-snackbars
Turning Material UI Snackbars simple to use.

## Installation
> npm install --save mui-simple-snackbars

or

> yarn add mui-simple-snackbars

## Usage

Simply:

```jsx
import show from 'mui-simple-snackbars';

export default () => (
  <button
    onClick={() => {
      show('Hey Hey!');
    }}
  />
);
```

Result:

![Imgur](http://i.imgur.com/BKPGfZu.png)

## Inspiration

mui-simple-snackbars was inspired by [mui-simple-dialogs](https://github.com/andreyluiz/mui-simple-dialogs). The API is similar, and the way snackbars work is also similar, with the difference that snackbars pops out from the screen, while dialogs wait for user action.

Material UI Snackbars are awesome. They are simple to use too. Check this example:

```jsx
import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

type Props = {
  open: boolean,
  onAction: Function,
  onClose: Function,
};

export default class UserDeletedSnackbar extends Component {
  props: Props

  render() {
    const {
      open,
      onAction,
      onClose,
    } = this.props;
    return (
      <Snackbar
        open={open}
        message="User deleted."
        action="undo"
        onActionTouchTap={onAction}
        autoHideDuration={3000}
        onRequestClose={onClose}
      />
    );
  }
}

```

To use this snackbar, we could implement this code in the parent component:

```jsx
import React, { Component } from 'react';
import { UserDeletedSnackbar } from './components';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = { snackbarOpen: false };
  }

  openSnackbar = () => {
    this.setState({ snackbarOpen: true });
  }

  closeSnackbar = () => {
    this.setState({ snackbarOpen: false });
  }

  deleteUser = (id) => {
    this.props.deleteUser(id)
      .then(() => {
        this.openSnackbar();             // Here the magic begins
      });
  }

  undoLastUserDelete = () => {
    this.props.undoLastUserDelete()
      .then(() => {
        // do stuff
      });
  }

  render() {
    return (
      <div>
        <ul>
        {this.props.users.map(user => (
          <li>
            {user.name} - 
              <a href="#" onClick={() => { this.deleteUser(user.id) }}>Delete</a>
          </li>
        ))}
        </ul>
        
        <DeleteUserDialog
          open={this.state.snackbarOpen}
          onClose={this.closeSnackbar}
          onAction={this.undoUserDelete}
        />
      </div>
    );
  }
}
```

We have some problems with this approach:

1. We rely on parent's state to define if the snackbar is visible or not (`snackbarOpen` state property);
3. The snackbar is mounted with the parent component and stays in the DOM even when we are not using it;
4. We create a lot of functions to handle a simple snackbar.

When the application begins to scale, it turns out that Material UI Snackbars become a problem. mui-simple-snackbars ease this task by providing an API to spawn snackbars where and when you need them. Once used, they are wiped from your DOM.

Here is the same example above implemented with mui-simple-snackbars API:

```jsx
import React, { Component } from 'react';
import snackbar from 'mui-simple-snackbars';

export default class User extends Component {
  deleteUser = (id) => {
    this.props.deleteUser(id)
      .then(() => {
        return this.openSnackbar('User deleted.', 'undo'); // Here the magic begins
      })
      .then((actionClicked) => {
        if (actionClicked) {                               // True for action clicked.
          this.props.undoLastUserDelete()
            .then(() => {
              // do stuff
            });
        }
      });
  }

  render() {
    return (
      <div>
        <ul>
        {this.props.users.map(user => (
          <li>
            {user.name} - 
              <a href="#" onClick={() => { this.deleteUser(user.id) }}>Delete</a>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}
```

Simpler, huh?

## API

### `show(message: string, [options]): Promise`

Returns a Promise that is resolved once the snackbar hides.

#### Options

**Option**|**Description**|**Type**|**Default**
-----|-----|-----|-----
`duration`|For how many milisseconds the snackbar should be visible.|`Number`|3000
`theme`|The Material UI custom theme.|`Object`|null

### `showWithAction(message: string, action: string, [options]): Promise`

Returns a Promise that is resolved once the snackbar hides or when the user clicks the action. The resolve parameter is a `boolean`. `true` for Action clicked.

#### Options

**Option**|**Description**|**Type**|**Default**
-----|-----|-----|-----
`duration`|For how many milisseconds the snackbar should be visible.|`Number`|3000
`theme`|The Material UI custom theme.|`Object`|null

## Contributing

Felt inspired or found a bug? File a bug or create a Pull Request. I'll be happy to receive any insight or code suggestion.