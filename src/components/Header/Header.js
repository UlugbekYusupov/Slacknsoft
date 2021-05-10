import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

function Header(props) {
    const loginCtx = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = () => {
        loginCtx.logout()
        history.push('/')
    }

    return (
        <header className={classes.header}>
            <Link to='/' className={classes.logo}>
                Slack & Soft
            </Link>
            <nav>
                <ul>
                    <li>
                        {!loginCtx.isLoggedIn && <Link className={classes.link} to='login'>login</Link>}
                    </li>

                    <li>
                        {loginCtx.isLoggedIn && <button className={classes.link} onClick={logoutHandler}>logout</button>}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
