import Database from '../../../schemas/attachments';

module.exports = (req: any, res: any) => {
  const { Id } = req.body;

  if (!Id)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Missing Field Values.',
    });

  Database.findOne({ Id }, async (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        href: req.originalUrl,
        message: 'Internal Database Error.',
      });
      return 0;
    }
    if (data) {
      await data.delete();

      res.status(200).send({
        success: true,
        href: req.originalUrl,
        message: 'Success! Attachment deleted!',
      });

      return 1;
    } else {
      res.status(409).send({
        success: false,
        href: req.originalUrl,
        message: 'Conflict Met. No attachment with this name was found!',
      });
      return 0;
    }
  });
};
