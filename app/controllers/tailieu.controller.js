import TaiLieu from "../models/tailieu.model.js";
import uploadFile from '../middleware/upload.js';
import fs from 'fs'

// export const upload = async (req, res) => {
//   uploadFile(req, res, (err) => {

//   })
//   res.send('success')
// };

// export const getListFiles = (req, res) => {
//   const directoryPath = __basedir + "/app/uploads/";
//   fs.readdir(directoryPath, function (err, files) {
//     if (err) {
//       res.status(500).send({
//         message: "Unable to scan files!",
//       });
//     }
//     let fileInfos = [];
//     files.forEach((file) => {
//       fileInfos.push({
//         name: file,
//         url: baseUrl + file,
//       });
//     });
//     res.status(200).send(fileInfos);
//   });
// };
// export const download = (req, res) => {
//   const fileName = req.params.name;
//   const directoryPath = __basedir + "/app/uploads/";
//   res.download(directoryPath + fileName, fileName, (err) => {
//     if (err) {
//       res.status(500).send({
//         message: "Could not download the file. " + err,
//       });
//     }
//   });
// };


const TaiLieuController = {
  Them: (req, res) => {
    uploadFile(req, res, (err) => {
      if (err) {
        res.send({ 'Err': err })
      }
      else {
        if (!req.body.tenTaiLieu || !req.body.idLop) {
          res.status(400).send({
            message: "Nội dung trống!",
          });
        } else {
          TaiLieu.Them(new TaiLieu({ ...req.body, duongDan: `uploads/${req.file.filename}` }), (err, data) => {
            if (err)
              res.status(500).send({
                message: err.message || "Có lỗi thêm tài liệu.",
              });
            else {
              res.status(200).send({ status: 'success' });
            }
          });
        }
      }
    })
  },
  XemTheoLop: (req, res) => {
    TaiLieu.XemTheoLop(req.params.idLop, (err, data) => {
      if (err) {
        res.status(500).send({
          message: res.message || "ERROR",
        });
      } else {
        res.status(200).send(data)
      };
    });
  },
  Download: (req, res) => {
    const fileName = req.params.filename;
    const directoryPath = "./app/uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  },
};

export default TaiLieuController;
