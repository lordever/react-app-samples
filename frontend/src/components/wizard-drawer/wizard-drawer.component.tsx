import React, {FC, memo, useState} from 'react';
import {Box, Button, Drawer, IconButton, Typography} from "@mui/material";
import {IoMdClose} from "react-icons/io";
import "./wizard-drawer.component.css"
import {useRerenderCount} from "../../hooks/useRerenderCount";
import {ConditionalStepBuilder, StepHandlerProps} from "../../builders/ConditionalStepBuilder";

interface WizardDrawerProps {
    title: string | null;
    open: boolean;
    onClose: () => void;
}

const Step1: FC<StepHandlerProps<any>> = ({context, setContext}) => (<>Step 1</>)
const Step2: FC<StepHandlerProps<any>> = ({context, setContext}) => (<>Step 2</>)
const Step3: FC<StepHandlerProps<any>> = ({context, setContext}) => (<>Step 3</>)

const StepChainBuilder = new ConditionalStepBuilder()
    .add(Step1)
    .add(Step2)
    .add(Step3);


const StepChain = StepChainBuilder.build({title: 'Product'});

const WizardDrawer: React.FC<WizardDrawerProps> = ({title, open, onClose}) => {
    const {count} = useRerenderCount();
    const [context, setContext] = useState({title});
    const [currentStepIndex, setStepIndex] = useState(0);

    const handleNext = () => setStepIndex((prevIndex) => Math.min(prevIndex + 1, StepChainBuilder.steps.length - 1));
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
            <p>Drawer Render Count: {count}</p>
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
                    {currentStepIndex === StepChainBuilder.steps.length - 1 ? (
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