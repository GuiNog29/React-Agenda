import CalendarScreen from './CalendarScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { getToday } from './DateFunctions';
import { useEffect, useState } from 'react';
import { getUserEndPoint, IUser } from './backend';
import LoginScreen from './LoginScreen';

function App() {
  const month = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndPoint().then(setUser, singOut);
  }, []);

  function singOut() {
    setUser(null);
  }

  if (user) {
    return (
      <Router>
        <Switch>
          <Route path="/calendar/:month">
            <CalendarScreen user={user} onSingOut={singOut} />;
          </Route>
          <Redirect to={{ pathname: '/calendar/' + month }} />
        </Switch>
      </Router>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
