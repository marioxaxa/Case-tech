import React, { useState } from "react";
import MiniDrawer from "../components/MiniDrawer";
import CreateUserForm from "../components/CreateUserForm";
import SnackBarComponent, { ErrorT } from "../components/SnackBarComponent";


export default function Perfil() {
    const [error, setError] = useState<ErrorT>({
        severity: "",
        message: "",
        isOpen: false,
    });

    return (
        <div>
            <MiniDrawer>
                <>
                    <CreateUserForm setError={setError} />
                    <SnackBarComponent error={error} setError={setError} />
                </>
            </MiniDrawer>
        </div>
    );
}
