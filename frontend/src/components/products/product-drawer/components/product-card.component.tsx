import React, {FC, memo} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Button, Card,
    CardContent,
    CardHeader,
    List,
    ListItem, ListItemText,
    Typography
} from "@mui/material";
import {MdExpandMore} from "react-icons/md";
import {Characteristic, Product} from "../../../../model/product.model";

interface ProductCardProps {
    product: Product;
    onAddProduct: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({onAddProduct, product}) => {
    return (
        <Card key={product.id} className="product-card">
            <CardHeader title={product.name} className="card-header"/>
            <CardContent className="card-content">
                <Accordion className="characteristics-accordion">
                    <AccordionSummary
                        expandIcon={<MdExpandMore/>}
                        aria-controls="characteristics-content"
                        id="characteristics-header"
                    >
                        <Typography variant="h6">Characteristics</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List className="characteristics-list">
                            {product.characteristics.map((characteristic: Characteristic) => (
                                <ListItem key={characteristic.id} className="characteristics-item">
                                    <ListItemText
                                        primary={characteristic.name}
                                        secondary={characteristic.value}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>

                <div className="button-container">
                    <Button
                        variant="contained"
                        className="add-button"
                        onClick={() => onAddProduct(product)}
                    >
                        Add
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default memo(ProductCard);