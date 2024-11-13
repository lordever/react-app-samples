import {createBrowserRouter} from "react-router-dom";
import Products from "../components/products/products.component";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Products/>
    }
])