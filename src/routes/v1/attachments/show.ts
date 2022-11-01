import Database from '../../../schemas/attachments';

module.exports = (req: any, res: any) => {
  try {
    Database.find({}, '-_id -__v')
      .sort({ _id: -1 })
      .exec()
      .then((data: any) => {
        return res.status(200).send(data);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      href: req.originalUrl,
      message: 'Internal Database Error',
    });
    return 0;
  }
};
