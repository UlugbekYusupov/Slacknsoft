import React, { useRef, useState, useContext } from 'react';

import {
  CircularProgress, Avatar, CssBaseline, TextField,
  Grid, Typography, makeStyles, Container
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '../UI/Button/Button'
import Modal from '../UI/Modal/Modal'

import AuthContext from '../../store/auth-context'
import { Link, useHistory } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        React Meals
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(30),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
    border: '2px solid rgb(180, 133, 72)',
    boxShadow: '0 2px 8px rgba(16, 24, 32, 0.25)',
    padding: '20px',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'rgb(180, 133, 72)',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },

  submit: {
    margin: theme.spacing(10, 0, 4),
    width: '100%'
  },
}));

export default function Login() {
  const classes = useStyles();

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const authCtx = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    setIsLoading(true)
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD11unAeKqJI5c1hKPG-0zSQDmU4DWur-8'
    fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      setIsLoading(false)
      if (res.ok) {
        return res.json()
      }
      else {
        return res.json().then(data => {
          let errorMessage = 'Authentication failed'
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message
          }
          throw new Error(errorMessage)
        })
      }
    }).then(data => {
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000))
      authCtx.login(data.idToken, expirationTime.toISOString())
      history.replace('/')
    }).catch(err => {
      alert(err.message)
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      {isLoading && (
        <Modal >
          <CircularProgress color="inherit" />
        </Modal>
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form className={classes.form} onSubmit={submitHandler}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label="아이디"
            name="email"
            type="email"
            autoComplete="email"
            inputRef={emailInputRef}
            autoFocus
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordInputRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            className={classes.submit}
          >Login</Button>
          <Grid container>
            <Grid item xs>
              <Link style={{ color: 'rgba(16, 24, 32)' }} to="/forgotPassword" variant="body2">
                암호를 잊으셨습니까?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
