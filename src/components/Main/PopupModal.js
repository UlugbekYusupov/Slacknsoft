// import { Input } from '@material-ui/core'
import React, { useRef } from 'react'
import Backdrop from '../SideDrawer/Backdrop/Backdrop'
import classes from './PopupModal.module.css'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'


function PopupModal(props) {

    let attachedClasses = [classes.Popup, classes.Close]

    const insEmpRef = useRef()
    const upEmpRef = useRef()
    const itemCodeRef = useRef()
    const itemNameRef = useRef()
    const itemSpecRef = useRef()
    const remarkRef = useRef()
    const unitCodeRef = useRef()
    const upDatetimeRef = useRef()
    const insDatetimeRef = useRef()
    const useYNRef = useRef()

    if (props.show) {
        attachedClasses = [classes.Popup, classes.Open]
    }

    const submitCreatedItem = (event) => {
        event.preventDefault()
    }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.clicked} />
            <form className={attachedClasses.join(' ')} onSubmit={submitCreatedItem}>
                <Input ref={insEmpRef} label="Ins_Emp" />
                <Input ref={upEmpRef} label="Up_Emp" />
                <Input ref={itemCodeRef} label="Item_Code" />
                <Input ref={itemNameRef} label="Item_Name" />
                <Input ref={itemSpecRef} label="Item_Spec" />
                <Input ref={remarkRef} label="Remark" />
                <Input ref={unitCodeRef} label="Unit_Code" />
                <Input ref={upDatetimeRef} label="Up_DateTime" />
                <Input ref={insDatetimeRef} label="Ins_DateTime" />
                <Input ref={useYNRef} label="Use_YN" />
                <button className={classes.button}>Insert</button>
            </form>
        </React.Fragment>
    )
}

export default PopupModal