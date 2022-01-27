import React from 'react';
import {TableContainer, TableBody, TableCell, TableHead, TableRow, Table, Paper, Typography} from '@mui/material';

import {selectRequests} from '../../features/places/requests/selectors';
import {dateTimeFormatter} from '../../helpers/dateFormatter';
import {useAppSelector} from '../../store/hooks';
import styles from './styles.module.scss';

interface IProps {
    onClick: (id: number) => void;
}

const PlaceRequestsList = ({onClick}: IProps) => {
    const {all} = useAppSelector(selectRequests);

    return all.length ? (
            <TableContainer component={Paper} className={styles.table}>
                <Typography variant="h4" className={styles.title}>
                    Users have suggested a few changes to existing places
                </Typography>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.headerCell}>#</TableCell>
                            <TableCell className={styles.headerCell}>Place Name</TableCell>
                            <TableCell className={styles.headerCell}>User</TableCell>
                            <TableCell className={styles.headerCell}>User email</TableCell>
                            <TableCell className={styles.headerCell}>CreatedAt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {all.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => onClick(row.id)}
                            >
                                <TableCell className={styles.rowCell}>{index + 1}</TableCell>
                                <TableCell className={styles.rowCell}>{row.place.formatted}</TableCell>
                                <TableCell className={styles.rowCell}>
                                    {`${row.user.lastName} ${row.user.lastName}`}
                                </TableCell>
                                <TableCell className={styles.rowCell}>{row.user.email}</TableCell>
                                <TableCell className={styles.rowCell}>{dateTimeFormatter(row.createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
        : (
            <Typography variant="h4" className={styles.emptyHeader} >
                Users have not suggested to change places information yet
            </Typography>
        );
};

export default PlaceRequestsList;
