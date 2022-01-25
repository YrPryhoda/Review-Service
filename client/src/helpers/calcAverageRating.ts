import {CommentInterface} from '../../typedef';

export const calcAverageRating = (arr: CommentInterface[]) => {
    return arr.length
        ? arr.reduce((total, current) => total + current.rating, 0) / arr.length
        : 0;
};
