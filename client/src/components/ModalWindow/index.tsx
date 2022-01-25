import React from 'react';
import {Box, Modal} from '@mui/material';

import styles from './styles.module.scss';

interface IProps {
    open: boolean;
    toggleOpen: () => void;
    children: React.ReactNode;
}

const ModalWindow = (props: IProps) => {
    const {toggleOpen, open = false, children} = props;
    return (
        <Modal
            open={open}
            onClose={toggleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.modalBlock}>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalWindow;
