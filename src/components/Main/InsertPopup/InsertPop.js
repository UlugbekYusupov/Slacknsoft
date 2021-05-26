import React, { useRef } from 'react'
import classes from './InsertPop.module.css'

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

function InsertPop() {

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

    const insertTemp = {
        Ins_Emp: "Aaaa",
        Up_Emp: "ddddd",
        Item_Code: "cccccc",
        Item_Name: "xxxxxxx",
        Item_Spec: "444444",
        Remark: "ddddddd",
        Unit_Code: "122222222", 
        Use_YN: {
            Y: false,
            N: true
        }
    }

    const submitCreatedItem = (event) => {
        event.preventDefault()
        const url = "/api/items"
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(insertTemp),

        }).then(res => {
            console.log(res)
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
            window.location.reload()
        }).catch(err => {
            alert(err.message)
        })
    }

    return (
        <div className={classes.Popup}>
            <form onSubmit={submitCreatedItem}>
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
        </div>
    )
}

export default InsertPop
