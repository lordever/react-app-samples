import {RootState} from "../store";
import {createSelector} from "@reduxjs/toolkit";

export const selectProducts = (state: RootState) => state.products.products
export const selectProductById = (id?: number) =>
    id
        ? createSelector(selectProducts, (products) => products.find(product => product.id === id))
        : () => null;
