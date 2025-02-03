import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';

import fs from 'fs';

interface CloudianryResponse {
  secure_url: string;
}

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

export const uploadImageToCloudinary = (
  path: string,
  public_id: string,
  folderName: string,
): Promise<CloudianryResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { folder: folderName, public_id },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as CloudianryResponse);

        fs.unlink(path, err => {
          if (err) {
            console.error(err);
            return;
          } else {
            console.log('file removed');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
