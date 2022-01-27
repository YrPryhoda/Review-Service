import React from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import styles from './styles.module.scss';
import {NavLink} from 'react-router-dom';
import {routes} from '../../routes/routes';

interface IProps {
    count: number;
}

const AdminNotificationsIcon = ({count}: IProps) => {
    const countIcon = count ? (
        <div className={styles.countBlock}>
            {count}
        </div>
    ) : null;
    return (
        <NavLink to={routes.placeRequests} className={styles.iconWrapper}>
            <NotificationsActiveIcon className={styles.iconRing}/>
            {countIcon}
        </NavLink>
    );
};

export default AdminNotificationsIcon;
