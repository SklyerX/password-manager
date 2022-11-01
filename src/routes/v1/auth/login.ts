import Database from '../../../schemas/accounts';
import { decrypt } from '../../../utils/controllers/encryption';

module.exports = (req: any, res: any) => {
  const { Email, Password, Username } = req.body;

  Database.findOne({ Email, Password, Username }, async (err: any, data: any) => {
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
      const decryptObject = {
        iv: data.Token.iv,
        password: data.Token.password,
      };

      const decryptedToken = decrypt(decryptObject);
      console.log(200);

      res.status(200).send({
        success: true,
        message: 'User authorized',
        href: req.originalUrl,
        data: {
          Username: data.Username,
          Password: data.Password,
          Email: data.Email,
          Token: decryptedToken,
        },
      });

      return 1;
    } else {
      res.status(409).send({
        success: false,
        href: req.originalUrl,
        message: 'Conflict Met. Account with these credentials was not found!',
      });
      return 0;
    }
  });
};
