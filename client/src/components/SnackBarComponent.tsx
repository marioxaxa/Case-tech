import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import React from "react";

export type ErrorT = {
    severity: string;
    message: string;
    isOpen: boolean;
};

type Props = {
    error: ErrorT,
    setError: (e: ErrorT) => void
};

export default function SnackBarComponent({error, setError}: Props) {
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setError({ severity: "", message: "", isOpen: false });
    };

    return (
        <Snackbar
            open={error.isOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert
                onClose={handleClose}
                // @ts-ignore
                severity={error.severity}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {error.message}
            </Alert>
        </Snackbar>
    );
}
