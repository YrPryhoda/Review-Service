import React from 'react';
import {
    IconButton, ListItem, Divider, Toolbar, styled, Button, List, Box
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {NotificationManager} from 'react-notifications';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MuiDrawer from '@mui/material/Drawer';

import TextInputField from '../common/TextInputField';
import PrimaryButton from '../common/Button';

import {clearSearch, findByParams} from '../../features/places/actions-creators';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectPlaces} from '../../features/places/selectors';
import {selectUser} from '../../features/user/selectors';
import {stringValidator} from '../../helpers/validators';
import useForm from '../common/hooks/useForm';
import {routes} from '../../routes/routes';
import styles from './styles.module.scss';
import {NavLink} from 'react-router-dom';

const drawerWidth: number = 320;

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                }),
                width: theme.spacing(1),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(0)
                }
            })
        }
    })
);

interface IProps {
    toggleDrawer: () => void;
    open: boolean;
}

const Navbar = (props: IProps) => {
    const {findQuery} = useAppSelector(selectPlaces);
    const {profile, access_token} = useAppSelector(selectUser);

    const {form, onChange, clearForm} = useForm({
        city: findQuery.city,
        name: findQuery.name
    });
    const dispatch = useAppDispatch();

    const searchHandler = () => {
        if (!stringValidator(form.city) && !stringValidator(form.name)) {
            NotificationManager.info(`Empty search parameters`, 'Info', 2500);
            return false;
        }
        localStorage.removeItem('page');
        dispatch(findByParams(form));
        form.city && localStorage.setItem('city', form.city);
        form.name && localStorage.setItem('name', form.name);
    };

    const clearHandler = () => {
        dispatch(clearSearch());
        clearForm({
            name: '',
            city: ''
        });
    };

    const isCreateBtnShown = access_token && profile.id
        ? (
            <ListItem sx={{margin: '20px 0'}}>
                <NavLink to={routes.createPlace} className={styles.fullWidth}>
                    <Button
                        color={'primary'}
                        startIcon={<AddIcon/>}
                        variant={'contained'}
                        fullWidth
                    >
                        Add place
                    </Button>
                </NavLink>
            </ListItem>
        )
        : null;

    return (
        <Drawer variant="permanent" open={props.open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: [1]
                }}
            >
                <h2> Menu </h2>
                <IconButton onClick={props.toggleDrawer}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <Box sx={{width: '100%', padding: '10px', bgcolor: 'background.paper'}}>
                <List>
                    <ListItem>
                        <TextInputField
                            required={false}
                            name={'city'}
                            label={'City'}
                            value={form.city}
                            onChange={onChange}/>
                    </ListItem>

                    <ListItem>
                        <TextInputField
                            required={false}
                            name={'name'}
                            label={'Search place'}
                            value={form.name}
                            onChange={onChange}/>
                    </ListItem>
                    <ListItem sx={{marginTop: '20px'}}>
                        <PrimaryButton icon={<SearchIcon/>} onClick={searchHandler}/>
                    </ListItem>
                    <ListItem sx={{margin: '20px 0'}}>
                        <Button
                            color={'error'}
                            startIcon={<HighlightOffIcon/>}
                            onClick={clearHandler}
                            fullWidth
                            className={styles.btn_underlined}
                        >
                            Clear form
                        </Button>
                    </ListItem>
                    <Divider/>
                    {isCreateBtnShown}
                </List>
            </Box>
        </Drawer>
    );
};

export default Navbar;
