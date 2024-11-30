import React, {FC, useCallback, useState} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../../builders/ConditionalStepBuilder";
import {BundleFlowModel} from "../../model/bundle-flow.model";
import WizardToolbar from "../../../../wizard-drawer/wizard-toolbar.component";
import {useSelector} from "react-redux";
import {selectProductsExcludingId} from "../../../../../store/products/products.selector";
import {RootState} from "../../../../../store/store";
import {Product} from "../../../../../model/product.model";
import "./init-bundle-step.component.css"
import ProductCard from "../../components/product-card.component";
import {useAppDispatch} from "../../../../../hooks/store.hook";
import {selectProductPurchaseQuoteCreateLoading} from "../../../../../store/bundle-flow/bundle-flow.selector";
import {addProductsToQuote} from "../../../../../store/bundle-flow/bundle-flow.thunk";
import {Box} from "@mui/material";

const InitBundleStep: FC<StepHandlerProps<BundleFlowModel>> = ({context, onStepChange, onClose}) => {
    const {product} = context;
    const dispatch = useAppDispatch()

    const [addedProducts, setAddedProducts] = useState<Product[]>([product]);
    const products = useSelector((state: RootState) => selectProductsExcludingId(state, product.id));
    const quotesLoading = useSelector(selectProductPurchaseQuoteCreateLoading);

    const handleAddProduct = useCallback((product: Product) => {
        setAddedProducts((addedProductsState: Product[]) => [...addedProductsState, product])
    }, [])

    const handleNext = useCallback(() => {
        dispatch(addProductsToQuote(addedProducts))
            .unwrap()
            .then(() => {
                onStepChange(StepPosition.NEXT);
            })
    }, [dispatch, addedProducts])

    return (
        <>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddProduct={handleAddProduct}
                />
            ))}

            <WizardToolbar
                onClose={onClose}
                isNextDisabled={addedProducts.length <= 1}
                isLoading={quotesLoading}
                onNext={handleNext}
            />
        </>
    );
};

export default InitBundleStep;