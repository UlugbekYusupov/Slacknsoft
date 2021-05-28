import React from 'react'
import Backdrop from '../SideDrawer/Backdrop/Backdrop'
import DeletePop from './DeletePopup/DeletePop'
import InsertPop from './InsertPopup/InsertPop'


function PopupModal(props) {
    let modal
    if (props.delete) { modal = <DeletePop rowData={props.rowData} /> }
    if (props.insert || props.update) { modal = <InsertPop rowData={props.rowData} state={props.update} /> }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.clicked} />
            {modal}
        </React.Fragment>
    )
}

export default PopupModal