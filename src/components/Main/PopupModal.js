import React from 'react'
import Backdrop from '../SideDrawer/Backdrop/Backdrop'
import InsertPop from './InsertPopup/InsertPop'


function PopupModal(props) {
    let modal
    if (props.insert) {
        modal = <InsertPop show={props.show} />
    }

    if (props.delete) {
        modal = <p>Do you want to delete this item?</p>
    }

    if (props.update) {
        modal = <p>Do you want to update this item?</p>
    }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.clicked} />
            {modal}
        </React.Fragment>
    )
}

export default PopupModal