import React, {FC} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../model/product-flow.model";
import {Box, Typography} from "@mui/material";
import WizardToolbar from "../../../wizard-drawer/wizard-toolbar.component";

const Step1: FC<StepHandlerProps<ProductFlowModel>> = ({context, setContext, onStepChange, onClose}) => {
    const handleNext = () => {
        setContext({...context, characteristic: "Model: S"});
        onStepChange(StepPosition.NEXT)
    }

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Box>
                <Typography variant="h6" component="span">
                    Title: {context.title}
                </Typography>
            </Box>
            <WizardToolbar
                onClose={onClose}
                isBackDisabled
                onNext={handleNext}
            />
        </Box>
    );
};

export default Step1;