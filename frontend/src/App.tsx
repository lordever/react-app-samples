import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";


function App() {
    return (
        <div className="App">
            <React.StrictMode>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <RouterProvider router={router}/>
                    </ThemeProvider>
                </Provider>
            </React.StrictMode>
        </div>
    );
}

export default App;
