import React, { useRef, useState, useContext, useReducer, useEffect } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '../UI/Button/Button'
import Modal from '../UI/Modal/Modal'
import AuthContext from '../../store/auth-context'
import { Link, useHistory } from 'react-router-dom'
import Input from '../UI/Input/Input';
import {
    CircularProgress, Avatar, CssBaseline,
    Grid, makeStyles, Container
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '10px',
        border: '2px solid rgb(180, 133, 72)',
        boxShadow: '0 2px 8px rgba(16, 24, 32, 0.25)',
        padding: '30px',
        position: 'relative'
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

    label: {
        display: 'inline',
        fontWeight: 'bold',
        fontSize: '15px',
        flex: 1,
        color: 'rgb(180, 133, 72)',
    }
}));

const emaulReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') }
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') }
    }
    return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 5 }
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 5 }
    }
    return { value: '', isValid: false }
}

export default function Login() {

    const classes = useStyles();

    const loginCtx = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emaulReducer, { value: '', isValid: null })
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })

    const { isValid: emailIsValid } = emailState
    const { isValid: passwordIsValid } = passwordState

    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log("checking form validity")
            setFormIsValid(
                emailIsValid && passwordIsValid
            );
        }, 500)
        return function cleanup() {
            console.log("Cleanup")
            clearTimeout(identifier)
        }
    }, [emailIsValid, passwordIsValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' })
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' })
    };

    const submitHandler = (event) => {
        event.preventDefault()
        // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD11unAeKqJI5c1hKPG-0zSQDmU4DWur-8
        if (formIsValid) {
            setIsLoading(true)
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD11unAeKqJI5c1hKPG-0zSQDmU4DWur-8'
            fetch(
                url,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: emailState.value,
                        password: passwordState.value,
                        returnSecureToken: true,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=utf-8',
                    },
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
                loginCtx.login(data.idToken)
                history.replace('/')
            }).catch(err => {
                alert(err.message)
            })
        } else if (!emailIsValid) {
            emailInputRef.current.focus()
        } else {
            passwordInputRef.current.focus()
        }
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
                    <label className={classes.label}>아이디</label>
                    <Input
                        id="email"
                        placeholder=" Your email"
                        isValid={emailIsValid}
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                        ref={emailInputRef}
                    />

                    <label className={classes.label}>비밀번호</label>
                    <Input
                        id="password"
                        type="password"
                        placeholder=" Your password"
                        isValid={passwordIsValid}
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                        ref={passwordInputRef}
                    />
                    
                    <Button
                        disabled={!formIsValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="inherit"
                        className={classes.submit}
                    >Login
                    </Button>
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