import { Button } from '@material-ui/core'
import React from 'react'
import classes from './DeletePop.module.css'

function DeletePop(props) {

    const okHandler = () => {
        console.log(props.rowData)
        const url = "api/items"
        fetch(`${url}/${props.rowData.id}`, {
            method: 'DELETE',
        }).then(res => {
            if(res.ok) {
                window.location.reload()
            }
        })
    }

    return (
        <div className={classes.delete}>
            <Button onClick={okHandler}>Ok</Button>
            <Button>Cancel</Button>
        </div>
    )
}

export default DeletePop
