import React, {FC, useCallback, useEffect, useState} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../../model/product-flow.model";
import {Box} from "@mui/material";
import WizardToolbar from "../../../../wizard-drawer/wizard-toolbar.component";
import {useSelector} from "react-redux";
import {selectProductsExcludingId} from "../../../../../store/products/products.selector";
import {RootState} from "../../../../../store/store";
import {Product} from "../../../../../model/product.model";
import "./product-summary-step.component.css"
import ProductWizardCard from "../../components/product-wizard-card.component";
import {useAppDispatch} from "../../../../../hooks/store.hook";
import {
    selectProductPurchaseQuote,
    selectProductPurchaseQuoteCreateLoading
} from "../../../../../store/product-purchase-flow/product-purchase-flow.selector";
import {addProductsToQuote} from "../../../../../store/product-purchase-flow/product-purchase-flow.thunk";

const ProductSummaryStep: FC<StepHandlerProps<ProductFlowModel>> = ({context, setContext, onStepChange, onClose}) => {
    const {productId} = context;
    const dispatch = useAppDispatch()

    const [addedProducts, setAddedProducts] = useState<Product[]>([]);
    const products = useSelector((state: RootState) => selectProductsExcludingId(state, productId));
    const quotesLoading = useSelector(selectProductPurchaseQuoteCreateLoading);
    const quote = useSelector(selectProductPurchaseQuote);

    const handleAddProduct = useCallback((product: Product) => {
        setAddedProducts((addedProductsState: Product[]) => [...addedProductsState, product])
    }, [])

    const handleNext = useCallback(() => {
        dispatch(addProductsToQuote(addedProducts))
    }, [dispatch, addedProducts])

    useEffect(() => {
        if (quote && !quotesLoading) {
            onStepChange(StepPosition.NEXT);
        }
    }, [onStepChange, quotesLoading, quote]);

    return (
        <Box display="flex" flexDirection="column">
            {products.map((product) => (
                <ProductWizardCard
                    key={product.id}
                    product={product}
                    onAddProduct={handleAddProduct}
                />
            ))}

            <WizardToolbar
                onClose={onClose}
                isBackDisabled
                isNextDisabled={addedProducts.length === 0}
                isLoading={quotesLoading}
                onNext={handleNext}
            />
        </Box>
    );
};

export default ProductSummaryStep;