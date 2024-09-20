import {
    Alert,
    Button,
    Container,
    Divider,
    Paper,
    Portal,
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
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../service/axiosInstance";
import { queryClient } from "../service/queryClient";
import getProductById from "../utils/getProductById";
import prodQToProdVector from "../utils/prodQToProdVector";
import { ErrorT } from "./SnackBarComponent";
import { useAuth } from "../context/AuthContext";

type Props = {
    selecionedProducts: ProductQuantityT;
    saleData: InputsT;
    setError: (e: ErrorT) => void;
    refButton: React.MutableRefObject<null>;
    handleReset: () => void;
};

export default function NewSaleConfirmation({
    selecionedProducts,
    saleData,
    setError,
    refButton,
    handleReset
}: Props) {

    const { auth } = useAuth();

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

    const createMutation = useMutation({
        mutationFn: (header) => {
            return axiosInstance.post("shop/sale", header);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["salesListContext"] });
            setError({
                message: "Venda criada com sucesso",
                severity: "success",
                isOpen: true,
            });
            handleReset()
        },
        onError: (error) => {
            setError({
                // @ts-ignore
                message: error.response.data.msg,
                severity: "error",
                isOpen: true,
            });
        },
    });

    const onSubmit = () => {
        const productsIdArray = [];
        const prodIterable = prodQToProdVector(selecionedProducts);

        for (const id of prodIterable) {
            
            productsIdArray.push(
                {id: id.key, quantity: id.data.quantidade}
            );
        }

        let is_approved = null
        if(saleData.discount <= maxDiscount) {
            console.log('aaaaaaa')
            is_approved = true
        }

        const header = {
            is_pending: saleData.discount > maxDiscount,
            is_cash_payment: saleData.is_cash_payment == 1,
            discount: saleData.discount ,
            max_discount: maxDiscount.toFixed(2),
            shipping: deliveryPrice,
            extra: saleData.extra,
            price: parseFloat(discontedPrice.toFixed(2)) ,
            products: productsIdArray,
            seller: auth.user?.username,
            is_aproved: is_approved
        };

        console.log(header);

        createMutation.mutate(header);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={4} sx={{ px: 4, py: 4 }}>
                <Typography variant="h6">Nova venda</Typography>
                <Stack
                    direction={"row"}
                    justifyContent={"space-evenly"}
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <NewSaleProductList
                        selecionedProducts={selecionedProducts}
                    />
                    <Stack
                        direction={"column"}
                        alignItems={"start"}
                        flex={1}
                        px={2}
                        pt={4}
                    >
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
                            Valor dos produtos: R${totalPrice.toFixed(2)}
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
                            <Alert severity="warning">
                                {" "}
                                Devido ao desconto ultrapaçar o valor maximo,
                                seu pedido deverá ser aceito por um gerente.{" "}
                            </Alert>
                        ) : null}
                    </Stack>
                </Stack>
                <Portal container={() => refButton.current}>
                    <Button type="submit" onClick={onSubmit}>
                        Finalizar venda
                    </Button>
                </Portal>
            </Paper>
        </Container>
    );
}
