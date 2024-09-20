// @ts-nocheck
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StateContext } from "../context/ReactContext";
import { GRID_DEFAULT_LOCALE_TEXT_PT } from "../utils/dataGridTrad";
import { TextField } from "@mui/material";
import { ProductQuantityT } from "../types/ProductQuantityT";

type Props = {
    selecionedProducts: ProductQuantityT;
    setSelecionedProducts: (c: ProductQuantityT) => void;
};

export default function ProductsTable({
    selecionedProducts,
    setSelecionedProducts,
}: Props) {
    const { productList } = React.useContext(StateContext);

    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<ProductQuantityT>(selecionedProducts);

    const [editedCellValues, setEditedCellValues] = React.useState<ProductQuantityT>(selecionedProducts);

    const columns: GridColDef[] = [
        {
            field: "quantidade",
            headerName: "Quantidade",
            width: 150,
            renderCell: (params) => (
                <TextField
                    type="number"
                    value={
                        editedCellValues[params.id]?.quantidade ?? params.value
                    }
                    onChange={(e) =>
                        handleCellEdit(params.id, "quantidade", e.target.value)
                    }
                />
            ),
            filterOperators: [
                {
                    label: "Igual a",
                    value: "=",
                    getApplyFilterFn: (filterItem) => {
                        return (params) => {
                            if (!filterItem.value) {
                                return true;
                            }
                            return params.value === Number(filterItem.value);
                        };
                    },
                    InputComponent: TextField,
                },
                {
                    label: "Maior que",
                    value: ">",
                    getApplyFilterFn: (filterItem) => {
                        return (params) => {
                            if (!filterItem.value) {
                                return true;
                            }
                            return params.value > Number(filterItem.value);
                        };
                    },
                    InputComponent: TextField,
                },
                {
                    label: "Menor que",
                    value: "<",
                    getApplyFilterFn: (filterItem) => {
                        return (params) => {
                            if (!filterItem.value) {
                                return true;
                            }
                            return params.value < Number(filterItem.value);
                        };
                    },
                    InputComponent: TextField,
                },
            ],
        },
        { field: "sku", headerName: "SKU", flex: 0.3 },
        { field: "produto", headerName: "Produto", flex: 1 },
        { field: "preco_cheio", headerName: "Preço cheio", flex: 0.3 },
        {
            field: "preco_descontado",
            headerName: "Preço descontado",
            flex: 0.3,
        },
    ];

    const handleCellEdit = (
        id: string | number,
        field: string,
        value: string
    ) => {
        setEditedCellValues((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: Number(value),
            },
        }));

        setRowSelectionModel((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, [field]: Number(value) } : row
            )
        );
    };

    React.useEffect(() => {
        setSelecionedProducts(editedCellValues);
    }, [editedCellValues, setSelecionedProducts]);

    return (
        <div style={{ height: 300, width: "100%" }}>
            <DataGrid
                rows={productList}
                columns={columns}
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={(newSelection) =>
                    setRowSelectionModel(newSelection)
                }
                localeText={GRID_DEFAULT_LOCALE_TEXT_PT}
                disableRowSelectionOnClick
                filterMode="server"
            />
        </div>
    );
}
