import {
    Alert,
    Container,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NewSaleProductList from "./NewSaleProductList";
import { ProductQuantityT } from "../types/ProductQuantityT";
import { InputsT } from "./NewSaleForm";
import { extraToString, isCashToString } from "../utils/saleToString";
import calcTotalPrice from "../utils/calcTotalPrice";
import { StateContext } from "../context/ReactContext";
import calcMaxDiscount from "../utils/calcMaxDiscount";
import calcDelivery from "../utils/calcDelivery";

type Props = {
    selecionedProducts: ProductQuantityT;
    saleData: InputsT;
};

export default function NewSaleConfirmation({
    selecionedProducts,
    saleData,
}: Props) {
    const { productList } = React.useContext(StateContext);

    const [totalPrice, setTotalPrice] = useState(0);

    const [discontedPrice, setDiscontedPrice] = useState(0);

    const [maxDiscount, setMaxDiscount] = useState(0);

    const [deliveryPrice, setDeliveryPrice] = useState(0);

    useEffect(() => {
        const totalPriceHOLDER = calcTotalPrice(
            selecionedProducts,
            saleData.is_cash_payment,
            productList
        );

        const deliveryPriceHOLDER = calcDelivery(saleData.state);

        const maxDiscountHOLDER = calcMaxDiscount(
            totalPriceHOLDER,
            deliveryPriceHOLDER,
            saleData.extra
        );

        setTotalPrice(totalPriceHOLDER);

        setMaxDiscount(maxDiscountHOLDER);

        setDeliveryPrice(deliveryPriceHOLDER);

        setDiscontedPrice(
            totalPriceHOLDER + deliveryPriceHOLDER - saleData.discount
        );
    }, [saleData]);

    return (
        <Container maxWidth="md">
            <Paper elevation={4} sx={{ px: 4, py:4 }}>
                <Typography variant="h6">Nova venda</Typography>
                <Stack
                    direction={"row"}
                    justifyContent={"space-evenly"}
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <NewSaleProductList
                        selecionedProducts={selecionedProducts}
                    />
                    <Stack direction={"column"} alignItems={"start"} flex={1} px={2} >
                        <Typography variant="subtitle1">
                            Destino: {saleData.state}
                        </Typography>
                        <Typography variant="subtitle1">
                            Adicional: {extraToString(saleData.extra)}
                        </Typography>
                        <Typography variant="subtitle1">
                            Forma de pagamento:{" "}
                            {isCashToString(saleData.is_cash_payment)}
                        </Typography>
                        <Typography variant="subtitle1">
                            Valor dos produtos: R${totalPrice}
                        </Typography>
                        <Typography variant="subtitle1">
                            Valor do frete: R${deliveryPrice}
                        </Typography>
                        <Typography variant="subtitle1">
                            Desconto: R${saleData.discount}
                        </Typography>
                        <Typography variant="subtitle1">
                            Valor total: R${discontedPrice.toFixed(2)}
                        </Typography>
                        {saleData.discount > maxDiscount ? (
                            <Alert severity="warning" >
                                {" "}
                                Devido ao desconto ultrapaçar o valor maximo,
                                seu pedido deverá ser aceito por um gerente.{" "}
                            </Alert>
                        ) : null}
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
}
