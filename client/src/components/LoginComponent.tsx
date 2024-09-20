import {
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "../service/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { ErrorT } from "../pages/Home";

type LoginInputT = {
    username: string;
    password: string;
};

type Props = {
    setError: (e : ErrorT) => void
}

export default function LoginComponent({setError} : Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputT>();

    const { login } = useAuth();

    

    const onSubmit: SubmitHandler<LoginInputT> = (data) => {
        console.log(data);

        const header = {
            username: data.username,
            password: data.password,
        };

        // @ts-ignore
        loginMutation.mutate(header);
    };

    const loginMutation = useMutation({
        mutationFn: (header) => {
            return axiosInstance.post("auth/login", header);
        },
        onSuccess: (response) => {
            login(response.data.access_token, response.data.user);
            setError({ severity: "success", message: "Logado com sucesso", isOpen: true });
        },
        onError: (response) => {
            // @ts-ignore
            setError({ severity: "error", message: response.response.data.msg, isOpen: true });
        },
    });

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
                        {...register("username", {
                            required: "Campo obrigatorio",
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        variant="standard"
                        {...register("password", {
                            required: "Campo obrigatorio",
                            minLength: {
                                value: 8,
                                message:
                                    "Sua password deve ter no minimo 8 digitos",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button variant="contained" type="submit">
                        Logar
                    </Button>
                </Stack>
                
            </Paper>
        </Container>
    );
}
