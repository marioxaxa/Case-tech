import * as React from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { StateContext } from "../context/ReactContext";
import { GRID_DEFAULT_LOCALE_TEXT_PT } from "../utils/dataGridTrad";

const columns: GridColDef[] = [
    { field: "sku", headerName: "SKU", flex: 0.3 },
    { field: "produto", headerName: "Produto", flex: 1 },
    { field: "preco_cheio", headerName: "Preço cheio", flex: 0.3 },
    { field: "preco_descontado", headerName: "Preço descontado", flex: 0.3 },
];

type Props = {
    selecionedProducts: GridRowSelectionModel,
    setSelecionedProducts: (c : GridRowSelectionModel) => void
}

export default function ProductsTable({selecionedProducts, setSelecionedProducts} : Props) {
    const { productList } = React.useContext(StateContext);

    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>(selecionedProducts);

    React.useEffect(() => {
        setSelecionedProducts(rowSelectionModel)
    },[rowSelectionModel])

    return (
        <div style={{ height: 300, width: "100%" }}>
            <DataGrid
                rows={productList}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                localeText={GRID_DEFAULT_LOCALE_TEXT_PT}
            />
        </div>
    );
}
