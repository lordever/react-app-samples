import React, {memo, useCallback, useState} from 'react';
import {Box, Drawer} from "@mui/material";
import "./wizard-drawer.component.css"
import {ConditionalStepBuilder, StepChain} from "../../builders/ConditionalStepBuilder";
import WizardHeader from "./wizard-header.component";

interface WizardDrawerProps {
    title: string | null;
    open: boolean;
    onClose: () => void;
    chain: ConditionalStepBuilder<any>;
    StepChain: React.FC<StepChain>
}

const WizardDrawer: React.FC<WizardDrawerProps> = ({title, open, chain, onClose, StepChain}) => {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    const handleSetCurrentStepIndexChange = useCallback((stepIndex: number) => {
        setCurrentStepIndex(Math.min(stepIndex, chain.steps.length - 1));
    }, [chain.steps.length]);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}
                onTransitionExited={() => setCurrentStepIndex(0)}>
            <Box className="wizard-content">
                <WizardHeader title={title} onClose={onClose}/>

                <StepChain
                    currentStepIndex={currentStepIndex}
                    onStepIndexChange={handleSetCurrentStepIndexChange}
                    onClose={onClose}
                />
            </Box>
        </Drawer>
    );
};

export default memo(WizardDrawer);