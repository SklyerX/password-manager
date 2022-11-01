import Account from '../../../schemas/accounts';
import Attachments from '../../../schemas/attachments';
import Favourites from '../../../schemas/favourites';
import Passwords from '../../../schemas/passwords';

module.exports = (req: any, res: any) => {
  const { Username, Password, Email } = req.body;

  Account.findOne({ Username, Password, Email }, async (err: any, data: any) => {
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
      try {
        // Remove Account
        data.delete();

        // Remove Attachments
        Attachments.remove({}, function (err) {
          if (err) {
            console.log(err);
          } else {
            res.end('success');
          }
        });
        // Remove Favourites
        Favourites.remove({}, function (err) {
          if (err) {
            console.log(err);
          } else {
            res.end('success');
          }
        });
        // Remove Passwords
        Passwords.remove({}, function (err) {
          if (err) {
            console.log(err);
          } else {
            res.end('success');
          }
        });

        res.status(200).send({
          success: true,
          href: req.originalUrl,
          message: 'Success! Account deleted! So long ' + Username,
        });

        return 1;
      } catch (error) {
        console.log(error);
        res.send(500).send({
          success: false,
          href: req.originalUrl,
          message: 'Something went wrong while deleting user credentials.',
        });
        return 0;
      }
    } else {
      res.status(409).send({
        success: false,
        href: req.originalUrl,
        message: 'Conflict Met. No account found with these credentials',
      });
      return 0;
    }
  });
};
