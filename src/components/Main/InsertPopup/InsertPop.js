import React, { useRef, useImperativeHandle, useState } from 'react'
import classes from './InsertPop.module.css'
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef()

    const activate = () => {
        inputRef.current.focus()
    }

    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        }
    })

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
                onChange={props.onChange}
            ></input>
        </div>
    )
})

const GreenRadio = withStyles({
    root: {
        color: 'rgb(180, 133, 72)',
        '&$checked': {
            color: 'rgb(180, 133, 72)',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


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

    let Ins_DateTime = ""
    let Ups_DateTime = ""

    const insertTemp = {
        Ins_Emp: "Aaaa",
        Up_Emp: "ddddd",
        Item_Code: "cccccc",
        Item_Name: "xxxxxxx",
        Item_Spec: "444444",
        Remark: "ddddddd",
        Ins_DateTime: Ins_DateTime,
        Ups_DateTime: Ups_DateTime,
        Unit_Code: "122222222",
        Use_YN: {
            Y: false,
            N: true
        }
    }

    const [selectedValue, setSelectedValue] = React.useState(true);

    const handleChange = (event) => {
        setSelectedValue(!selectedValue);
    };

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

    const UpDateTimeHandler = (event) => {
        Ups_DateTime = event.target.value
    }

    return (
        <div className={classes.Popup}>
            <form onSubmit={submitCreatedItem}>
                <Input ref={insEmpRef} label="Ins_Emp" />
                <Input ref={upEmpRef} label="Up_Emp" />
                <Input type="number" ref={itemCodeRef} label="Item_Code" />
                <Input ref={itemNameRef} label="Item_Name" />
                <Input ref={itemSpecRef} label="Item_Spec" />
                <Input ref={remarkRef} label="Remark" />
                <Input ref={unitCodeRef} label="Unit_Code" />

                <Input type="date" onChange={UpDateTimeHandler} label="Up_DateTime" />
                <Input type="date" label="Ins_DateTime" />

                <div className={classes.radio}>
                    <label>Use_YN</label>
                    <div>
                        <FormControlLabel labelPlacement="end" value="true" control={<GreenRadio
                            checked={selectedValue}
                            onChange={handleChange}
                            name="radio-button-demo"
                        />} label="Yes" />
                        <FormControlLabel labelPlacement="end" value="false" control={<GreenRadio
                            checked={!selectedValue}
                            onChange={handleChange}
                            name="radio-button-demo"
                        />} label="No" />
                    </div>
                </div>

                <button className={classes.button}>Insert</button>
            </form>
        </div>
    )
}

export default InsertPop