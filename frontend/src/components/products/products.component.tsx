import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useRerenderCount} from "../../hooks/useRerenderCount";
import {useAppDispatch} from "../../hooks/store.hook";
import {fetchProducts} from "../../store/products/products.thunk";
import ProductListContainer from "./product-list/product-list.container";

const Products = () => {
    const dispatch = useAppDispatch();
    const {count} = useRerenderCount()
    const [showText, setShowText] = useState(true)

    const textToggle = () => {
        setShowText((previous) => !previous);
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

    return (
        <div>
            {showText && "Hello, here is the list of products"}

            <p>
                Render Count: {count}
            </p>

            <p>
                <Button onClick={textToggle} variant="contained">{showText ? "Hide Text" : "Show Text"}</Button>
            </p>

            <ProductListContainer/>
        </div>
    );
};

export default Products;