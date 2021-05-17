// import React, { useState, useEffect, useRef } from 'react';
// import { AgGridColumn, AgGridReact } from 'ag-grid-react';

// import 'ag-grid-enterprise'
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// const Main = () => {

//     const gridRef = useRef(null)
//     const [rowData, setRowData] = useState([])

//     useEffect(() => {
//         fetch('https://www.ag-grid.com/example-assets/row-data.json')
//             .then(result => result.json())
//             .then(rowData => setRowData(rowData))
//     }, [])

//     const onButtonClick = e => {
//         const selectedNodes = gridRef.current.api.getSelectedNodes()
//         const selectedData = selectedNodes.map(node => node.data)
//         const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ')
//         alert(`Selected nodes: ${selectedDataStringPresentation}`)
//     }

//     return (
//         <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
//             <AgGridReact
//                 ref={gridRef}
//                 rowData={rowData}
//                 rowSelection="multiple">
//                 <AgGridColumn checkboxSelection={true} sortable={true} filter={true} field="make"></AgGridColumn>
//                 <AgGridColumn sortable={true} filter={true} field="model"></AgGridColumn>
//                 <AgGridColumn sortable={true} filter={true} field="price"></AgGridColumn>
//             </AgGridReact>
//             <button onClick={onButtonClick}>Get selected rows</button>
//         </div>
//     );
// };
// export default Main

import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import classes from './Main.module.css'

function Main() {

    const [items, setItems] = useState([])
    const [httpError, setHttpError] = useState()

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://localhost:5001/api/items')
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }

            const responseData = await response.json()
            const items = []
            for (const key in responseData) {
                items.push({
                    id: key,
                    Ins_Emp: responseData[key].Ins_Emp,
                    Up_Emp: responseData[key].Up_Emp,
                    Item_Code: responseData[key].Item_Code,
                    Item_Name: responseData[key].Item_Name,
                    Item_Spec: responseData[key].Item_Spec,
                    Remark: responseData[key].Remark,
                    Unit_Code: responseData[key].Unit_Code,
                    Up_DateTime: responseData[key].Up_DateTime,
                    Ins_DateTime: responseData[key].Ins_DateTime,
                    Use_YN: responseData[key].Use_YN
                })
            }
            setItems(items)
            console.log(items)
        }

        fetchMeals().catch(error => {
            setHttpError(error.message)
        })
    }, [])
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Item_Code', headerName: 'Item_Code', width: 150 },
        { field: 'Item_Name', headerName: 'Item_Name', width: 150 },
        { field: 'Ins_DateTime', headerName: 'Ins_DateTime', width: 150},
        { field: 'Item_Spec', headerName: 'Item_Spec', width: 150 },
        {
            field: 'Unit_Code',
            headerName: 'Unit_Code',
            type: 'number',
            width: 150,
        },
    ];

    const rows = [
        { id: '0', Item_Code: '222' },
        { id: '1', Item_Spec: 'Cersei' },
        { id: '2', Item_Name: 'Jaime' },
        { id: '3', Ins_DateTime: 'Arya'},
        { id: '4', Unit_Code: 'Daenerys'},
    ];

    if (httpError) {
        return <section className={classes.ItemsError}>
            <p>{httpError}</p>
        </section>
    }

    return (
        <div style={{ display: 'flex', background: 'white', height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    )
}

export default Main