export const stringValidator = (str: string) => !!str.trim().length;

export const stringLengthValidation = (str: string, len: number) => str.length >= len;

export const isEmail = (str: string) => str.toLowerCase().match(/\S+@\S+\.\S+$/);
