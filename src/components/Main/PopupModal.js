import React from 'react'
import Backdrop from '../SideDrawer/Backdrop/Backdrop'
import DeletePop from './DeletePopup/DeletePop'
import InsertPop from './InsertPopup/InsertPop'


function PopupModal(props) {
    let modal

    if (props.insert) { modal = <InsertPop /> }
    if (props.delete) { modal = <DeletePop rowData={props.rowData} /> }
    if (props.update) { modal = <p>Do you want to update this item?</p> }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.clicked} />
            {modal}
        </React.Fragment>
    )
}

export default PopupModal