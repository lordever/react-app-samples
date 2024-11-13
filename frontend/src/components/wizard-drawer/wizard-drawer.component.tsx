import React, {memo, useState} from 'react';
import {Box, Button, Drawer, IconButton, Typography} from "@mui/material";
import {IoMdClose} from "react-icons/io";
import "./wizard-drawer.component.css"
import {useRerenderCount} from "../../hooks/useRerenderCount";

type WizardDrawerProps = {
    title: string | null;
    open: boolean;
    onClose: () => void;
};

const WizardDrawer: React.FC<WizardDrawerProps> = ({title, open, onClose}) => {
    const steps = ['Step 1', 'Step 2', 'Step 3'];
    const [activeStep, setActiveStep] = useState(0);
    const {count} = useRerenderCount()

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleFinish = () => {
        setActiveStep(0)
        onClose();
    };

    const handleClose = () => {
        setActiveStep(0)
        onClose()
    }

    return (
        <Drawer anchor="right" open={open} onClose={handleClose}>
            <p>
                Drawer Render Count: {count}
            </p>
            <Box className="container" width={400} p={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {title && <Typography variant="h6">{title}</Typography>}
                    <IconButton onClick={handleClose}>
                        <IoMdClose/>
                    </IconButton>
                </Box>

                <Box my={4}>
                    {activeStep === 0 && <div>Step content 1</div>}
                    {activeStep === 1 && <div>Step content 2</div>}
                    {activeStep === 2 && <div>Step content 3</div>}
                </Box>

                <Box className="bottom-toolbar">
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
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