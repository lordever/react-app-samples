import {createBrowserRouter} from "react-router-dom";
import Main from "../components/main/main.component";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    }
])