import React, {memo, useState} from 'react';
import {useSelector} from "react-redux";
import {selectProducts} from "../../../store/products/products.selector";
import ProductList from "./product-list.component";
import {useRerenderCount} from "../../../hooks/useRerenderCount";
import ProductDrawerContainer, {DrawerType} from "../product-drawer/product-drawer.container";

const ProductListContainer = () => {
    const products = useSelector(selectProducts)
    const {count} = useRerenderCount()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [productId, setProductId] = useState<number>()

    const handleOpenDrawer = (productId: number) => {
        setProductId(productId);
        setOpenDrawer(true)
    }

    const handleCloseDrawer = () => {
        setOpenDrawer(false)
    }

    return (
        <div>
            <p>
                Product List Container Render Count: {count}
            </p>

            <ProductList openDrawer={handleOpenDrawer} products={products}/>
            <ProductDrawerContainer drawerType={DrawerType.BUY_PRODUCT}
                                    productId={productId}
                                    open={openDrawer}
                                    onClose={handleCloseDrawer}/>
        </div>
    );
};

export default memo(ProductListContainer);