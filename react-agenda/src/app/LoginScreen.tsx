import { Box, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IUser, singInEndPoint } from './backend';

const useStyles = makeStyles({
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px 0',
    textAlign: 'center',
  },
});

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export default function LoginScreen(props: ILoginScreenProps) {
  const [email, setEmail] = useState('guilherme@gmail.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');
  const classes = useStyles();

  function singIn(evt: React.FormEvent) {
    evt.preventDefault();
    singInEndPoint(email, password).then(props.onSignIn, e =>
      setError('Email not found or password incorrect')
    );
  }

  return (
    <Container maxWidth="sm">
      <h1>React Agenda</h1>

      <p>Type e-mail and password to enter in system.</p>
      <p>
        To test, use email <kbd>guilherme@gmail.com</kbd> and password{' '}
        <kbd>1234</kbd>.
      </p>

      <form onSubmit={singIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={evt => setEmail(evt.target.value)}
        />

        <TextField
          margin="normal"
          label="Password"
          fullWidth
          type="password"
          variant="outlined"
          value={password}
          onChange={evt => setPassword(evt.target.value)}
        />

        {error && <div className={classes.error}>{error}</div>}

        <Box textAlign="right" marginTop="16px">
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
}
