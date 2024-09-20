import {
    Container,
    Paper,
    Stack,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../service/axiosInstance";
import { ErrorT } from "./SnackBarComponent";

type RegisterInputT = {
    username: string;
    password: string;
    email: string;
    manager: boolean;
};

type Props = {

    setError: (c: ErrorT) => void

};

export default function CreateUserForm({setError}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInputT>();

    const { login } = useAuth();

    const onSubmit: SubmitHandler<RegisterInputT> = (data) => {
        console.log(data);

        const header = {
            username: data.username,
            password: data.password,
            email: data.email,
            manager: data.manager
        };

        // @ts-ignore
        registerMutation.mutate(header);
    };

    const registerMutation = useMutation({
        mutationFn: (header) => {
            return axiosInstance.post("auth/register", header);
        },
        onSuccess: (response) => {
            login(response.data.access_token, response.data.user);
            setError({
                severity: "success",
                message: "Usuario criado com sucesso",
                isOpen: true,
            });
        },
        onError: (response) => {
            // @ts-ignore
            setError({
                severity: "error",
                message: response.response.data.msg,
                isOpen: true,
            });
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
                    <Typography variant="h6">Crie uma nova conta de usuario</Typography>
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
                        label="Email"
                        type="email"
                        variant="standard"
                        {...register("email", {
                            required: "Campo obrigatorio",
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
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
                                    "Sua senha deve ter no minimo 8 digitos",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                   
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox {...register("manager")} />}
                            label="Conta de gerência"
                        />
                    </FormGroup>
                    <Button variant="contained" type="submit">
                        Criar usuario
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}
