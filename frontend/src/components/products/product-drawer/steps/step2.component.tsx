import React, {FC} from 'react';
import {StepHandlerProps} from "../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../model/product-flow.model";
import {Box, Button, Typography} from "@mui/material";

const Step2:FC<StepHandlerProps<ProductFlowModel>> = ({context,setContext}) => {
    const handleClick = () => {
        setContext({...context, price: 100})
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="start" p={2} gap={1}>
            <Typography variant="h6" component="span">
                Title: {context.title}
            </Typography>

            <Typography variant="h6" component="span">
                Characteristic: {context.characteristic}
            </Typography>

            <Button variant="contained" color="primary" onClick={handleClick}>
                Update
            </Button>
        </Box>
    );
};

export default Step2;