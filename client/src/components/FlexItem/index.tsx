import React from 'react';
import Box, {BoxProps} from '@mui/material/Box';

const FlexItem = (props: BoxProps) => {
    const {sx, ...other} = props;
    return <Box sx={{mt: 1, fontSize: '1.1rem', ...sx}}{...other}/>;
};

export default FlexItem;
