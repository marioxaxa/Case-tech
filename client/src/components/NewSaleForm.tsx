import {
    Box,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";
import { useState } from "react";
import estadosSiglas from "../utils/estadosSiglas";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const estados = estadosSiglas();

type InputsT = {
    is_cash_payment: number | null;
    discount: number | null;
    extra: number;
    state: string;
};

export default function NewSaleForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<InputsT>({
        defaultValues: {
            is_cash_payment: null,
            discount: null,
            extra: -1,
            state: "",
        },
    });

    const onSubmit: SubmitHandler<InputsT> = (data) => {
        console.log(data);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
                            <MenuItem value={estado.estado}>
                                {estado.estado}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <TextField
                label="Desconto"
                type="number"
                variant="outlined"
                helperText={"O desconto máximo é de"}
                {...register("discount", {
                    required: "Campo obrigatorio",
                    min: {
                        value: 0,
                        message: "O desconto minimo é 0",
                    },
                })}
            />

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
            <DevTool control={control} />
        </Box>
    );
}
