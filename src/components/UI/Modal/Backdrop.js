import classes from "./Modal.module.css"
import React from 'react'
import ReactDOM from 'react-dom'

const backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose} />
}

import React from 'react'

function Backdrop() {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        </React.Fragment>
    )
}

export default Backdrop
