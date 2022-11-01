import Database from '../../../schemas/attachments';

module.exports = async (req: any, res: any) => {
  const { Name, Base64 } = req.body;

  if (!Name || !Base64)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Missing Field Values.',
    });

  const data = await Database.findOne({}).sort({ Id: -1 }).exec();
  const lastNum = data && data.Id ? data.Id : 0;

  try {
    new Database({
      Name,
      Base64,
      Id: lastNum + 1,
    }).save();

    res.status(200).send({
      success: true,
      href: req.originalUrl,
      message: 'Success! Image Uploaded!',
    });
    return 1;
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      href: req.originalUrl,
      message: 'Internal Database Error',
    });
  }
};
