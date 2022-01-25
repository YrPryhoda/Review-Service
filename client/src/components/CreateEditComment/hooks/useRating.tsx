import {useState} from 'react';

const useRating = (initialValue = 5) => {
    const [rating, setRating] = useState(initialValue);

    const onRatingChange = (val: number) => {
        setRating(val);
    };

    return {
        rating,
        onRatingChange
    };
};

export default useRating;
