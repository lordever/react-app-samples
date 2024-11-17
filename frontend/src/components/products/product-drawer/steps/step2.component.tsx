import React, {FC} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../model/product-flow.model";
import {Box, Typography} from "@mui/material";
import WizardToolbar from "../../../wizard-drawer/wizard-toolbar.component";

const Step2: FC<StepHandlerProps<ProductFlowModel>> = ({context, setContext, onStepChange, onClose}) => {
    const handleNext = () => {
        setContext({...context, price: 100})
        onStepChange(StepPosition.NEXT)
    }

    const handleBack = () => {
        onStepChange(StepPosition.BACK);
    }

    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="start" p={2} gap={1}>
                <Typography variant="h6" component="span">
                    Title: {context.title}
                </Typography>

                <Typography variant="h6" component="span">
                    Characteristic: {context.characteristic}
                </Typography>
            </Box>
            <WizardToolbar
                onClose={onClose}
                onNext={handleNext}
                onBack={handleBack}
            />
        </>
    );
};

export default Step2;