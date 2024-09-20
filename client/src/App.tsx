import "./App.css";
import AppRoutes from "./AppRoutes";
import { AuthenticationContext } from "./context/AuthContext";
import QueryContext from "./context/QueryContext";
import ReactContext from "./context/ReactContext";
import ThemeContext from "./context/ThemeContext";

function App() {
    return (
        <>
            <QueryContext>
                <ThemeContext>
                    <AuthenticationContext>
                        <ReactContext>
                            <AppRoutes />
                        </ReactContext>
                    </AuthenticationContext>
                </ThemeContext>
            </QueryContext>
        </>
    );
}

export default App;
