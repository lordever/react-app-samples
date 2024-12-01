import React, {FC, useCallback} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../../builders/ConditionalStepBuilder";
import {BundleFlowModel} from "../../model/bundle-flow.model";
import WizardToolbar from "../../../../wizard-drawer/wizard-toolbar.component";
import {Box} from "@mui/material";
import "../../../../wizard-drawer/wizard-drawer.component.css"

const LineFutureDateActivationStep: FC<StepHandlerProps<BundleFlowModel>> = ({onClose, onStepChange}) => {
    const handleNext = useCallback(() => {
        onStepChange(StepPosition.NEXT)
    }, [onStepChange]);

    const handleBack = useCallback(() => {
        onStepChange(StepPosition.BACK)
    }, [onStepChange]);

    return (
        <>
            Line Activation Date step

            <WizardToolbar
                onClose={onClose}
                onNext={handleNext}
                onBack={handleBack}
            />
        </>
    );
};

export default LineFutureDateActivationStep;