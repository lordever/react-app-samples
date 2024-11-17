import React, {FC, memo} from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import {IoMdClose} from "react-icons/io";

interface WizardHeaderProps {
    title: string | null;
    onClose: () => void;
}

const WizardHeader: FC<WizardHeaderProps> = ({onClose, title}) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            {title && <Typography variant="h6">{title}</Typography>}
            <IconButton onClick={onClose}>
                <IoMdClose/>
            </IconButton>
        </Box>
    );
};

export default memo(WizardHeader);