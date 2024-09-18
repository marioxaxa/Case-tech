import { Box, TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";
import estadosSiglas from "../utils/estadosSiglas";

const estados = estadosSiglas();

export default function NewSaleForm() {
    // Estado para armazenar os valores do formulário
    const [formData, setFormData] = useState({
        is_cash_payment: "",
        discount: "",
        extra: "",
        state: "",
    });

    // Função de callback para lidar com mudanças nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Função de callback para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode manipular os dados do formulário como desejar
        console.log("Formulário enviado com os dados: ", formData);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "300px",
                margin: "auto",
            }}
        >
            <TextField
                label="Adicional de trabalho"
                name="extra"
                select
                variant="outlined"
                value={formData.extra}
                onChange={handleChange}
                required
            >
                <MenuItem value="admin">Padrão</MenuItem>
                <MenuItem value="user">Turbo</MenuItem>
                <MenuItem value="guest">Super Turbo</MenuItem>
            </TextField>

            <TextField
                label="Selecione o destino"
                name="state"
                select
                variant="outlined"
                value={formData.state}
                onChange={handleChange}
                required
            >
                {estados.map((estado) => {
                    return (
                        <MenuItem value={estado.estado}>
                            {estado.estado}
                        </MenuItem>
                    );
                })}
            </TextField>

            <TextField
                label="Desconto"
                name="discount"
                type="number"
                variant="outlined"
                value={formData.discount}
                onChange={handleChange}
                required
                helperText={"O desconto máximo é de"}
            />

            <TextField
                label="Forma de pagamento"
                name="is_cash_payment"
                select
                variant="outlined"
                value={formData.is_cash_payment}
                onChange={handleChange}
                required
            >
                <MenuItem value="false">Cartão de credito</MenuItem>
                <MenuItem value="true">Pix ou boleto</MenuItem>
            </TextField>
        </Box>
    );
}
