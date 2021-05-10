import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <Link to='/' className={classes.logo}>
                    Slack & Soft
                </Link>
            </header>
        </React.Fragment>
    );
}

export default Header;
