import React from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../Logo/Logo'
import logoImage from '../../assets/logo.png'
import Backdrop from './Backdrop/Backdrop'

function SideDrawer(props) {

    let attachedClasses = [classes.Sidedrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.Sidedrawer, classes.Open]
    }

    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}><Logo logo={logoImage} /></div>
            </div>
        </React.Fragment>
    )
}

export default SideDrawer
