import CtLichThi from "../models/ctlichthi.model.js"

const CtLichThiController = {
  Them: (req, res) => {
    if (!req.body.idsv || !req.body.idlt || !req.body.sbd) {
      res.status(400).send({
        message: "Nội dung trống!",
      });
    } else
      CtLichThi.Them(new CtLichThi(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message: res.message || "ERROR",
          });
        else res.send(data);
      });
  }
}

export default CtLichThiController
