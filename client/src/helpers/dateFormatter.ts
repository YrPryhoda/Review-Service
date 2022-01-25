import dateFormat from 'dateformat';

export const dateFormatter = (date: Date) => {
    const newDate = new Date(date);

    return dateFormat(newDate, 'd mmmm yyyy')
}

export const dateTimeFormatter = (date: Date) => {
    const newDate = new Date(date);

    return dateFormat(newDate, 'HH:MM, d mmmm yyyy')
}
