import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Logo from "../Logo/Logo";

function Header(props) {
    const loginCtx = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = () => {
        loginCtx.logout()
        history.push('/')
    }

    return (
        <header className={classes.header}>
            {/* <Link to='/' className={classes.logo}>
                Slack & Soft
            </Link> */}
            <Logo/>
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
