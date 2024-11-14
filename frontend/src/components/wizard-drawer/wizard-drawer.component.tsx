import React, {memo, useState} from 'react';
import {Box, Button, Drawer, IconButton, Typography} from "@mui/material";
import {IoMdClose} from "react-icons/io";
import "./wizard-drawer.component.css"
import {useRerenderCount} from "../../hooks/useRerenderCount";
import {ConditionalStepBuilder, StepChain} from "../../builders/ConditionalStepBuilder";

interface WizardDrawerProps {
    title: string | null;
    open: boolean;
    onClose: () => void;
    chain: ConditionalStepBuilder<any>;
    StepChain: React.FC<StepChain>
}

const WizardDrawer: React.FC<WizardDrawerProps> = ({title, open, chain, onClose, StepChain}) => {
    const {count} = useRerenderCount();
    const [currentStepIndex, setStepIndex] = useState<number>(0);

    const handleNext = () => setStepIndex((prevIndex) => Math.min(prevIndex + 1, chain.steps.length - 1));
    const handleBack = () => setStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    const handleFinish = () => {
        setStepIndex(0);
        onClose();
    };

    const handleClose = () => {
        setStepIndex(0);
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={handleClose}>
            <Box className="container" width={400} p={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {title && <Typography variant="h6">{title}</Typography>}
                    <IconButton onClick={handleClose}>
                        <IoMdClose/>
                    </IconButton>
                </Box>

                <Box my={4}>
                    <StepChain currentStepIndex={currentStepIndex}/>
                </Box>

                <Box className="bottom-toolbar">
                    <Button disabled={currentStepIndex === 0} onClick={handleBack}>
                        Back
                    </Button>
                    {currentStepIndex === chain.steps.length - 1 ? (
                        <Button variant="contained" color="primary" onClick={handleFinish}>
                            Finish
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};

export default memo(WizardDrawer);