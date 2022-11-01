import Database from '../../../schemas/favourites';

module.exports = (req: any, res: any) => {
  const { Id } = req.body;

  if (!Id)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Missing Field Values',
    });

  console.log('First Checkpoint Passed');

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
      console.log('Second Checkpoint Passed');
      data.delete();
      console.log('Third Checkpoint Passed');

      res.status(200).send({
        success: true,
        href: req.originalUrl,
        message: 'Success! Favourite deleted.',
      });

      return 1;
    } else {
      res.status(409).send({
        success: false,
        href: req.originalUrl,
        message: 'ID related to a saved password was not found.',
      });

      return 0;
    }
  });
};
