import React from 'react'
import classes from './DeletePop.module.css'

function DeletePop(props) {

    const okHandler = () => {
        console.log(props.rowData)
        const url = "api/items"
        fetch(`${url}/${props.rowData.id}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                window.location.reload()
            }
        })
    }

    return (
        <div className={classes.delete}>
            <label>Do you want to delete this item?</label>
            <div>
                <button onClick={okHandler}>OK</button>
                <button>CANCEL</button>
            </div>
        </div>
    )
}

export default DeletePop
