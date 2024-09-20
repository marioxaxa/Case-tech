import { redirect } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import MiniDrawer from "../components/MiniDrawer";
import { useAuth } from "../context/AuthContext";
import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";

export type ErrorT = {
    severity: string;
    message: string;
    isOpen: boolean;
};

export default function Home() {
    const { auth } = useAuth();

    const [error, setError] = useState<ErrorT>({
        severity: "",
        message: "",
        isOpen: false,
    });

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
        <div>
            <MiniDrawer>
                <>
                    {auth.isAuthenticated ? (
                        <p>authentico</p>
                    ) : (
                        <LoginComponent setError={setError} />
                    )}
                    <Snackbar
                        open={error.isOpen}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{vertical:"bottom", horizontal:"right"}}
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
                </>
            </MiniDrawer>
        </div>
    );
}
