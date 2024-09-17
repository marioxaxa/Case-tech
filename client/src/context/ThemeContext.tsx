import { ReactElement } from "react";

import { ThemeOptions, createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

export const themeOptions: ThemeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: "#0988A8",
        },
        secondary: {
            main: "#FCC302",
        },
    },
};

const theme = createTheme(themeOptions);

type Props = { children: ReactElement | null };

function ThemeContext({ children }: Props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    );
}

export default ThemeContext;
