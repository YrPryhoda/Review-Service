import React from 'react';
import {NavLink} from 'react-router-dom';

import {Menu, MenuItem, ListItemIcon, MenuList} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {AccountCircle} from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {logout} from '../../features/user/actions-creators';
import {selectUser} from '../../features/user/selectors';
import {routes} from '../../routes/routes';
import styles from './styles.module.scss';

interface IProps {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}

const AccountMenu = ({open, handleClose, anchorEl}: IProps) => {
    const {access_token} = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const handlerLogout = () => {
        dispatch(logout());
    };

    const unauthorizedMenu = (
        <MenuList>
            <NavLink to={routes.home} className={styles.menuList}>
                <MenuItem>
                    <ListItemIcon>
                        <HomeIcon fontSize="small"/>
                    </ListItemIcon>
                    Main Page
                </MenuItem>
            </NavLink>
            <NavLink to={routes.login} className={styles.menuList}>
                <MenuItem>
                    <ListItemIcon>
                        <LoginIcon fontSize="small"/>
                    </ListItemIcon>
                    Login
                </MenuItem>
            </NavLink>
            <NavLink to={routes.register} className={styles.menuList}>
                <MenuItem>
                    <ListItemIcon>
                        <PersonAddAltIcon fontSize="small"/>
                    </ListItemIcon>
                    Registration
                </MenuItem>
            </NavLink>
        </MenuList>
    );

    const authorizedMenu = (
        <MenuList>
            <NavLink to={routes.home} className={styles.menuList}>
                <MenuItem>
                    <ListItemIcon>
                        <HomeIcon fontSize="small"/>
                    </ListItemIcon>
                    Main Page
                </MenuItem>
            </NavLink>
            <NavLink to={routes.profile} className={styles.menuList}>
                <MenuItem>
                    <ListItemIcon>
                        <AccountCircle fontSize="small"/>
                    </ListItemIcon>
                    Profile
                </MenuItem>
            </NavLink>
            <NavLink to={'#'} className={styles.menuList}>
                <MenuItem onClick={handlerLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </NavLink>
        </MenuList>
    );

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                className: styles.menuWrapper
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            {access_token ? authorizedMenu : unauthorizedMenu}
        </Menu>
    );
};

export default AccountMenu;
