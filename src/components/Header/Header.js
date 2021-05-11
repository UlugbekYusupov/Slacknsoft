import React, { useContext, useState } from "react";
import classes from "./Header.module.css";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Logo from "../Logo/Logo";
import lightLogo from '../../assets/logo2.png'
import darkLogo from '../../assets/logo.png'

function Header(props) {
    const loginCtx = useContext(AuthContext)
    const history = useHistory()

    const [logoState, setLogoState] = useState(false)

    const logoutHandler = () => {
        loginCtx.logout()
        history.push('/')
    }

    const logoHoverEnterHandler = () => { setLogoState(true) }
    const logoHoverOutHandler = () => { setLogoState(false) }

    return (
        <header className={classes.header}>
            <Link to='/' className={classes.logo}>
                <Logo logo={!logoState ? lightLogo : darkLogo} onMouseOut={logoHoverOutHandler} onMouseEnter={logoHoverEnterHandler} />
            </Link>

            <nav>
                <ul>
                    <li>
                        {!loginCtx.isLoggedIn ? <Link className={classes.link} to='login'>Login</Link> :
                            <button className={classes.link} onClick={logoutHandler}>Logout</button>}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
