export const facilitiesParser = (data?: string | { [key: string]: string | boolean }) => {
    if (!data) {
        return 'Not found';
    }

    if (typeof data === 'string') {
        return data;
    }

    return Object.entries(data).map(([key, value]) => {
        if (key.includes('_')) {
            const formattedKey = key.replace('_', ' ');
            return [formattedKey, value];
        }

        return [key, value];
    });
};
