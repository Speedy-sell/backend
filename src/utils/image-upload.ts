import { diskStorage } from 'multer';
import { extname } from 'path';

export const imageFieldName = 'image';

export const storage = diskStorage({
  destination: './uploads',
  // tslint:disable-next-line: variable-name
  filename: (_request, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  return `${Date.now()}-${getRandomString()}${extname(file.originalname)}`;
}

function getRandomString() {
  return Math.random()
    .toString(36)
    .substring(7);
}
