import {
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type LoginInputT = {
    usuario: string;
    senha: string;
};

type Props = {};

export default function LoginComponent({}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputT>();

    const onSubmit: SubmitHandler<LoginInputT> = (data) => {
        console.log(data);
    };

    return (
        <Container
            maxWidth="xs"
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Paper elevation={4}>
                <Stack direction={"column"} p={4} spacing={4}>
                    <Typography variant="h6">Bem vindo</Typography>
                    <TextField
                        label="Usuario"
                        type="text"
                        variant="standard"
                        {...register("usuario", {
                            required: "Campo obrigatorio",
                        })}
                        error={!!errors.usuario}
                        helperText={errors.usuario?.message}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        variant="standard"
                        {...register("senha", {
                            required: "Campo obrigatorio",
                            minLength:{
                                value: 8,
                                message: "Sua senha deve ter no minimo 8 digitos"
                            }
                        })}
                        error={!!errors.senha}
                        helperText={errors.senha?.message}
                    />
                    <Button variant="contained" type="submit" >Logar</Button>
                </Stack>
            </Paper>
        </Container>
    );
}
