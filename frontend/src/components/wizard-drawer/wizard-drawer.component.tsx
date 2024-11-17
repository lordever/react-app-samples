import React, {memo, useCallback, useEffect, useState} from 'react';
import {Box, Drawer, IconButton, Typography} from "@mui/material";
import {IoMdClose} from "react-icons/io";
import "./wizard-drawer.component.css"
import {ConditionalStepBuilder, StepChain} from "../../builders/ConditionalStepBuilder";

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

    useEffect(() => {
        setCurrentStepIndex(0);

        return () => {
            setCurrentStepIndex(0);
        }
    }, [open]);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box className="container" width={400} p={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {title && <Typography variant="h6">{title}</Typography>}
                    <IconButton onClick={onClose}>
                        <IoMdClose/>
                    </IconButton>
                </Box>

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