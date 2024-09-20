import { IconButton, List, ListItem, ListItemText, Paper } from "@mui/material";
import { SaleT } from "../types/SaleT";
import { Check, Clear } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../service/axiosInstance";
import { queryClient } from "../service/queryClient";
import { ErrorT } from "./SnackBarComponent";

type Props = {
    saleList: SaleT[];
    analiseList: boolean;
    setError: (e: ErrorT) => void;
};

export default function SalesList({ saleList, analiseList, setError }: Props) {
    const approveMutation = useMutation({
        mutationFn: (header) => {
            return axiosInstance.put("shop/sale/approve/" + header.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["salesListContext"] });
            setError({
                severity: "success",
                message: "Venda aprovada com sucesso",
                isOpen: true,
            });
        },
    });

    const onAprove = (sale: SaleT) => {
        const header = {
            id: sale.id,
        };

        approveMutation.mutate(header);
    };

    const rejectMutation = useMutation({
        mutationFn: (header) => {
            return axiosInstance.put("shop/sale/reject/" + header.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["salesListContext"] });
            setError({
                severity: "success",
                message: "Venda rejeitada com sucesso",
                isOpen: true,
            });
        },
    });

    const onReject = (sale: SaleT) => {
        const header = {
            id: sale.id,
        };

        rejectMutation.mutate(header);
    };

    return (
        <List dense sx={{ maxHeight: 600, overflow: "auto", width: "100%" }}>
            {saleList?.map((sale) => {
                return (
                    <Paper elevation={4} >
                        <ListItem key={"productitemlist" + sale.id}>
                            <ListItemText
                                primary={
                                    "Venda feita por " +
                                    sale.seller +
                                    " no valor de R$" +
                                    sale.price
                                }
                                secondary={
                                    "O desconto foi de R$" +
                                    sale.discount +
                                    " com o maximo de R$" +
                                    sale.max_discount
                                }
                            />
                            {analiseList ? (
                                <>
                                    <IconButton
                                        onClick={() => {
                                            onAprove(sale);
                                        }}
                                        size="small"
                                        color="success"
                                    >
                                        <Check />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            onReject(sale);
                                        }}
                                        size="small"
                                        color="error"
                                    >
                                        <Clear />
                                    </IconButton>
                                </>
                            ) : null}
                        </ListItem>
                    </Paper>
                );
            })}
        </List>
    );
}
