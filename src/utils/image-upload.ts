import { diskStorage } from 'multer';
import { extname } from 'path';
import { getRandomString } from './string';

export const imageFieldName = 'image';

export const storage = diskStorage({
  destination: './uploads',
  // tslint:disable-next-line: variable-name
  filename: (_request, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file): string {
  return `${Date.now()}-${getRandomString() + extname(file.originalname)}`;
}
