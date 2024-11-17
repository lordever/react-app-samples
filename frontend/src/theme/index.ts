import {baseTheme} from "./baseTheme";
import {typographyTheme} from "./typeography/theme";
import {createTheme} from "@mui/material";
import {buttonTheme} from "./button/theme";

const theme = createTheme(
    {
        ...baseTheme,
        ...typographyTheme,
        ...buttonTheme,
    }
);

export default theme;