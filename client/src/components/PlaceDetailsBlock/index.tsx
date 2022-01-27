import React, {useMemo} from 'react';
import {Box} from '@mui/material';

import {facilitiesParser} from '../../helpers/facilitiesParser';
import {contactsParser} from '../../helpers/contactsParser';
import {PlaceInterface} from '../../../typedef';

import FlexItem from '../FlexItem';
import styles from './styles.module.scss';
import {urlCreator} from '../../helpers/urlCreator';

interface IProps {
    place: PlaceInterface;
}

const PlaceDetailsBlock = ({place}: IProps) => {
    const url = useMemo(() => urlCreator(place.website), [place.website]);
    const websiteLink = <a href={url} target={'_blank'} rel={'noreferrer'}> {place.website} </a>;

    const parsedFacilities = useMemo(() => facilitiesParser(place.facilities), [place.facilities]);
    const parsedContacts = useMemo(() => contactsParser(place.contact), [place.contact]);

    const facilitiesBlock = typeof parsedFacilities === 'string'
        ? <FlexItem sx={{mt: 0}} className={styles.detailsItem}>{parsedFacilities}</FlexItem>
        : parsedFacilities.map(([key, value]) => <div key={key.toString() + value} className={styles.facilitiesItem}>
            <span className={styles.detailsItem_bold}>{key}: </span>
            <span>{value.toString()}</span>
        </div>);

    const contactsBlock = typeof parsedContacts === 'string'
        ? <FlexItem sx={{mt: 0}} className={styles.detailsItem}>{parsedContacts}</FlexItem>
        : parsedContacts.map(([key, value]) => <div key={key.toString() + value} className={styles.facilitiesItem}>
            <span className={styles.detailsItem_bold}>{key}: </span>
            <span>{value.toString()}</span>
        </div>);

    const postOwner = place.user
        ? <FlexItem className={styles.detailsItem}>{`${place.user.firstName} ${place.user.lastName}`}</FlexItem>
        : <FlexItem className={styles.detailsItem}> Geoapofy API</FlexItem>;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <FlexItem className={styles.detailsBlock}>
                <FlexItem className={`${styles.detailsItem} ${styles.detailsItem_bold}`}>Website:</FlexItem>
                <FlexItem className={styles.detailsItem}>{websiteLink || 'Not found'}</FlexItem>
            </FlexItem>
            <FlexItem className={styles.detailsBlock}>
                <FlexItem className={`${styles.detailsItem} ${styles.detailsItem_bold}`}>Name:</FlexItem>
                <FlexItem className={styles.detailsItem}>{place.name}</FlexItem>
            </FlexItem>
            <FlexItem className={styles.detailsBlock}>
                <FlexItem className={`${styles.detailsItem} ${styles.detailsItem_bold}`}>House number:</FlexItem>
                <FlexItem className={styles.detailsItem}>{place.houseNumber || 'Not found'}</FlexItem>
            </FlexItem>
            <FlexItem className={styles.detailsBlock}>
                <FlexItem className={`${styles.detailsItem} ${styles.detailsItem_bold}`}>Street:</FlexItem>
                <FlexItem className={styles.detailsItem}>{place.street}</FlexItem>
            </FlexItem>
            <FlexItem className={styles.detailsBlock}>
                <FlexItem className={`${styles.detailsItem} ${styles.detailsItem_bold}`}>City:</FlexItem>
                <FlexItem className={styles.detailsItem}>{place.city}</FlexItem>
            </FlexItem>
            <FlexItem className={styles.detailsBlock}>
                <FlexItem className={`${styles.detailsItem} ${styles.detailsItem_bold}`}>Search query:</FlexItem>
                <FlexItem className={styles.detailsItem}>{place.formatted}</FlexItem>
            </FlexItem>
            <FlexItem className={styles.detailsBlock}>
                <FlexItem className={`${styles.detailsItem} ${styles.detailsItem_bold}`}>Facilities:</FlexItem>
                <FlexItem className={styles.facilitiesBlock}>
                    {facilitiesBlock}
                </FlexItem>
            </FlexItem>
            <FlexItem className={styles.detailsBlock}>
                <FlexItem className={`${styles.detailsItem} ${styles.detailsItem_bold}`}>Contacts:</FlexItem>
                <FlexItem className={styles.facilitiesBlock}>
                    {contactsBlock}
                </FlexItem>
            </FlexItem>
            <FlexItem className={styles.detailsBlock}>
                <FlexItem className={`${styles.detailsItem} ${styles.detailsItem_bold}`}>Added by:</FlexItem>
                {postOwner}
            </FlexItem>
        </Box>
    );
};

export default PlaceDetailsBlock;
