import { Box, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

// value={event.desc}
// onChange={evt => setEvent({ ...event, desc: evt.target.value })}
// error={}
// helperText={}

export default function LoginScreen() {
  const [email, setEmail] = useState('guilherme@gmail.com');
  const [password, setPassword] = useState('1234');

  function singIn(evt: React.FormEvent) {
    evt.preventDefault();
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

        <Box textAlign="right" marginTop="16px">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
}
