// import { Input } from '@material-ui/core'
import React, { useRef } from 'react'
import Backdrop from '../SideDrawer/Backdrop/Backdrop'
import classes from './PopupModal.module.css'
// import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef()

    return (
        <div className={classes.control}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                label={props.label}
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                placeholder={props.placeholder}
            ></input>

        </div>
    )
})

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

    const insertTemp = []

    const submitCreatedItem = (event) => {
        event.preventDefault()
        const url = "https://localhost:5001/api/items"
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                Ins_Emp: "Ins_Emp",
                Up_Emp: "Up_Emp",
                Item_Code: "Item_Code",
                Item_Name: "Item_Name",
                Item_Spec: "Item_Spec",
                Remark: "Remark",
                Unit_Code: "Unit_Code",
                Up_DateTime: null,
                Ins_DateTime: null,
                Use_YN: null
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-16',
            },
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return res.json().then(data => {
                    let errorMessage = 'Create items failed...'
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message
                    }
                    throw new Error(errorMessage)
                })
            }
        }).then(data => {
            console.log(data)
        }).catch(err => {
            alert(err.message)
        })
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