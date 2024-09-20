import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import prodQToProdVector from "../utils/prodQToProdVector";
import getProductById from "../utils/getProductById";
import { StateContext } from "../context/ReactContext";
import { ProductQuantityT } from "../types/ProductQuantityT";

export type ProductWQuantityT = {
    id: string;
    sku: string;
    produto: string;
    preco_cheio: number;
    preco_descontado: number;
    quantidade: number;
};

type Props = {
    selecionedProducts: ProductQuantityT;
};

export default function NewSaleProductList({ selecionedProducts }: Props) {
    const { productList } = React.useContext(StateContext);

    const [vectorProdList, setVectorProdList] = useState<ProductWQuantityT[]>(
        []
    );

    useEffect(() => {
        const prodIterable = prodQToProdVector(selecionedProducts);

        const vectorProdListHOLDER = [];

        for (const id of prodIterable) {
            const product = getProductById(
                id.key,
                productList
            ) as ProductWQuantityT;
            product.quantidade = id.data.quantidade;
            vectorProdListHOLDER.push(product);
        }

        setVectorProdList(vectorProdListHOLDER);
    }, [selecionedProducts]);

    return (
        <Stack direction={"column"} flex={1}>
            <Typography variant="subtitle1" component="div">
                Produtos Selecionados
            </Typography>

            <List
                dense
                sx={{ maxHeight: 250, overflow: "auto", width: "100%" }}
            >
                {vectorProdList.map((product) => {
                    return (
                        <ListItem key={"productitemlist" + product.sku}>
                            <ListItemText
                                primary={product.sku}
                                secondary={
                                    product.quantidade > 1
                                        ? product.quantidade + " unidades"
                                        : product.quantidade + " unidade"
                                }
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Stack>
    );
}
