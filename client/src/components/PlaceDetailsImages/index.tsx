import React from 'react';
import {Grid} from '@mui/material';

import {CommentInterface, ImageInterface} from '../../../typedef';
import ImagesList from '../ImagesList';

interface IProps {
    comments: CommentInterface[];
    onClick: (url: string) => void;
}

const PlaceDetailsImages = ({comments, onClick}: IProps) => {
    const imagesBlock = React.useMemo(() => comments
        .reduce((total: ImageInterface[], curr) => {
            if (curr.images?.length) {
                curr.images.forEach(image => total.push(image));
            }
            return total;
        }, []), [comments]);

    return (
        <Grid container item xs={12}>
            <ImagesList urls={imagesBlock} onClick={onClick} />
        </Grid>
    );
};

export default PlaceDetailsImages;
