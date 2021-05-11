import React, { useState, useEffect, useRef } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Main = () => {

    const gridRef = useRef(null)
    const [rowData, setRowData] = useState([])

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, [])

    const onButtonClick = e => {
        const selectedNodes = gridRef.current.api.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }

    return (
        <div className="ag-theme-alpine" style={{ margin: 10, height: 500, width: '100%' }}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                rowSelection="multiple">
                <AgGridColumn checkboxSelection={true} sortable={true} filter={true} field="make"></AgGridColumn>
                <AgGridColumn sortable={true} filter={true} field="model"></AgGridColumn>
                <AgGridColumn sortable={true} filter={true} field="price"></AgGridColumn>
            </AgGridReact>
            <button onClick={onButtonClick}>Get selected rows</button>
        </div>
    );
};
export default Main