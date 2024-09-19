import "./App.css";
import AppRoutes from "./AppRoutes";
import QueryContext from "./context/QueryContext";
import ReactContext from "./context/ReactContext";
import ThemeContext from "./context/ThemeContext";

function App() {
    return (
        <>
            <QueryContext>
                <ThemeContext>
                    <ReactContext>
                        <AppRoutes />
                    </ReactContext>
                </ThemeContext>
            </QueryContext>
        </>
    );
}

export default App;
