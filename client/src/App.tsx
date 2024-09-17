import "./App.css";
import AppRoutes from "./AppRoutes";
import QueryContext from "./context/QueryContext";
import ThemeContext from "./context/ThemeContext";

function App() {
    return (
        <>
            <QueryContext>
                <ThemeContext>
                    <AppRoutes />
                </ThemeContext>
            </QueryContext>
        </>
    );
}

export default App;
