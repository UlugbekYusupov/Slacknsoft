import React from "react";
import { Link } from 'react-router-dom'

import Logo from "../Logo/Logo";
import lightLogo from '../../assets/logo2.png'
import darkLogo from '../../assets/logo.png'
import classes from "./Header.module.css";
import MenuIcon from "../UI/MenuIcon/MenuIcon";

function Header(props) {
    return (
        <header className={classes.header}>
            <Link to='/'>
                <Logo logo={!props.logoState ? lightLogo : darkLogo} onMouseOut={props.onHoverOut} onMouseEnter={props.onHoverEnter} />
            </Link>
            <nav>
                <ul>
                    <li>
                        {!props.loginCtx.isLoggedIn ? <Link className={classes.link} to='login'>Login</Link> :
                            <button className={classes.link} onClick={props.onLogout}>Logout</button>}
                    </li>
                    {props.loginCtx.isLoggedIn && <li>
                        {/* <Button onClick={props.drawerToggleClicked}>Menu</Button> */}
                        <MenuIcon clicked={props.drawerToggleClicked}/>
                    </li>}
                </ul>
            </nav>
        </header>
    );
}
export default Header