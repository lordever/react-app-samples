import {RootState} from "../store";
import {createSelector} from "@reduxjs/toolkit";

export const selectProducts = (state: RootState) => state.products.products
export const selectProductsExcludingId = createSelector(
    [selectProducts, (_: RootState, productId: number) => productId],
    (products, productId) => products.filter(product => product.id !== productId)
);

export const selectProductById = (id?: number) =>
    id
        ? createSelector(selectProducts, (products) => products.find(product => product.id === id))
        : () => null;
