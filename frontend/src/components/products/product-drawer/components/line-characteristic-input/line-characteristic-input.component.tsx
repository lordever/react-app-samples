import React, {FC, useCallback, useState} from 'react';
import {TextField} from "@mui/material";

interface LineCharacteristicInputProps {
    defaultValue: string;
    onChange: (value: string) => void
}

const LineCharacteristicInput: FC<LineCharacteristicInputProps> = ({onChange, defaultValue}) => {
    const [value, setValue] = useState<string>();

    const handlePhoneNumberChange = useCallback((event: { target: { name: string; value: string } }) => {
        const newValue = event.target.value;
        setValue(newValue);

        onChange(newValue);
    }, [onChange])

    const isEmpty = value?.trim().length === 0;

    return (
        <TextField
            error={isEmpty}
            label="Phone Number"
            variant="outlined"
            helperText={isEmpty ? "Empty field" : ""}
            value={value}
            defaultValue={defaultValue}
            onChange={handlePhoneNumberChange}/>
    );
};

export default LineCharacteristicInput;