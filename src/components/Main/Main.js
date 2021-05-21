import React, { useEffect, useState, useCallback } from 'react'

import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Input, Button, ButtonGroup, makeStyles, fade, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import PopupModal from './PopupModal'
import classes from './Main.module.css'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginRight: 20,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Main() {

    const [items, setItems] = useState([])
    const [httpError, setHttpError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const classess = useStyles()

    const [rowSelectedState, setRowSelectedState] = useState(false)

    const [insertState, setInsertState] = useState(false)

    const fetchItemsHandler = useCallback(async () => {
        setIsLoading(true);
        setHttpError(null);
        try {
            const response = await fetch("https://localhost:5001/api/items");
            console.log(response)

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            const items = []
            for (const key in data) {
                items.push({
                    id: key,
                    Ins_Emp: data[key].Ins_Emp,
                    Up_Emp: data[key].Up_Emp,
                    Item_Code: data[key].Item_Code,
                    Item_Name: data[key].Item_Name,
                    Item_Spec: data[key].Item_Spec,
                    Remark: data[key].Remark,
                    Unit_Code: data[key].Unit_Code,
                    Up_DateTime: data[key].Up_DateTime,
                    Ins_DateTime: data[key].Ins_DateTime,
                    Use_YN: data[key].Use_YN
                })
            }
            setItems(items)
        } catch (error) {
            setHttpError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchItemsHandler();
    }, [fetchItemsHandler]);

    let columns = []
    let rows = []

    if (items.length > 0) {
        const keys = Object.keys(items?.[0])
        columns = keys?.map((_, index) => {

            const attributes = {
                field: keys[index],
                headerName: keys[index],
                width: 150,
                editable: true,
            }

            if (keys[index] === "id") {
                return {
                    ...attributes,
                    editable: false,
                }
            }

            if (keys[index] === "Ins_DateTime" || keys[index] === "Up_DateTime") {
                return {
                    ...attributes,
                    type: "date"
                }
            } else {
                return {
                    ...attributes
                }
            }
        })

        rows = items?.map((value, index) => {
            return {
                ...value,
            }
        })
    }

    const insertHandler = () => {
        setInsertState(true)
    }

    const onCloseBackdrop = () => {
        setInsertState(!insertState)
    }

    return (
        <React.Fragment>
            <PopupModal show={insertState} clicked={onCloseBackdrop} />
            <div className={classes.main}>
                <div className={classes.buttons}>
                    <ButtonGroup size="medium">
                        <Button onClick={insertHandler}>Insert</Button>
                        {rowSelectedState && <Button>Delete</Button>}
                        {rowSelectedState && <Button>Update</Button>}
                    </ButtonGroup>
                    <div className={classess.search}>
                        <div className={classess.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classess.inputRoot,
                                input: classess.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </div>
                <button onClick={fetchItemsHandler} style={{ width: 100, height: 20 }}>Refresh</button>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    loading={isLoading}
                    error={httpError}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>
        </React.Fragment>
    )
}

export default Main

// const cellRenderer = (params) => {
    //     const onClick = () => {
    //         const api: GridApi = params.api;
    //         const fields = api
    //             .getAllColumns()
    //             .map((c) => c.field)
    //             .filter((c) => c !== "__check__" && !!c);
    //         const thisRow: Record<string, GridCellValue> = {};

    //         fields.forEach((f) => {
    //             thisRow[f] = params.getValue(f);
    //         });

    //         return alert(JSON.stringify(thisRow, null, 4));
    //     };

    //     return <Button onClick={onClick}>Click</Button>;
    // }