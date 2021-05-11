import React from 'react'
import classes from './MenuIcon.module.css'

function MenuIcon(props) {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div className={classes.DrawerToggleDiv}></div>
            <div className={classes.DrawerToggleDiv}></div>
            <div className={classes.DrawerToggleDiv}></div>
        </div>
    )
}

export default MenuIcon
