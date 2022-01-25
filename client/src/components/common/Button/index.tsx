import React from 'react';
import {Button} from '@mui/material';

interface IProps {
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    onClick?: () => void;
    icon?: JSX.Element;
    value?: string;
}

const PrimaryButton = (props: IProps) => {
    return <Button
        color={props.color ? props.color : 'primary'}
        size="large"
        fullWidth
        variant="outlined"
        startIcon={props.icon}
        onClick={props.onClick}
    >
        {props.value ?? 'Search'}
    </Button>;
};

export default PrimaryButton;
