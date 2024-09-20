import LoginComponent from "../components/LoginComponent";
import MiniDrawer from "../components/MiniDrawer";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import SnackBarComponent, { ErrorT } from "../components/SnackBarComponent";
import LogoutButton from "../components/LogoutButton";
import SalesBoard from "../components/SalesBoard";


export default function Home() {
    const { auth } = useAuth();

    const [error, setError] = useState<ErrorT>({
        severity: "",
        message: "",
        isOpen: false,
    });

    return (
        <div>
            <MiniDrawer>
                <>
                    {auth.isAuthenticated ? (
                        <>
                            <SalesBoard setError={setError} />
                        </>
                    ) : (
                        <LoginComponent setError={setError} />
                    )}
                    
                    <SnackBarComponent error={error} setError={setError} />
                </>
            </MiniDrawer>
        </div>
    );
}
