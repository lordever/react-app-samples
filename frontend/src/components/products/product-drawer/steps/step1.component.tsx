import React, {FC} from 'react';
import {StepHandlerProps} from "../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../model/product-flow.model";
import {Box, Button, Typography} from "@mui/material";

const Step1: FC<StepHandlerProps<ProductFlowModel>> = ({context, setContext}) => {
    const handleClick = () => {
        setContext({...context, characteristic: "Model: S"})
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="start" p={2} gap={1}>
            <Typography variant="h6" component="span">
                Title: {context.title}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Update
            </Button>
        </Box>
    );
};

export default Step1;