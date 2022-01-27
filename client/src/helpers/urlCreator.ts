export const urlCreator = (str?: string) => {
    if(!str?.trim()) {
        return;
    }

    if(str.includes('http')) {
        return str;
    }

    return `https://${str}`;
}
