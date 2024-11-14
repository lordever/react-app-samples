import React, {FC} from 'react';
import {StepHandlerProps} from "../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../model/product-flow.model";
import {Box, Typography} from "@mui/material";

const Step3: FC<StepHandlerProps<ProductFlowModel>> = ({context, setContext}) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="start" p={2} gap={1}>
            <Typography variant="h6" component="span">
                Title: {context.title}
            </Typography>

            <Typography variant="h6" component="span">
                Characteristic: {context.characteristic}
            </Typography>

            <Typography variant="h6" component="span">
                Price: {context.price}$
            </Typography>
        </Box>
    );
};

export default Step3;