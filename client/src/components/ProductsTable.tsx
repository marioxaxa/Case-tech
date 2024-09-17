import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
    { field: "col1", headerName: "SKU", width: 150 },
    { field: "col2", headerName: "Produto", width: 150 },
    { field: "col3", headerName: "Preço cheio", width: 150 },
    { field: "col4", headerName: "Preço descontado", width: 150 },
];

export default function ProductsTable() {
    return (
        <div style={{ height: 300, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
}
