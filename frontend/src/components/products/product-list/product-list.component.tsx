import React, {FC, memo} from 'react';
import {Product} from "../../../model/product.model";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid2 as Grid,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import {useRerenderCount} from "../../../hooks/useRerenderCount";
import "./product-list.component.css"

interface ProductListProps {
    products?: Product[];
    openDrawer: (productId: number) => void;
}

const ProductList: FC<ProductListProps> = ({products, openDrawer}) => {
    const {count} = useRerenderCount()

    if (!products) {
        return null;
    }

    return (
        <>
            <p>
                Product List Render Count: {count}
            </p>
            <Grid container spacing={8}>

                {products.map((product) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={product.id}>
                        <Card>
                            <CardHeader title={product.name}/>
                            <CardContent>
                                <Typography variant="h6">Characteristics:</Typography>
                                <List>
                                    {product.characteristics.map((characteristic) => (
                                        <ListItem key={characteristic.id}>
                                            <ListItemText
                                                primary={characteristic.name}
                                                secondary={characteristic.value}
                                            />
                                        </ListItem>
                                    ))}
                                </List>

                                <div className="button-bottom">
                                    <Button variant="contained">Buy</Button>
                                    <Button variant="contained" onClick={() => openDrawer(product.id)}>Buy as bundle</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default memo(ProductList);