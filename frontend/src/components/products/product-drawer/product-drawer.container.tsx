import React, {FC, memo, useCallback, useMemo} from 'react';
import {useSelector} from "react-redux";
import {selectProductById} from "../../../store/products/products.selector";
import WizardDrawer from "../../wizard-drawer/wizard-drawer.component";
import StepChainBuilder from "./builder/step-chain.builder";
import {useAppDispatch} from "../../../hooks/store.hook";
import {clearQuote} from "../../../store/quotes/quotes.slice";

export enum DrawerType {
    BUY_PRODUCT = "buyProduct"
}

interface ProductDrawerContainerProps {
    drawerType: DrawerType | null;
    productId?: number;
    open: boolean;
    onClose: () => void;
}


const ProductDrawerContainer: FC<ProductDrawerContainerProps> = ({productId, drawerType, open, onClose}) => {
    const dispatch = useAppDispatch();
    const product = useSelector(selectProductById(productId));

    const getTitleBasedOnDrawerType = useMemo(() => {
        if (drawerType === DrawerType.BUY_PRODUCT) {
            return product ? product.name : null;
        }
        return null;
    }, [product, drawerType]);

    const StepChain = useMemo(() => {
        if (!product) return undefined;
        return StepChainBuilder.build({productId: product.id});
    }, [product]);

    const handleClose = useCallback(() => {
        dispatch(clearQuote())
        onClose();
    }, [dispatch, onClose])

    if (!product || !drawerType || !StepChain) {
        return null;
    }

    return (
        <WizardDrawer
            chain={StepChainBuilder}
            StepChain={StepChain}
            open={open}
            onClose={handleClose}
            title={getTitleBasedOnDrawerType}
        />
    );
};

export default memo(ProductDrawerContainer);