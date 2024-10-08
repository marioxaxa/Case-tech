import {
    Box,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Portal,
    Button,
} from "@mui/material";
import estadosSiglas from "../utils/estadosSiglas";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import React from "react";
import { StateContext } from "../context/ReactContext";
import calcDelivery from "../utils/calcDelivery";
import calcMaxDiscount from "../utils/calcMaxDiscount";
import { ProductQuantityT } from "../types/ProductQuantityT";
import calcTotalPrice from "../utils/calcTotalPrice";

const estados = estadosSiglas();

export type InputsT = {
    is_cash_payment: number;
    discount: number;
    extra: number;
    state: string;
};

type Props = {
    selecionedProducts: ProductQuantityT;
    refButton: React.MutableRefObject<null>;
    handleNext: () => void;
    saleData: InputsT;
    setSaleData: (c: InputsT) => void;
};

export default function NewSaleForm({
    selecionedProducts,
    refButton,
    handleNext,
    saleData,
    setSaleData,
}: Props) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm<InputsT>({ defaultValues: saleData });

    const onSubmit: SubmitHandler<InputsT> = (data) => {
        setSaleData(data);
        handleNext();
    };

    const { productList } = React.useContext(StateContext);

    const [maxDiscount, setMaxDiscount] = React.useState(0);

    React.useEffect(() => {
        const subscription = watch((value) => {
            if (
                typeof value.extra !== "number" ||
                typeof value.is_cash_payment !== "number" ||
                typeof value.state !== "string"
            ) {
                return;
            }

            const product_price = calcTotalPrice(
                selecionedProducts,
                value.is_cash_payment,
                productList
            );

            const delivery_price = calcDelivery(value.state);

            const maxDiscountHOLDER = calcMaxDiscount(
                product_price,
                delivery_price,
                value.extra
            );

            setMaxDiscount(maxDiscountHOLDER);
        });
        return () => subscription.unsubscribe();
    }, [selecionedProducts, watch]);

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "300px",
                margin: "auto",
            }}
        >
            <FormControl fullWidth>
                <InputLabel id="extra-select-label">
                    Adicional de trabalho
                </InputLabel>
                <Select
                    labelId="extra-select-label"
                    id="extra-select"
                    label="Adicional de trabalho"
                    {...register("extra", { required: "Campo obrigatorio" })}
                    error={!!errors.extra}
                >
                    <MenuItem value={0}>Padrão</MenuItem>
                    <MenuItem value={1}>Turbo</MenuItem>
                    <MenuItem value={2}>Super Turbo</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="state-select-label">
                    Selecione o destino
                </InputLabel>
                <Select
                    labelId="state-select-label"
                    id="state-select"
                    label="Selecione o destino"
                    {...register("state", { required: "Campo obrigatorio" })}
                >
                    {estados.map((estado) => {
                        return (
                            <MenuItem
                                key={"MenuItem" + estado.estado}
                                value={estado.estado}
                            >
                                {estado.estado}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="cash-select-label">
                    Forma de pagamento
                </InputLabel>
                <Select
                    labelId="cash-select-label"
                    id="cash-select"
                    label="Forma de pagamento"
                    {...register("is_cash_payment", {
                        required: "Campo obrigatorio",
                    })}
                >
                    <MenuItem value={0}>Cartão de credito</MenuItem>
                    <MenuItem value={1}>Pix ou boleto</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Desconto"
                type="number"
                variant="outlined"
                helperText={"O desconto máximo é de " + maxDiscount.toFixed(2)}
                {...register("discount", {
                    required: "Campo obrigatorio",
                    min: {
                        value: 0,
                        message: "O desconto minimo é 0",
                    },
                })}
            />
            <Portal container={() => refButton.current}>
                <Button type="submit" onClick={handleSubmit(onSubmit)}>
                    Proximo
                </Button>
            </Portal>
            <DevTool control={control} />
        </Box>
    );
}
