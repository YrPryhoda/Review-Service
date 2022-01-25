import {v4} from 'uuid';

export const savedFileName = (file) => {
    const fileData = file.originalname.split('.');
    const name = fileData[0];
    const fileExtName = fileData[fileData.length - 1];
    const randomName = v4();
    return `${name}-${randomName}.${fileExtName}`;
};

export const imageFileName = (req, file, callback) => {
    const name = savedFileName(file);
    callback(null, name);
};
