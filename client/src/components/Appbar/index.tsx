import React from 'react';
import {Badge, IconButton, styled, Toolbar, Typography} from '@mui/material';
import {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import {NavLink} from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {clearSearch, loadAll} from '../../features/places/actions-creators';
import {useAppDispatch, useAppSelector} from '../../store/hooks';

import {routes} from '../../routes/routes';
import styles from './styles.module.scss';
import AccountMenu from '../AccountMenu';
import {selectUser} from '../../features/user/selectors';
import {selectRequests} from '../../features/places/requests/selectors';
import {UserRole} from '../../typing/enums';
import AdminNotificationsIcon from '../AdminNotificationsIcon';

const drawerWidth: number = 320;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

interface IProps {
    toggleDrawer?: () => void;
    open?: boolean;
}

const Appbar = (props: IProps) => {
    const dispatch = useAppDispatch();
    const {profile} = useAppSelector(selectUser);
    const {all} = useAppSelector(selectRequests);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handlerHome = () => {
        localStorage.removeItem('page');
        dispatch(clearSearch());
        dispatch(loadAll(1));
    };

    const adminIcon = profile && profile.userRole === UserRole.Admin && (
        <AdminNotificationsIcon count={all.length}/>
    );

    return (
        <StyledAppBar position="absolute" open={props.open}>
            <Toolbar sx={{pr: '24px'}}>
                {
                    props.toggleDrawer &&
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(props.open && {display: 'none'})
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                }
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{flexGrow: 1}}
                >
                    <NavLink to={routes.home} onClick={handlerHome} className={styles.navlink}>
                        Dashboard
                    </NavLink>
                </Typography>
                <>
                    {adminIcon}
                    <IconButton
                        color="inherit"
                        onClick={handleClickMenu}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Badge color="secondary">
                            <AccountCircleIcon fontSize={'large'}/>
                        </Badge>
                    </IconButton>
                </>
                <AccountMenu open={open} anchorEl={anchorEl} handleClose={handleCloseMenu}/>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Appbar;
