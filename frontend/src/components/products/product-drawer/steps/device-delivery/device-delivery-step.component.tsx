import React, {FC, useCallback} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../../builders/ConditionalStepBuilder";
import {BundleFlowModel} from "../../model/bundle-flow.model";
import WizardToolbar from "../../../../wizard-drawer/wizard-toolbar.component";

const DeviceDeliveryStep: FC<StepHandlerProps<BundleFlowModel>> = ({onStepChange, onClose}) => {
    const handleNext = useCallback(() => {
        onStepChange(StepPosition.NEXT)
    }, [onStepChange]);

    const handleBack = useCallback(() => {
        onStepChange(StepPosition.BACK)
    }, [onStepChange]);

    return (
        <>
            Device delivery step

            <WizardToolbar
                onClose={onClose}
                onNext={handleNext}
                onBack={handleBack}
            />
        </>
    );
};

export default DeviceDeliveryStep;