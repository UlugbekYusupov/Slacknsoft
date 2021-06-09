import React from "react";
import Backdrop from "../SideDrawer/Backdrop/Backdrop";
import DeletePop from "./DeletePopup/DeletePop";
import InsertPop from "./InsertPopup/InsertPop";
import UpdatePop from "./UpdatePopup/UpdatePop";

function PopupModal(props) {
  let modal;
  if (props.delete) {
    modal = <DeletePop rowData={props.rowData} />;
  }
  if (props.insert) {
    modal = <InsertPop rowData={props.rowData} />;
  }
  if (props.update) {
    modal = <UpdatePop rowData={props.rowData} />;
  }

  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.clicked} />
      {modal}
    </React.Fragment>
  );
}

export default PopupModal;
