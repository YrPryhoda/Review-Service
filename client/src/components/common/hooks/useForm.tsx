import React, {ChangeEvent, useState} from 'react';

function useForm<T>(initialState: T) {

    const [form, setForm] = useState(initialState);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm(form => {
            return {
                ...form,
                [event.target.name]: event.target.value
            };
        });
    };

    const clearForm = (options?: any) => setForm(options || initialState);

    return {
        form,
        onChange,
        clearForm,
        setForm
    };
};

export default useForm;
