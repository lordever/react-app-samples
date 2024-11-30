import React, {FC} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../../model/product-flow.model";
import {useSelector} from "react-redux";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import {selectProductPurchaseQuote} from "../../../../../store/product-purchase-flow/product-purchase-flow.selector";
import WizardToolbar from "../../../../wizard-drawer/wizard-toolbar.component";

const WizardSummaryStep: FC<StepHandlerProps<ProductFlowModel>> = ({onClose, onStepChange}) => {
    const quote = useSelector(selectProductPurchaseQuote);

    if (!quote) {
        return null;
    }

    return (
        <>
            <Box sx={{marginBottom: 2}}>
                <Card sx={{marginBottom: 2}}>
                    <CardHeader
                        title={quote.name}
                        subheader={`Type: ${quote.type}`}
                    />
                </Card>

                {/* Quote Items */}
                <Card sx={{marginBottom: 2}}>
                    <CardHeader title="Quote Items"/>
                    <Divider/>
                    <CardContent>
                        <Grid container>
                            {quote.quoteItems.map((item) => (
                                <Grid item xs={12} key={item.id}>
                                    <Card sx={{marginBottom: 2}} variant="outlined">
                                        <CardHeader
                                            title={item.name}
                                            subheader={`Type: ${item.type}`}
                                        />
                                        <CardContent>
                                            {/* Product Information */}
                                            <Typography variant="subtitle1" gutterBottom>
                                                Product: {item.product.name}
                                            </Typography>

                                            {/* Characteristics */}
                                            <Typography variant="subtitle2" gutterBottom>
                                                Characteristics:
                                            </Typography>
                                            <Box component="ul" sx={{pl: 2}}>
                                                {item.characteristic.map((char) => (
                                                    <li key={char.id}>
                                                        {char.name}: {char.value}
                                                    </li>
                                                ))}
                                            </Box>

                                            {/* Prices */}
                                            <Typography variant="subtitle2" gutterBottom>
                                                Prices:
                                            </Typography>
                                            <TableContainer component={Paper}>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Recurrent</TableCell>
                                                            <TableCell>One Time</TableCell>
                                                            <TableCell>Upfront</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {item.prices.map((price) => (
                                                            <TableRow key={price.id}>
                                                                <TableCell>{price.recurrent}</TableCell>
                                                                <TableCell>{price.oneTime}</TableCell>
                                                                <TableCell>{price.upfront}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>

                {quote.totalPrice && (
                    <Card sx={{marginBottom: 2}}>
                        <CardHeader title="Total Price"/>
                        <Divider/>
                        <CardContent>
                            <Grid container>
                                <TableContainer component={Paper}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Recurrent</TableCell>
                                                <TableCell>One Time</TableCell>
                                                <TableCell>Upfront</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{quote.totalPrice?.recurrent}</TableCell>
                                                <TableCell>{quote.totalPrice?.oneTime}</TableCell>
                                                <TableCell>{quote.totalPrice?.upfront}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

            </Box>
            <WizardToolbar
                onClose={onClose}
                onBack={() => onStepChange(StepPosition.BACK)}
            />
        </>
    );
};

export default WizardSummaryStep;