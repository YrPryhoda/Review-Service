import React, {ChangeEvent} from 'react';
import TextInputField from '../common/TextInputField';
import styles from './styles.module.scss';

interface IProps {
    prevVal: string | undefined;
    nextVal: string | undefined;
    name: string;
    label: string;
    autoFocus?: boolean;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

const PlaceRequestDiffField = (props: IProps) => {
    const {nextVal, prevVal, className, ...inputProps} = props;
    const isChanged = prevVal != nextVal;

    return <TextInputField className={isChanged ? styles.fieldChanged : ''} {...inputProps} />;
};

export default PlaceRequestDiffField;
