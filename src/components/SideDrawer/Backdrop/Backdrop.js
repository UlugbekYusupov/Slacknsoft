import classes from './Backdrop.module.css'
import React from 'react'

function Backdrop(props) {
    return (
        props.show ?
            <div
                className={classes.Backdrop}
                onClick={props.clicked}>
            </div> : null
    )
}

export default Backdrop
