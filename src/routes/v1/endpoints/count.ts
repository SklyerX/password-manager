import Attachments from '../../../schemas/attachments';
import Passwords from '../../../schemas/passwords';
import Favourites from '../../../schemas/favourites';

module.exports = (req: any, res: any) => {
  const { q } = req.query;

  if (!q)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Missing Query Values',
    });

  try {
    if (q == 'attachments') {
      Attachments.find({})
        .exec()
        .then((item: any) => {
          return res.status(200).send({
            success: true,
            href: req.originalUrl,
            message: 'Success! Attachments found',
            data: {
              length: item.length,
            },
          });
        });
    } else if (q == 'passwords') {
      Passwords.find({})
        .exec()
        .then((item: any) => {
          return res.status(200).send({
            success: true,
            href: req.originalUrl,
            message: 'Success! Passwords found',
            data: {
              length: item.length,
            },
          });
        });
    } else if (q == 'favourites') {
      Favourites.find({})
        .exec()
        .then((item: any) => {
          return res.status(200).send({
            success: true,
            href: req.originalUrl,
            message: 'Success! Favourites found',
            data: {
              length: item.length,
            },
          });
        });
    } else {
      res.status(409).send({
        success: false,
        href: req.originalUrl,
        message: 'Conflict Met. Invalid Query',
      });
    }

    return 1;
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      href: req.originalUrl,
      message: 'Internal Database Error.',
    });
  }
};
