import CalendarScreen from './CalendarScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { getToday } from './DateFunctions';
import React, { useEffect, useState } from 'react';
import { getUserEndPoint, IUser } from './backend';
import LoginScreen from './LoginScreen';
import { authContext } from './authContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function App2() {
  const month = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndPoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <Router>
          <Switch>
            <Route path="/calendar/:month">
              <CalendarScreen />;
            </Route>
            <Redirect to={{ pathname: '/calendar/' + month }} />
          </Switch>
        </Router>
      </authContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

class App extends React.Component<{}, { user: IUser | null }> {
  setUser: (user: IUser) => void;
  onSignOut: () => void;

  constructor(props: {}) {
    super(props);
    this.state = {
      user: null,
    };

    this.onSignOut = () => {
      this.setState({ user: null });
    };
    this.setUser = (user: IUser) => {
      this.setState({ user });
    };
  }

  render() {
    const month = getToday().substring(0, 7);

    const { user } = this.state;

    if (user) {
      return (
        <authContext.Provider value={{ user, onSignOut: this.onSignOut }}>
          <Router>
            <Switch>
              <Route path="/calendar/:month">
                <CalendarScreen />;
              </Route>
              <Redirect to={{ pathname: '/calendar/' + month }} />
            </Switch>
          </Router>
        </authContext.Provider>
      );
    } else {
      return <LoginScreen onSignIn={this.setUser} />;
    }
  }

  componentDidMount() {
    getUserEndPoint().then(this.setUser, this.onSignOut);
  }
}

export default App;
