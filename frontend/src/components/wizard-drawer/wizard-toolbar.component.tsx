import React, {FC} from 'react';
import {Box, Button, CircularProgress} from "@mui/material";
import "./wizard-drawer.component.css"

interface WizardToolbarProps {
    isLoading?: boolean;
    isBackDisabled?: boolean;
    isNextDisabled?: boolean;
    onBack?: () => void;
    onNext?: () => void;
    onClose?: () => void
}


const WizardToolbar: FC<WizardToolbarProps> = ({
                                                   isNextDisabled,
                                                   onNext,
                                                   isBackDisabled,
                                                   onBack,
                                                   isLoading,
                                                   onClose
                                               }) => {
    return (
        <Box className="bottom-toolbar">
            {(onBack || isBackDisabled) && (
                <Button
                    disabled={isBackDisabled || isLoading}
                    onClick={onBack}
                    variant="outlined"
                >
                    Back
                </Button>)
            }
            {onNext ? (
                <Button
                    disabled={isNextDisabled || isLoading}
                    onClick={onNext}
                    variant="contained"
                    color="primary"
                >
                    {isLoading ? <CircularProgress size={20}/> : 'Next'}
                </Button>
            ) : (
                <Button
                    variant="contained"
                    onClick={onClose}
                    color="success"
                >
                    Finish
                </Button>
            )}
        </Box>
    );
};

export default WizardToolbar;