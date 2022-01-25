import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';

interface IProps {
    value: string;
    onChange: (event: any) => void;
}

const PlaceCategoriesForm = ({value, onChange}: IProps) => {
    return (
        <FormControl fullWidth sx={{mt: '15px'}} required>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
                name="categories"
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Category"
                onChange={onChange}
            >
                <MenuItem value={'Cafe'}>Cafe</MenuItem>
                <MenuItem value={'Bar'}>Bar</MenuItem>
                <MenuItem value={'Restaurant'}>Restaurant</MenuItem>
                <MenuItem value={'Club'}>Club</MenuItem>
                <MenuItem value={'Administrative'}>Administrative</MenuItem>
                <MenuItem value={'Education'}>Education</MenuItem>
                <MenuItem value={'Marketplace'}>Marketplace</MenuItem>
                <MenuItem value={'Mall'}>Mall</MenuItem>
                <MenuItem value={'Supermarket'}>Supermarket</MenuItem>
                <MenuItem value={'Shop'}>Shop</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
        </FormControl>
    );
};

export default PlaceCategoriesForm;
