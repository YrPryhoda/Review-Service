export const categoriesParser = (cats: string | string[]): string[] => {

    const isWithDot = (el: string) => {
        if (el.includes('.')) {
            return el.split('.');
        }

        return false;
    };

    if (!cats) {
        return ['Not Found'];
    }

    if (typeof cats === 'string') {
        const data = isWithDot(cats);

        if (data) {
            return [...new Set(data)];
        }

        return [cats];
    }

    const arr = cats.map(category => {
        const replaced = category.replace('_', ' ');
        const data = isWithDot(replaced);

        if (data) {
            return data[data.length - 1];
        }

        return replaced;
    });

    // @ts-ignore:next-line
    return [...new Set(arr)];
};
