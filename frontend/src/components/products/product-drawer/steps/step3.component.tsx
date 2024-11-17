import React, {FC} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../model/product-flow.model";
import {Box, Typography} from "@mui/material";
import WizardToolbar from "../../../wizard-drawer/wizard-toolbar.component";

const Step3: FC<StepHandlerProps<ProductFlowModel>> = ({context, onStepChange, onClose}) => {
    const handleBack = () => {
        onStepChange(StepPosition.BACK);
    }

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Box display="flex" flexDirection="column" alignItems="start">
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
            <WizardToolbar
                onClose={onClose}
                onBack={handleBack}
            />
        </Box>
    );
};

export default Step3;