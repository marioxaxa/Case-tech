import { Container, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { StateContext } from "../context/ReactContext";
import { SaleT } from "../types/SaleT";
import SalesList from "./SalesList";
import LogoutButton from "./LogoutButton";
import { ErrorT } from "./SnackBarComponent";

type Props = {
    setError: (e: ErrorT) => void;
};

export default function SalesBoard({ setError }: Props) {
    const { auth } = useAuth();

    const { salesList } = React.useContext(StateContext);

    const [analiseList, setAnaliseList] = useState<SaleT[]>([]);

    const [rejectedList, setRejectedList] = useState<SaleT[]>([]);

    const [approvedList, setApprovedList] = useState<SaleT[]>([]);

    useEffect(() => {
        setAnaliseList(salesList?.filter((sale) => sale.is_pending));

        setRejectedList(
            salesList?.filter((sale) => !sale.is_aproved && !sale.is_pending)
        );

        setApprovedList(salesList?.filter((sale) => sale.is_aproved));
    }, [salesList]);

    const [is_manager, setIs_manager] = useState<boolean | undefined>(false);

    useEffect(() => {
        setIs_manager(auth.user?.manager);
    }, [auth]);

    return (
        <Container maxWidth="lg">
            <Stack
                direction={"row"}
                justifyContent={"space-evenly"}
                divider={<Divider orientation="vertical" flexItem />}
            >
                {is_manager ? (
                    <Stack direction={"column"}>
                        <Typography>Vendas aguardando analise</Typography>
                        <SalesList
                            saleList={analiseList}
                            analiseList={true}
                            setError={setError}
                        />
                    </Stack>
                ) : null}

                <Stack direction={"column"}>
                    <Typography>Vendas rejeitadas</Typography>
                    <SalesList
                        saleList={rejectedList}
                        analiseList={false}
                        setError={setError}
                    />
                </Stack>
                <Stack direction={"column"}>
                    <Typography>Vendas aprovadas</Typography>
                    <SalesList
                        saleList={approvedList}
                        analiseList={false}
                        setError={setError}
                    />
                </Stack>
            </Stack>
            <LogoutButton />
        </Container>
    );
}
