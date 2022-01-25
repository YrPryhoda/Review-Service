import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@mui/material';
import HdrStrongIcon from '@mui/icons-material/HdrStrong';

import {categoriesParser} from '../../helpers/categoriesParser';
import styles from './styles.module.scss';

interface IProps {
    categories: string | string[];
}

const PlaceCategories = (props: IProps) => {
    return (
        <>
            {categoriesParser(props.categories).map(el => {
                return (
                    <ListItem key={el} dense>
                        <ListItemIcon>
                            <HdrStrongIcon/>
                        </ListItemIcon>
                        <ListItemText className={styles.category_text} primary={el}/>
                    </ListItem>
                );
            })}
        </>
    );
};

export default PlaceCategories;
