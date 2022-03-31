import util from 'util'
import multer from 'multer'

const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./app/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  // limits: { fileSize: maxSize },
}).single("myFile");
let uploadFileMiddleware = util.promisify(uploadFile);

export default uploadFileMiddleware