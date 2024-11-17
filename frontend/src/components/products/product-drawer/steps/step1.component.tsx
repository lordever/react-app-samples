import React, {FC, useCallback, useState} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../model/product-flow.model";
import {Box, Typography} from "@mui/material";
import WizardToolbar from "../../../wizard-drawer/wizard-toolbar.component";

const Step1: FC<StepHandlerProps<ProductFlowModel>> = ({context, setContext, onStepChange, onClose}) => {
    const [loading, setLoading] = useState(false);

    const handleNext = useCallback(() => {
        if (context.characteristic) {
            onStepChange(StepPosition.NEXT);
            return;
        }

        setTimeout(() => {
            setLoading(false)
            setContext({...context, characteristic: "Model: S"});
            onStepChange(StepPosition.NEXT)
        }, 2000)

        setLoading(true);
    }, [context, onStepChange, setContext])

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
                isLoading={loading}
                onNext={handleNext}
            />
        </Box>
    );
};

export default Step1;