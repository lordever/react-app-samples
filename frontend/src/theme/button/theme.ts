import {createTheme} from "@mui/material";

export const buttonTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        cursor: 'not-allowed',
                        pointerEvents: 'all !important'
                    },
                },
            },
        },
    },
});