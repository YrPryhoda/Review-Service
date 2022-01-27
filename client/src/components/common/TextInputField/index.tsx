import React, {ChangeEvent} from 'react';
import {TextField as MUITextField} from '@mui/material';

type Props = {
    name: string;
    label: string;
    autoFocus?: boolean;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

const TextInputField = (props: Props) => {
    const {value, onChange, name, label, required = true, type = 'text', autoFocus = false, className} = props;
    return (
        <MUITextField
            margin="normal"
            type={type}
            required={required}
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            autoComplete={name}
            autoFocus={autoFocus}
            className={className}
        />
    );
};

export default TextInputField;
